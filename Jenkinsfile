serviceName = 'next-storefront'
ecrRegion = 'eu-west-2'
stack = 'grid'
taskDefFile = "deploy/aws/task-definition.json"
currentCommit = ""

def app_environment = [
    "develop": [
        clusterName: 'grid-dev',
        logGroupName: "dev/grid/apps",
        taskFamily: "grid-dev-${serviceName}",
        app: "${serviceName}",
        ssmParametersBase: "arn:aws:ssm:eu-west-2:000379120260:parameter/dev/${stack}/${serviceName}",
        env: 'dev',
        stack: 'grid',
        slackChannelInfra: '#dev-infra-approvals',
        slackChannelQA: '#qa-code-approvals',
        jenkinsCredentialsId: 'aws-techamigo-keys',
        accountId: '000379120260',
        awsMasterRole: '', //empty while dev has master account credentials
        state_bucket: 'autorama-terraform-state',
        backendConfigDynamoDbTable: 'autorama-terraform-state-lock',
        jenkinsAgent: 'grid-dev-jenkins-agent',
        dockerRepoName: "000379120260.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}",
        NODE_ENV: 'development',
        terraformService: true,
        alternateDomain: 'dev.vanarama-nonprod.com'
    ],
    "master": [
        clusterName: 'grid-uat',
        logGroupName: "uat/grid/apps",
        taskFamily: "grid-uat-${serviceName}",
        app: "${serviceName}",
        ssmParametersBase: "arn:aws:ssm:eu-west-2:126764662304:parameter/uat/${stack}/${serviceName}",
        env: 'uat',
        stack: 'grid',
        slackChannelInfra: '#dev-infra-approvals',
        jenkinsCredentialsId: 'aws-keys-terraform-grid-test',
        accountId: '126764662304',
        awsMasterRole: 'arn:aws:iam::126764662304:role/AutoramaGridDelegate',
        state_bucket: 'grid-terraform-state-1',
        backendConfigDynamoDbTable: 'uat-grid-terraform-state-lock',
        jenkinsAgent: 'grid-uat-jenkins-agent',
        dockerRepoName: "126764662304.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}",
        NODE_ENV: 'development',
        terraformService: true,
        alternateDomain: 'uat.vanarama-nonprod.com'
    ]
]

