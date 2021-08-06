serviceName = 'next-storefront'
ecrRegion = 'eu-west-2'
stack = 'grid'
taskDefFile = "deploy/aws/task-definition.json"
branchName = "${env.BRANCH_NAME}"

// Get souce branch name for PR based Jenkins build
if (branchName =~ /PR-\d+/) {
    branchName = "${env.CHANGE_BRANCH}"
}

def app_environment = [
    "dev": [
        clusterName: 'grid-dev',
        logGroupName: "dev/grid/apps",
        taskFamily: "grid-dev-${serviceName}",
        app: "${serviceName}",
        ssmParametersBase: "arn:aws:ssm:eu-west-2:000379120260:parameter/dev/${stack}/${serviceName}",
        env: 'dev',
        stack: 'grid',
        slackChannelInfra: '#dev-infra-approvals',
        slackChannelQA: '#qa-code-approvals',
        jenkinsCredentialsId: 'aws-keys-terraform-grid-dev',
        ecrCredentialId: 'aws-keys-terraform-grid-dev',
        accountId: '000379120260',
        awsMasterRole: '', //empty while dev has master account credentials
        state_bucket: 'autorama-terraform-state',
        backendConfigDynamoDbTable: 'autorama-terraform-state-lock',
        jenkinsAgent: 'grid-dev-jenkins-agent',
        dockerRepoName: "000379120260.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}",
        NODE_ENV: 'development',
        terraformService: true,
        alternateDomain: 'dev.vanarama-nonprod.com',
        imgOptimisationHost: 'https://dev.vanarama-nonprod.com'
    ],
    "uat": [
        clusterName: 'grid-uat',
        logGroupName: "uat/grid/apps",
        taskFamily: "grid-uat-${serviceName}",
        app: "${serviceName}",
        ssmParametersBase: "arn:aws:ssm:eu-west-2:126764662304:parameter/uat/${stack}/${serviceName}",
        env: 'uat',
        stack: 'grid',
        slackChannelInfra: '#dev-infra-approvals',
        slackChannelQA: '#qa-code-approvals',
        jenkinsCredentialsId: 'aws-keys-terraform-grid-test',
        ecrCredentialId: 'aws-keys-terraform-grid-test',
        accountId: '126764662304',
        awsMasterRole: 'arn:aws:iam::126764662304:role/AutoramaGridDelegate',
        state_bucket: 'grid-terraform-state-1',
        backendConfigDynamoDbTable: 'uat-grid-terraform-state-lock',
        jenkinsAgent: 'grid-uat-jenkins-agent',
        dockerRepoName: "126764662304.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}",
        NODE_ENV: 'development',
        terraformService: true,
        alternateDomain: 'uat.vanarama-nonprod.com',
        imgOptimisationHost: 'https://uat.vanarama-nonprod.com'
    ],
    "pre-prod": [
        clusterName: 'grid-pre-prod',
        logGroupName: "pre-prod/grid/apps",
        taskFamily: "grid-pre-prod-${serviceName}",
        app: "${serviceName}",
        ssmParametersBase: "arn:aws:ssm:eu-west-2:148418686323:parameter/pre-prod/${stack}/${serviceName}",
        env: 'pre-prod',
        stack: 'grid',
        slackChannelInfra: '#dev-infra-approvals',
        slackChannelQA: '#qa-code-approvals',
        jenkinsCredentialsId: 'aws-keys-terraform-grid-prod',
        ecrCredentialId: 'aws-keys-terraform-grid-test',
        accountId: '148418686323',
        awsMasterRole: 'arn:aws:iam::000379120260:role/AutoramaGridDelegate',
        state_bucket: 'grid-terraform-state-2',
        backendConfigDynamoDbTable: 'pre-prod-grid-terraform-state-lock',
        jenkinsAgent: 'grid-pre-prod-jenkins-agent',
        dockerRepoName: "126764662304.dkr.ecr.${ecrRegion}.amazonaws.com/${serviceName}",
        NODE_ENV: 'development',
        terraformService: true,
        alternateDomain: 'vanarama-prod.com',
        imgOptimisationHost: 'https://vanarama-prod.com'
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

def getConfig() {
    if ( "${branchName}".contains('hotfix/') ) {
        return 'pre-prod'
    } else if ( "${branchName}".contains('release/') ) {
        return 'uat'
    } else {
        return 'dev'
    }
}

def createReleaseBranch(appEnvironment, sourceBranch) {

    cleanWs()
    
    def dateNow = new Date()
    def appName = appEnvironment["${getConfig()}"].app
    def releaseBranchName = "release/R${env.BUILD_NUMBER}-${dateNow.format('ddMMyyyy')}"

    try {
        git branch: "${sourceBranch}", credentialsId: 'TechAmigo-DevOps-New', url: "https://github.com/Autorama/${appName}.git"

        sh "git config user.email devops@techamigos.com"
        sh "git config user.name 'devops'"
        sh "git remote set-url origin git@github.com:Autorama/${appName}.git"

        sh """
        git checkout -b ${releaseBranchName}
        """

        sshagent(['autorama']) {
        sh"""
            #!/usr/bin/env bash
            set +x
            export GIT_SSH_COMMAND="ssh -oStrictHostKeyChecking=no"
            git push origin ${releaseBranchName}
        """
        }
    } catch (err) {
        println err
        slackSend channel: appEnvironment["${getConfig()}"].slackChannelQA, color: 'warning', message: "Release branch ${releaseBranchName} creation failed for : ${env.JOB_NAME} - ${env.BUILD_NUMBER} "
        currentBuild.result = 'UNSTABLE'
    }
}

def getDockerTagName() {
    if ( "${branchName}" =~ "hotfix/*" ) {
        return "${branchName}_pre-prod".replace("hotfix/", "hotfix-H${env.CHANGE_ID}-B${env.BUILD_NUMBER}-")
    } else if ( "${branchName}" =~ "release/*" ) {
        return "${branchName}_uat".replace('/', '-')
    } else {
        // for develop, create artifact following this format - develop-B<build-no>-<date>
        def dateNow = new Date()
        return "${branchName}-D${env.BUILD_NUMBER}-${dateNow.format('ddMMyyyy')}".replace('/', '-')
    }
}

// Definition for Build Badge Status 
def BuildBadge = addEmbeddableBadgeConfiguration(id: "BuildBadge", subject: "build")


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
                  branch 'release/*'
                  changeRequest target: 'master'
                }
            }

            steps {
              script {
                def ecrCredentialId = app_environment["${getConfig()}"].ecrCredentialId
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${ecrCredentialId}" , secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                    sh "aws ecr describe-repositories --repository-names ${serviceName} --region ${ecrRegion} || aws ecr create-repository --repository-name ${serviceName} --region ${ecrRegion}"
                }
              }
            }
        }

        stage("2: Unit testing") {
            //TODO: run me in docker -- zero cleanup required; also concurrency safe
            agent {
               ecs {
                   inheritFrom 'grid-dev-jenkins-agent'  // This is not within customers
                }
            }
            //agent { node('master') }
            environment { //todo can the agent determine path.
                PATH = "${env.PATH}:/usr/local/bin"
            }

            steps {
              milestone(10)
              withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                  nodejs('node') {
                    sh '''npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"'''
                    sh "du -sh *" 
                    sh "yarn install"
                    // sh "yarn pack --filename next-storefront.tar.gz"
                    sh "yarn test --coverage"
                    sh "yarn lint"
                    sh "yarn typecheck"
                    sh "du -sh *"   
                    // sh "yarn build"
                    // stash includes: 'next-storefront.tar.gz', name: 'package'
                    }
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
                  branch 'release/*'
                  changeRequest target: 'master'
                }
            }

            steps {
              milestone(30)

              script {
                def jenkinsCredentialsId = app_environment["${getConfig()}"].jenkinsCredentialsId
                def ecrCredentialId = app_environment["${getConfig()}"].ecrCredentialId
                ecrLogin(ecrCredentialId)
                def dockerRepoName = app_environment["${getConfig()}"].dockerRepoName
                def envs = app_environment["${getConfig()}"].env
                def stack = app_environment["${getConfig()}"].stack
                def NODE_ENV = app_environment["${getConfig()}"].NODE_ENV
                def alternateDomain = app_environment["${getConfig()}"].alternateDomain
                def imgOptimisationHost = app_environment["${getConfig()}"].imgOptimisationHost
                
                    //TO DO - Paramaterise the source function with env variable
                    withCredentials([string(credentialsId: 'npm_token', variable: 'NPM_TOKEN')]) {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${jenkinsCredentialsId}" , secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]){
                    sh """
                      source ./setup.sh ${envs} ${stack} ${serviceName} ${ecrRegion} ${getConfig()} ${alternateDomain} ${imgOptimisationHost}
                      docker pull $dockerRepoName:latest || true
                      docker build -t $dockerRepoName:${getDockerTagName()} --build-arg NPM_TOKEN=${NPM_TOKEN} --build-arg PRERENDER_SERVICE_URL=\${PRERENDER_SERVICE_URL} --build-arg API_KEY=\${API_KEY} --build-arg API_URL=\${API_URL} --build-arg ENV=\${ENV} --build-arg GTM_ID=\${GTM_ID} --build-arg HEAP_ID=\${HEAP_ID} --build-arg MICROBLINK_URL=\${MICROBLINK_URL} --build-arg IMG_OPTIMISATION_HOST=\${IMG_OPTIMISATION_HOST} --build-arg LOQATE_KEY=\${LOQATE_KEY} --build-arg NODE_ENV=${NODE_ENV} --build-arg HOST_DOMAIN=\${HOST_DOMAIN} --cache-from $dockerRepoName:latest .
                      docker push $dockerRepoName:${getDockerTagName()}
                      docker tag $dockerRepoName:${getDockerTagName()} $dockerRepoName:latest
                      docker push $dockerRepoName:latest
                      docker rmi $dockerRepoName:latest
                    """
                  }
                }
               }
            }
        }
          stage("5: Jira Feedback..."){
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
                    branch 'release/*'
                  }
              }
            steps {
              script{
                // This is for Build Feedback to Jira
                    println scm.branches[0].name
                    currentBranch = scm.branches[0].name
                    if ( branchName == 'develop' ) {
                        jiraSendBuildInfo branch: "${currentBranch}", site: 'autorama.atlassian.net'
                        slackSend channel: app_environment["${getConfig()}"].slackChannelQA, color: 'warning', message: "Jenkins Job: ${J_NAME} - ${B_NUMBER} is ready for approval into UAT"
                    } else if (branchName =~ 'release/*') {
                        // jiraSendDeploymentInfo
                        slackSend channel: app_environment["${getConfig()}"].slackChannelQA, color: 'good', message: "Jenkins Job: ${J_NAME} - ${B_NUMBER} is applied to UAT"
                    }
                //
              }
            }
          }
          
          stage("6. Cut a release?") {
            input {
                message 'Cut a release?'
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
                    createReleaseBranch(app_environment, 'develop')
                }
            }
          }
      }
  }
