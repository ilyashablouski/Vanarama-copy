#!groovy
import groovy.json.*

node('master') {
   ansiColor('xterm') {

    echo "${WORKSPACE}"

    // set global environment variables
    env.GIT_TAG = "jenkins-$BUILD_NUMBER"

    // This path is needed for terraform to work
    env.PATH += ":/usr/local/bin/"

    // aws environment variables required for aws cli
    env.AWS_DEFAULT_REGION = "eu-west-2"
    def ecRegistry      = "https://%ACCOUNT%.dkr.ecr.eu-west-2.amazonaws.com"

    // Jenkins Job specific variables
    def serviceName = "nextstorefront"
    def taskFamily
    def app_subdomain_name  = "autorama.co.uk"
    def currentBranch = ""
    def releaseBranch = ""
    def masterBranch = ""

    try {

      stage("1: Checkout scm..."){
        cleanWs()
        deleteDir()
        checkout scm
        currentBranch = scm.branches[0].name
        sh "docker build -t autorama-nextstorefront:latest -f Dockerfile ."
      }

      stage("2: Sonarqube analysis..."){

        // requires SonarQube Scanner 2.8+
        def scannerHome = tool 'SonarQubeScanner';
        withSonarQubeEnv('My SonarQube Server') {
        sh "${scannerHome}/bin/sonar-scanner"
        }
      }

      stage("3: Unit Test Execution...") {
          sh '''
          export PATH=/usr/local/bin:$PATH
          docker-compose -f ${WORKSPACE}/docker-compose.yml up -d
          docker-compose -f ${WORKSPACE}/docker-compose.yml exec -T --index=1 next-storefront /bin/bash -c "ls -a"
          docker-compose -f ${WORKSPACE}/docker-compose.yml exec -T --index=1 next-storefront /bin/bash -c "yarn install"
          docker-compose -f ${WORKSPACE}/docker-compose.yml exec -T --index=1 next-storefront /bin/bash -c "yarn test >results.xml "
          docker cp next-storefront:/usr/src/app/results.xml ${WORKSPACE}/results.xml
          docker-compose -f ${WORKSPACE}/docker-compose.yml down
          '''
      }

      if (currentBranch == "develop" || currentBranch == "devops")
      {
        stage ("4: Provision Dev Cluster...") {

              def currentService=""
              def taskDefinitionInitialNumber="nextstorefront:1"
              def clusterName = ""

              if(currentBranch == "devops")
              {
                clusterName = "Grid-Testing"
              }
              else{
                clusterName = "Grid-Development"
              }

              withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {


                // TODO : Add better logic to check cluster and service check
                def currentCluster = sh (
                        returnStdout: true,
                        script:  "                                                              \
                          aws ecs list-clusters --output text                                     \
                                              | egrep '${clusterName}'                              \
                                              | awk '{print \$2}'                               \
                        "
                      ).trim()

                println "current cluster : ${currentCluster}"

                dir('terraformECS') {
                git branch: 'master', credentialsId: 'TechAmigo-DevOps-New', url: 'https://github.com/Autorama/ACORNInfrastructure.git'

                if(currentCluster == "") {

                        sh """
                          cd ecs-cluster
                          terraform --version
                          terraform init -backend-config='key=service/ecs-service-${clusterName}.tfstate'
                          terraform plan -var-file=ecs-cluster-dev.tfvars -input=false -out=acorn-cluster-plan -var cluster=${clusterName} -var app_subdomain_name=${clusterName}.${app_subdomain_name}
                          terraform apply acorn-cluster-plan
                        """

                    } else {

                          sh 'echo -e "\033[32m"'
                          echo "Cluster ${clusterName} is already created"
                          sh 'echo -e "\033[0m"'

                    }

                    currentCluster = sh (
                        returnStdout: true,
                        script:  "                                                              \
                          aws ecs list-clusters --output text                                     \
                                              | egrep '${clusterName}'                              \
                                              | awk '{print \$2}'                               \
                        "
                      ).trim()

                    println "current cluster : ${currentCluster}"

                    if (currentCluster != "")
                    {
                        currentService = sh (
                                returnStdout: true,
                                script:  "                                                              \
                                  aws ecs list-services --cluster ${clusterName} --output text                                     \
                                                      | egrep '${serviceName}'                              \
                                                      | awk '{print \$2}'                               \
                                "
                              ).trim()

                    println "current Service: ${currentService}"

                    // TODO : find the better solution for task definition and service create and update
                    if(currentService == "") {
                      sh """
                          cd ecs-service
                          terraform init -backend-config='key=service/ecs-service-${clusterName}.tfstate'
                          terraform plan -var-file=ecs-service-dev.tfvars -input=false -out=acorn-service-plan -var service_name=${serviceName} -var cluster_arn=${currentCluster} -var task_definition=${taskDefinitionInitialNumber}
                          terraform apply acorn-service-plan
                        """
                      } else {

                              sh 'echo -e "\033[32m"'
                              echo "Service ${serviceName} is already created"
                              sh 'echo -e "\033[0m"'
                      }
                    }
                  }
              }
          }

      stage("5: Dev Deploy...") {

        def clusterName = ""
        if(currentBranch == "devops")
        {
          clusterName = "Grid-Testing"
        }
        else{
          clusterName = "Grid-Development"
        }

        def taskDefile      = "file://aws/task-definition-development.json"
        taskFamily = "nextstorefront"

        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-techamigo-keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {

          sh '''#!/usr/bin/env bash
              if [[ $(aws ecr describe-repositories --query 'repositories[?repositoryName==`autorama-nextstorefront`].repositoryUri' --output text) -lt 1 ]]; then
              aws ecr create-repository --repository-name autorama-nextstorefront;
              fi
          '''

          sh '''
            export ECR_REPO=$(aws ecr describe-repositories --query 'repositories[?repositoryName==`autorama-nextstorefront`].repositoryUri' --output text)
            $(aws ecr get-login --no-include-email )
            docker tag autorama-nextstorefront:latest ${ECR_REPO}:latest
            docker push ${ECR_REPO}:latest
          '''

            // Get current [TaskDefinition#revision-number]
              def currTaskDef = sh (
                returnStdout: true,
                script:  "                                                              \
                  aws ecs describe-task-definition  --task-definition ${taskFamily}     \
                                                    | egrep 'revision'                  \
                                                    | tr ',' ' '                        \
                                                    | awk '{print \$2}'                 \
                "
              ).trim()

          println "current task Def: ${currTaskDef}"

          def currentTask = sh (
            returnStdout: true,
            script:  "                                                              \
              aws ecs list-tasks  --cluster ${clusterName}                          \
                                  --family ${taskFamily}                            \
                                  --output text                                     \
                                  | egrep 'TASKARNS'                                \
                                  | awk '{print \$2}'                               \
           "
          ).trim()

          println "current task : ${currentTask}"

          if(currTaskDef) {
            sh  "                                                                   \
              aws ecs update-service  --cluster ${clusterName}                      \
                                      --service ${serviceName}                      \
                                      --task-definition ${taskFamily}:${currTaskDef}\
                                      --desired-count 0                             \
            "
          }

          if (currentTask) {
            sh "aws ecs stop-task --cluster ${clusterName} --task ${currentTask}"
          }

          // Register the new [TaskDefinition]
          // TODO : addition of the execution role in automated way
          sh  "                                                                     \
            aws ecs register-task-definition --execution-role-arn arn:aws:iam::000379120260:role/Acorn-DevOps --family ${taskFamily}                \
                                              --cli-input-json ${taskDefile}        \
          "

          // Get the last registered [TaskDefinition#revision]
          def taskRevision = sh (
            returnStdout: true,
            script:  "                                                              \
              aws ecs describe-task-definition  --task-definition ${taskFamily}     \
                                                | egrep 'revision'                  \
                                                | tr ',' ' '                        \
                                                | awk '{print \$2}'                 \
            "
          ).trim()

          // ECS update service to use the newly registered [TaskDefinition#revision]
          sh  "                                                                     \
            aws ecs update-service  --cluster ${clusterName}                        \
                                    --service ${serviceName}                        \
                                    --task-definition ${taskFamily}:${taskRevision} \
                                     --desired-count 1                              \
          "
          }
        }
      }

      stage("6: Jira Feedback..."){
          // This is for Build Feedback to Jira
          println scm.branches[0].name
          currentBranch = scm.branches[0].name
          jiraSendBuildInfo branch: "${currentBranch}", site: 'autorama.atlassian.net'
          //
      }

      } catch(Exception e) {

          // These commands ensure that if the pipeline fails in Stage 2 that the container does not stay up! //
          sh '''
            export PATH=/usr/local/bin:$PATH
            docker-compose -f ${WORKSPACE}/docker-compose.yml down
          '''
          // If the unit tests try/catch section remains viable then the docker-compose above will be redundant


          // These commands are simple checks at the end of the Jenkinsfile to ensure correct clean-up //
          sh '''
            ls -a
            docker ps -a
          '''

          // Printing Error sets and exiting pipeline //
          println "${e}"
          error "Program failed, please read logs..."

        }
   }
}