def ecrLogin(String accountId) {
    //todo - this will log the whole of jenkins into this registry ?
    //todo withcredentials repitition - can we separate this to library, or at least once-per-pipeline
    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${accountId}", secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
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

def mergeAndPushBranch(appEnvironment, destinationBranch) {

    cleanWs()

    def dcName = "${env.JOB_NAME}-${env.BUILD_NUMBER}"
    def appName = appEnvironment["${env.BRANCH_NAME}"].app
    def currentBranch = "${env.BRANCH_NAME}"

    try {
        git branch: "${destinationBranch}", credentialsId: 'TechAmigo-DevOps-New', url: "https://github.com/Autorama/${appName}.git"

        sh "git config user.email devops@techamigos.com"
        sh "git config user.name 'devops'"
        sh "git remote set-url origin git@github.com:Autorama/${appName}.git"

        sh """
        git tag -a ${dcName} -m \"Tagging a New Release\"
        git merge origin/${currentBranch}
        """

        sshagent(['autorama']) {
        sh"""
            #!/usr/bin/env bash
            set +x
            export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
            git push origin ${dcName}
            git push origin ${destinationBranch}
        """
        }
    } catch (err) {
        slackSend channel: appEnvironment["${env.BRANCH_NAME}"].slackChannelQA, color: 'warning', message: "Merge to ${destinationBranch} has failed for : ${env.JOB_NAME} - ${env.BUILD_NUMBER} "
        currentBuild.result = 'UNSTABLE'
    }
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
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'master'
                }
            }

            steps {
              script {
                def jenkinsCredentialsId = app_environment["${env.BRANCH_NAME}"].jenkinsCredentialsId
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${jenkinsCredentialsId}" , secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                    sh "aws ecr describe-repositories --repository-names ${serviceName} --region ${ecrRegion} || aws ecr create-repository --repository-name ${serviceName} --region ${ecrRegion}"
                }
              }
            }
        }

        stage("2: Unit testing") {
            //TODO: run me in docker -- zero cleanup required; also concurrency safe
            //agent { node('master') }
            agent {
                ecs {
                    inheritFrom 'grid-dev-jenkins-agent'  // This is not within customers
                }
            }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
            }

            steps {
              milestone(10)
              withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                    sh '''npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"'''
                    sh "yarn install"
                    // sh "yarn pack --filename next-storefront.tar.gz"
                    sh "yarn test --coverage"
                    sh "yarn lint"
                    sh "yarn typecheck"
                    // sh "yarn build"
                    // stash includes: 'next-storefront.tar.gz', name: 'package'
              }
                sh "cp .coverage/lcov.info lcov.info"
                stash includes: 'lcov.info', name: 'lcov'
                stash includes: 'test-report.xml', name: 'test-report'
            }
        }

        // stage("3. Static Code Analysis") {
        //     agent {
        //         ecs {
        //             inheritFrom 'grid-dev-jenkins-agent'  // This is not within customers
        //         }
        //     }
        //     steps {
        //       milestone(20)
        //         nodejs('node') {
        //           // requires SonarQube Scanner 2.8+
        //             script {
        //                 def scannerHome = tool 'SonarQubeScanner';
        //                 withSonarQubeEnv('My SonarQube Server') {
        //                     unstash 'lcov'
        //                     unstash 'test-report'
        //                     sh "${scannerHome}/bin/sonar-scanner"
        //                 }
        //                 timeout(time: 40, unit: 'MINUTES') {
        //                     def qGate = waitForQualityGate()
        //                     if (qGate.status != 'OK') {
        //                         error "Pipeline aborted due to quality gate failure: ${qGate.status}"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        stage("4. Production Build & push") {
            agent { node('master') }
            environment {
                PATH = "${env.PATH}:/usr/local/bin"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'master'
                }
            }

            steps {
              milestone(30)

              script {
                def jenkinsCredentialsId = app_environment["${env.BRANCH_NAME}"].jenkinsCredentialsId
                ecrLogin(jenkinsCredentialsId)
                def dockerRepoName = app_environment["${env.BRANCH_NAME}"].dockerRepoName
                def envs = app_environment["${BRANCH_NAME}"].env
                def stack = app_environment["${BRANCH_NAME}"].stack
                def NODE_ENV = app_environment["${BRANCH_NAME}"].NODE_ENV
                def alternateDomain = app_environment["${BRANCH_NAME}"].alternateDomain
                
                currentCommit = env.GIT_COMMIT
                    //TO DO - Paramaterise the source function with env variable
                    withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${jenkinsCredentialsId}" , secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                    sh """
                      source ./setup.sh ${envs} ${stack} ${serviceName} ${ecrRegion} ${BRANCH_NAME} ${alternateDomain}
                      docker pull $dockerRepoName:latest || true
                      docker build -t $dockerRepoName:${env.GIT_COMMIT} --build-arg NPM_TOKEN=${NPM_TOKEN} --build-arg PRERENDER_SERVICE_URL=\${PRERENDER_SERVICE_URL} --build-arg API_KEY=\${API_KEY} --build-arg API_URL=\${API_URL} --build-arg ENV=\${ENV} --build-arg GTM_ID=\${GTM_ID} --build-arg MICROBLINK_URL=\${MICROBLINK_URL} --build-arg IMG_OPTIMISATION_HOST=\${IMG_OPTIMISATION_HOST} --build-arg LOQATE_KEY=\${LOQATE_KEY} --build-arg NODE_ENV=\${NODE_ENV}  --cache-from $dockerRepoName:latest .
                      docker push $dockerRepoName:${env.GIT_COMMIT}
                      docker tag $dockerRepoName:${env.GIT_COMMIT} $dockerRepoName:latest
                      docker push $dockerRepoName:latest
                      docker rmi $dockerRepoName:latest
                    """
                  }
                }
               }
            }
        }

        stage("5. Register task definition") {
            agent { node('master') }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
            }
            when {
                beforeAgent true
                anyOf {
                  branch 'develop'
                  branch 'master'
                }
            }

            steps {
                milestone(40)
                script {
                    def clusterName = app_environment["${BRANCH_NAME}"].clusterName
                    def appName = app_environment["${BRANCH_NAME}"].app
                    def logGroupName = app_environment["${BRANCH_NAME}"].logGroupName
                    def taskFamily = app_environment["${BRANCH_NAME}"].taskFamily
                    def env = app_environment["${BRANCH_NAME}"].env
                    def ssmParametersBase = app_environment["${BRANCH_NAME}"].ssmParametersBase
                    def accountId =  app_environment["${BRANCH_NAME}"].accountId
                    def dockerRepoName = app_environment["${BRANCH_NAME}"].dockerRepoName
                    def alternateDomain = app_environment["${BRANCH_NAME}"].alternateDomain
                     
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: app_environment["${BRANCH_NAME}"].jenkinsCredentialsId, secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                      sshagent (credentials: ['git-ssh-credentials-readonly']) {
                      // 1. register-task-definition - new task def
                        sh  """
                        cat ${taskDefFile} \
                            | sed -e "s;%APP_NAME%;${appName};g" \
                            | sed -e "s;%LOG_GROUP%;${logGroupName};g" \
                            | sed -e "s;%IMAGE%;$dockerRepoName:$currentCommit;g" \
                            | sed -e "s;%ENVIRONMENT%;${env};g" \
                            | sed -e "s;%AWS_REGION%;${ecrRegion};g" \
                            | sed -e "s;%SSM_PARAMETER_BASE%;${ssmParametersBase};g" \
                            | sed -e "s;%ACCOUNT_NUMBER%;${accountId};g" \
                            | sed -e "s;%ALTERNATEDOMAIN%;${alternateDomain};g" \
                            | tee ${taskDefFile}_final.json
                        aws ecs register-task-definition --execution-role-arn arn:aws:iam::${accountId}:role/Acorn-DevOps \
                            --family ${taskFamily} --cli-input-json file://${taskDefFile}_final.json --region ${ecrRegion}
                        """
                      }
                  }
               }
            }
        }

        stage("6. Infra - plan") {
            agent {
              ecs {
                inheritFrom "${app_environment[env.BRANCH_NAME].jenkinsAgent}"
                image "${app_environment[env.BRANCH_NAME].accountId}.dkr.ecr.eu-west-2.amazonaws.com/jenkins-terraform-slave:latest"
              }
            }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
                J_NAME = "${env.JOB_NAME}"
                B_NUMBER = "${env.BUILD_NUMBER}"
                TF_VAR_aws_account_id = "${app_environment["${env.BRANCH_NAME}"].accountId}"
                TF_VAR_aws_master_role = "${app_environment["${env.BRANCH_NAME}"].awsMasterRole}"
                TF_VAR_alb_listener_host_override = "${app_environment["${env.BRANCH_NAME}"].alternateDomain}"
            }
            when {
                  beforeAgent true
                  anyOf {
                    branch 'develop'
                    branch 'master'
                  }
              }

              steps {
                  lock(env.JOB_NAME) {
                  withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: app_environment["${BRANCH_NAME}"].jenkinsCredentialsId, secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                          sshagent (credentials: ['git-ssh-credentials-readonly']) {
                              script {
                                def taskFamily = app_environment["${BRANCH_NAME}"].taskFamily
                                def taskDefinition = getTaskDefinition(taskFamily, ecrRegion)
                                def app = app_environment["${BRANCH_NAME}"].app
                                def env = app_environment["${BRANCH_NAME}"].env
                                def clusterName = app_environment["${BRANCH_NAME}"].clusterName
                                def state_bucket = app_environment["${BRANCH_NAME}"].state_bucket
                                def slackChannelInfra = app_environment["${BRANCH_NAME}"].slackChannelInfra
                                def backend_config_dynamodb_table = app_environment["${BRANCH_NAME}"].backendConfigDynamoDbTable
                                def terraformService = app_environment["${BRANCH_NAME}"].terraformService

                                  sh """
                                      set +e
                                      mkdir $HOME/.ssh && chmod 700 $HOME/.ssh && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                                      cd deploy/terraform
                                          terraform init -backend-config=backend.tfvars \
                                          -backend-config=key=${env}/${app}.tfstate \
                                          -backend-config=dynamodb_table=${backend_config_dynamodb_table} \
                                          -backend-config=bucket=${state_bucket}
                                  """

                                  def terraformStatus = sh(
                                      returnStatus:true,
                                      script: """
                                          (cd deploy/terraform
                                          terraform plan -detailed-exitcode -var=stack=${stack} \
                                              -var=app=${app} \
                                              -var=env=${env} \
                                              -var=state_bucket=${state_bucket} \
                                              -var=task_definition=${taskDefinition} \
                                              -var=include_ecs_service=${terraformService} \
                                              -out=.plan)
                                      """
                                  )


                                  switch(terraformStatus) {
                                      case 0: // no changes found
                                          terraformHasChange = false;
                                          break;
                                      case 2: // changes found
                                          terraformHasChange = true;
                                          stash includes: 'deploy/terraform/.plan', name: 'plan'
                                          slackSend channel: slackChannelInfra, color: 'warning', message: "Terraform Plan Pending: ${JOB_NAME} - ${BUILD_NUMBER}"
                                          break;
                                      default: // error
                                          slackSend channel: slackChannelInfra, color: 'error', message: "Terraform Plan Failed: ${JOB_NAME} - ${BUILD_NUMBER}"
                                          exit 1;
                                          break;
                                  }
                              }
                          }
                      }
                  }
                  milestone(50)
              }
          }

          stage("7. Infra - apply") {
              input {
                  message 'Continue with infra apply?'
              }
              agent {
                  ecs {
                  inheritFrom "${app_environment[env.BRANCH_NAME].jenkinsAgent}"
                  image "${app_environment[env.BRANCH_NAME].accountId}.dkr.ecr.eu-west-2.amazonaws.com/jenkins-terraform-slave:latest"
                  }
              }
              environment { //todo can the agent determine path.
                  PATH = "${env.PATH}:/usr/local/bin"
                  J_NAME = "${env.JOB_NAME}"
                  B_NUMBER = "${env.BUILD_NUMBER}"
                  TF_VAR_aws_account_id = "${app_environment["${env.BRANCH_NAME}"].accountId}"
                  TF_VAR_aws_master_role = "${app_environment["${env.BRANCH_NAME}"].awsMasterRole}"
                  TF_VAR_alb_listener_host_override = "${app_environment["${env.BRANCH_NAME}"].alternateDomain}"
              }
              when {
                  beforeAgent true
                  beforeInput true
                  anyOf {
                    branch 'develop'
                    branch 'master'
                  }
                  expression { terraformHasChange == true }
              }
              steps {
                  lock(env.JOB_NAME) {
                      // TODO - move tf here - needs approval steps e.g. following stages only when required
                      // TODO - env -> plan mapping
                      withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: app_environment["${env.BRANCH_NAME}"].jenkinsCredentialsId, secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                          sshagent (credentials: ['git-ssh-credentials-readonly']) {
                              unstash 'plan'
                              script {
                                  def app = app_environment["${BRANCH_NAME}"].app
                                  def clusterName = app_environment["${BRANCH_NAME}"].clusterName
                                  def backend_config_dynamodb_table = app_environment["${BRANCH_NAME}"].backendConfigDynamoDbTable
                                  def state_bucket = app_environment["${BRANCH_NAME}"].state_bucket

                                  sh """
                                      mkdir $HOME/.ssh && chmod 700 $HOME/.ssh && ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
                                      cd deploy/terraform
                                          terraform init -backend-config=backend.tfvars \
                                          -backend-config=key=${env}/${app}.tfstate \
                                          -backend-config=dynamodb_table=${backend_config_dynamodb_table} \
                                          -backend-config=bucket=${state_bucket}
                                          terraform apply .plan
                                      cd ../../
                                  """
                              }
                          }
                      }
                  }
                  milestone(60)
              }
          }

          stage("8. Deploy app") {
              agent { node('master') }
              environment { //todo can the agent determine path.
                  PATH = "${env.PATH}:/usr/local/bin"
                  J_NAME = "${env.JOB_NAME}"
                  B_NUMBER = "${env.BUILD_NUMBER}"
                  TF_VAR_aws_account_id = "${app_environment[env.BRANCH_NAME].accountId}"
                  TF_VAR_aws_master_role = "${app_environment[env.BRANCH_NAME].awsMasterRole}"
              }
              when {
                  beforeAgent true
                  anyOf {
                    branch 'develop'
                    branch 'master'
                  }
              }

              steps {
              milestone(70)
                  script {
                  def clusterName = app_environment["${BRANCH_NAME}"].clusterName
                  def logGroupName = app_environment["${BRANCH_NAME}"].logGroupName
                  def taskFamily = app_environment["${BRANCH_NAME}"].taskFamily                  // 3. update-service to new taskdef, with previous desired count (or 1, whichever greater)
                  withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: app_environment["${env.BRANCH_NAME}"].jenkinsCredentialsId, secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {

                    sshagent (credentials: ['git-ssh-credentials-readonly']) {

                        def taskDefinition = getTaskDefinition(taskFamily, ecrRegion)
                        sh """
                            aws ecs update-service --cluster ${clusterName} --service ${serviceName} --task-definition ${taskDefinition} --region ${ecrRegion}
                        """
                        }
                     }
                  }
              }
          }
          stage("9: Jira Feedback..."){
            agent { node('master') }
            environment { //todo can the agent determine path.
              PATH = "${env.PATH}:/usr/local/bin"
              J_NAME = "${env.JOB_NAME}"
              B_NUMBER = "${env.BUILD_NUMBER}"

            }
            when {
                  beforeAgent true
                  anyOf {
                    branch 'develop'
                  }
              }
            steps {
              script{
                // This is for Build Feedback to Jira
                  println scm.branches[0].name
                  currentBranch = scm.branches[0].name
                  jiraSendBuildInfo branch: "${currentBranch}", site: 'autorama.atlassian.net'
                //
              slackSend channel: app_environment["${BRANCH_NAME}"].slackChannelQA, color: 'good', message: "Jenkins Job is Awaiting Approval: ${J_NAME} - ${B_NUMBER} to Merge to Master"
              }
            }
          }
          stage("10. Merge to Master?") {
              input {
                  message 'Merge to master?'
              }
              agent { node('master') }
              environment { //todo can the agent determine path.
                  PATH = "${env.PATH}:/usr/local/bin"
              }
              when {
                  beforeAgent true
                  beforeInput true
                  anyOf {
                    branch 'develop'
                  }
              }
              steps {
                  milestone(80)
                  script {
                      mergeAndPushBranch(app_environment, 'master');
                  }
              }
          }
      }
  }