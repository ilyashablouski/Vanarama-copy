serviceName = 'next-storefront'
ecrRegion = 'eu-west-2'
stack = 'grid'
dockerRepoName = "000379120260.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}"
taskDefFile = "deploy/aws/task-definition.json"
currentCommit = ""
applyInfraPlan = false

def app_environment = [
    "devops": [
        clusterName: 'grid-dev',
        logGroupName: "dev/grid/apps",
        taskFamily: "grid-dev-${serviceName}",
        app: serviceName,
        ssmParametersBase: "arn:aws:ssm:eu-west-2:000379120260:parameter/dev/${stack}/${serviceName}",
        env: 'dev',
        stack: 'grid',
        state_bucket: 'autorama-terraform-state',
        slackChannel: '#jenkinsalerts'
    ],
    "develop": [
        clusterName: 'grid-dev',
        logGroupName: "dev/grid/apps",
        taskFamily: "grid-dev-${serviceName}",
        app: serviceName,
        ssmParametersBase: "arn:aws:ssm:eu-west-2:000379120260:parameter/dev/${stack}/${serviceName}",
        env: 'dev',
        stack: 'grid',
        state_bucket: 'autorama-terraform-state',
        slackChannel: '#jenkinsalerts'
    ]
]

def ecrLogin() {
    //todo - this will log the whole of jenkins into this registry ?
    //todo withcredentials repitition - can we separate this to library, or at least once-per-pipeline
    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
        sh """
            set +x #don't print output.
            \$(aws ecr get-login --no-include-email --region ${ecrRegion})
        """
    }
}

def getTaskDefinition(family, region) {
    return "${family}:" + sh(
        returnStdout: true,
        script: "aws ecs describe-task-definition --task-definition ${family} --region ${region} | egrep 'revision'  | tr ',' ' ' | awk '{print \$2}'"
    ).trim()
}

pipeline {
    agent none
    options {
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage("1: Create docker repo") {
            agent { node('master') }
            options { skipDefaultCheckout() }

            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                    sh "aws ecr describe-repositories --repository-names ${serviceName} --region ${ecrRegion} || aws ecr create-repository --repository-name ${serviceName} --region ${ecrRegion}"
                }
            }
        }

        stage("2: Unit testing") {
            // TODO: run me in docker -- zero cleanup required; also concurrency safe
            //agent { node('master') }
            agent {
                ecs {
                    inheritFrom 'grid-dev-jenkins-agent'
                }
            }

            steps {
              withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                    sh '''npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"'''
                    sh "yarn install"
                    sh "yarn pack --filename next-storefront.tar.gz"
                    sh "yarn test --coverage"
                    sh "yarn lint"
                    sh "yarn typecheck"
                    stash includes: 'next-storefront.tar.gz', name: 'package'
              }
            }
        }

        stage("3. Static Code Analysis") {
            agent { node('master') }
            steps {
              nodejs('node') {
                  // requires SonarQube Scanner 2.8+
                  script {
                      def scannerHome = tool 'SonarQubeScanner';
                      withSonarQubeEnv('My SonarQube Server') {
                          sh "${scannerHome}/bin/sonar-scanner"
                        }
                    }
                }
            }
        }

        stage("4. Production Build & push") {
            agent { node('master') }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'devops'
                }
            }

            steps {
                ecrLogin()

                script {
                    currentCommit = env.GIT_COMMIT
                }
                withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                 sh """
                    docker pull $dockerRepoName:latest || true
                    docker build -t $dockerRepoName:${env.GIT_COMMIT} --build-arg NPM_TOKEN=${NPM_TOKEN} --cache-from $dockerRepoName:latest .
                    docker push $dockerRepoName:${env.GIT_COMMIT}
                    docker tag $dockerRepoName:${env.GIT_COMMIT} $dockerRepoName:latest
                    docker push $dockerRepoName:latest
                    docker rmi $dockerRepoName:latest
                 """
                } 
            }
        }

        stage("5. Register task definition") {
            agent { node('master') }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
                B_NAME = "${env.BRANCH_NAME}"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'devops'
                }
            }

            steps {
                script {
                    def clusterName = app_environment["${B_NAME}"].clusterName
                    def appName = app_environment["${B_NAME}"].app
                    def logGroupName = app_environment["${B_NAME}"].logGroupName
                    def taskFamily = app_environment["${B_NAME}"].taskFamily
                    def env = app_environment["${B_NAME}"].env
                    def ssmParametersBase = app_environment["${B_NAME}"].ssmParametersBase

                    // 1. register-task-definition - new task def
                    sh  """
                        cat ${taskDefFile} \
                            | sed -e "s;%APP_NAME%;${appName};g" \
                            | sed -e "s;%LOG_GROUP%;${logGroupName};g" \
                            | sed -e "s;%IMAGE%;$dockerRepoName:$currentCommit;g" \
                            | sed -e "s;%ENVIRONMENT%;${env};g" \
                            | sed -e "s;%AWS_REGION%;${ecrRegion};g" \
                            | sed -e "s;%SSM_PARAMETER_BASE%;${ssmParametersBase};g" \
                            | tee ${taskDefFile}_final.json
                        aws ecs register-task-definition --execution-role-arn arn:aws:iam::000379120260:role/Acorn-DevOps \
                            --family ${taskFamily} --cli-input-json file://${taskDefFile}_final.json --region ${ecrRegion}
                    """
                }
            }
        }

        stage("6. Infra - plan") {
            agent {
                ecs {
                    inheritFrom 'grid-dev-jenkins-agent'
                    image '000379120260.dkr.ecr.eu-west-2.amazonaws.com/jenkins-agent-terraform:latest'
                }
            }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
                B_NAME = "${env.BRANCH_NAME}"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'devops'
                }
            }

            steps {
                lock(env.JOB_NAME) {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sshagent (credentials: ['git-ssh-credentials-readonly']) {
                            script {

                                def taskFamily = app_environment["${B_NAME}"].taskFamily
                                def taskDefinition = getTaskDefinition(taskFamily, ecrRegion)
                                def app = app_environment["${B_NAME}"].app
                                def env = app_environment["${B_NAME}"].env
                                def stack = app_environment["${B_NAME}"].stack
                                def clusterName = app_environment["${B_NAME}"].clusterName
                                def state_bucket = app_environment["${B_NAME}"].state_bucket

                                sh """
                                    mkdir $HOME/.ssh && chmod 700 $HOME/.ssh && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                                    cd deploy/terraform
                                        terraform init -backend-config="backend.tfvars" -backend-config="key=${env}/${app}.tfstate"
                                """

                                def terraformStatus = sh(
                                    returnStatus:true, 
                                    script: 
                                        "cd deploy/terraform; set +e; terraform plan -detailed-exitcode -var=stack=${stack} \
                                        -var=app=${app} \
                                        -var=env=${env} \
                                        -var=state_bucket=${state_bucket} \
                                        -var=task_definition=${taskDefinition} \
                                        -out=.plan")
                                sh """    
                                    cd ../../
                                """

                                stash includes: 'deploy/terraform/.plan', name: 'plan'

                                if (terraformStatus == 0) {
                                    currentBuild.result == 'SUCCESS'
                                }

                                if (terraformStatus == 2) {
                                    stash includes: 'deploy/terraform/.plan', name: 'plan'
                                    slackSend channel: app_environment["${app_env_map}"].slackChannel, color: 'good', message: "Terraform Plan Awaiting Approval: ${J_NAME} - ${B_NUMBER} "
                                    try {
                                        input message: 'Apply Plan?', ok: 'Apply'
                                        applyInfraPlan = true
                                    } catch (err) {
                                        slackSend channel: app_environment["${app_env_map}"].slackChannel, color: 'warning', message: "Terraform Plan Discarded: ${J_NAME} - ${B_NUMBER} "
                                        applyInfraPlan = false
                                        currentBuild.result = 'UNSTABLE'
                                        exit 0
                                    }
                                }

                                if (terraformStatus == 1) {
                                    slackSend channel: app_environment["${app_env_map}"].slackChannel, color: '#0080ff', message: "Terraform Plan Failed: ${J_NAME} - ${B_NUMBER} "
                                    currentBuild.result = 'FAILURE'
                                    exit 0
                                }

                            }
                        }
                    }
                }
            }
        }

        stage("7. Infra - apply") {
            input {
                message 'Continue with infra apply?'
            }
            agent {
                ecs {
                    inheritFrom 'grid-dev-jenkins-agent'
                    image '000379120260.dkr.ecr.eu-west-2.amazonaws.com/jenkins-agent-terraform:latest'
                }
            }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
                B_NAME = "${env.BRANCH_NAME}"
            }
            when {
                beforeAgent true
                beforeInput true
                anyOf {
                  branch 'develop'
                  branch 'devops'
                }
                expression {
                    applyInfraPlan == true
                }
            }
            steps {
                lock(env.JOB_NAME) {
                    // TODO - move tf here - needs approval steps e.g. following stages only when required
                    // TODO - env -> plan mapping
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sshagent (credentials: ['git-ssh-credentials-readonly']) {
                            unstash 'plan'
                            script {
                                def app = app_environment["${B_NAME}"].app
                                def clusterName = app_environment["${B_NAME}"].clusterName

                                sh """
                                    mkdir $HOME/.ssh && chmod 700 $HOME/.ssh && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                                    cd deploy/terraform
                                        terraform init -backend-config="backend.tfvars" -backend-config="key=${env}/${app}.tfstate"
                                        terraform apply .plan
                                    cd ../../
                                """
                            }
                        }
                    }
                }
            }
        }

        stage("8. Deploy app") {
            agent { node('master') }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'devops'
                }
            }

            steps {
                script {
                    def clusterName = app_environment[env.BRANCH_NAME].clusterName
                    def logGroupName = app_environment[env.BRANCH_NAME].logGroupName
                    def taskFamily = app_environment[env.BRANCH_NAME].taskFamily
                    def taskDefinition = getTaskDefinition(taskFamily, ecrRegion)

                    // 3. update-service to new taskdef, with previous desired count (or 1, whichever greater)
                    sh """
                        aws ecs update-service --cluster ${clusterName} --service ${serviceName} --task-definition ${taskDefinition} --region ${ecrRegion}
                    """
                }
            }
        }
    }
}
