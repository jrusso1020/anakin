---
title: Automating Deploys to Kubernetes with CircleCI
date: "2019-10-11"
description: This tutorial shows how to automate deployments to Kubernetes using CircleCI. This tutorial uses AWS services like ECR and EKS, but it can be generalized and changed for other Kubernetes solutions. This post will go through the entire CircleCI flow of deploying changes for your app to Kubernetes from updating the image and storing it in a repository to deploying the new application on EKS.
tags: ["Kubernetes", "EKS", "AWS", "CircleCI", "devops"]
---

There are multiple techniques and approaches for automating application updates to Kubernetes clusters. Different approaches offer different benefits and complexity. In a [previous post](/deploying-to-eks-codeship) of mine, I outlined my first attempt at deploying updated applications to a Kubernetes cluster using codeship. In this approach I just updated the image running on the containers in the deployment using the kubectl set image approach. In this tutorial I will use template Kubernetes yaml files, and update the Kubernetes configuration for the application then apply the changes. I will outline this in more detail throughout this post. Two other approaches I have come across in research but have yet to try are 1) using Helm and Helm templates to update Kubernetes yaml files and deploy changes and 2) using a Gitops flow to store all of your Kubernetes configurations and files, update them on changes, and deploy those changes. Gitops workflow is a technique espoused by [Weaveworks](https://www.weave.works/). I think this approach is something that interests me the most and I will continue to learn about and try to implement in the future. I'm always interested in learning more about Kubernetes and woudl be keen to hear about even more appraoches indviduals and organizations use. But for now let's talk about using Kubernetes template yaml files.

### Setting up your Kubernetes template files
I am going to skip over some details and make a few assumptions. My first assumption is that you have already created a Dockerfile for your application. Now once you are ready to deploy your application to your Kubernetes Cluster, we will need to prepare the template files that we will use to setup our Kubernetes configuration. In our case we have both a staging and production environment, so in our root application directory we make a `.k8s` folder for our templates. Then we create another directory `templates` within `.k8s` and here we place a `staging.yml` and `production.yml`. In the end you should have files setup like so
```
.k8s
->templates
-->staging.yml
-->production.yml
```

Now let's take a simple deployment yaml file, and change it into a template that we can substitute values into on each deployment.
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  labels:
    app: app-staging
data:
  ENV_VALUE1: value1
  ENV_VALUE2: value2


---

apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: app-staging-deployment
  labels:
    app: app-staging
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-staging
  template:
    metadata:
      labels:
        app: app-staging
    spec:
      containers:
      - name: app-staging
        image: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:TAG
        ports:
          - containerPort: 3000
        envFrom:
          - configMapRef:
              name: app-config

---
kind: Service
apiVersion: v1
metadata:
  name: app-staging-service
spec:
  type : LoadBalancer
  selector:
    app: app-staging
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

In order to make it a template all you need to do is to make a few basic changes so that you can substitute environment variables from CircleCI into the template when deploying.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  labels:
    app: app-staging
data:
  ENV_VALUE1: ${STAGING_ENV_VALUE1}
  ENV_VALUE2: ${ENV_VALUE2}


---

apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: app-staging-deployment
  labels:
    app: app-staging
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-staging
  template:
    metadata:
      labels:
        app: app-staging
    spec:
      containers:
      - name: app-staging
        image: ${AWS_REPOSITORY_URL}/${REPOSITORY_NAME}:${CIRCLE_BRANCH}-${CIRCLE_BUILD_NUM}
        ports:
          - containerPort: 3000
        envFrom:
          - configMapRef:
              name: app-config

---
kind: Service
apiVersion: v1
metadata:
  name: app-staging-service
spec:
  type : LoadBalancer
  selector:
    app: app-staging
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
```

And just like that you have the staging template setup as staging.yml. You can recreate a similar production.yml for your production builds. If there is no change between your production and staging builds you can technically use the same template. However, you can see in the ConfigMap of the template `STAGING_ENV_VALUE1` which is a specific variable just for staging. Then in your production template you would get `PRODUCTION_ENV_VALUE1`. Next we will setup our CircleCI and our `.config.yml` for deployments.

### Setting up CircleCI for deployments
Before setting up your `.circleci/config.yml` file I would recommend making sure you setup all your necessary environment variables in CircleCI. In our case we use AWS's ECR and EKS services so we need to set up the AWS credentials in CircleCI including the Access Key Id and Secret Access Key. There is an AWS Credentials location you can put these or you can set them yourselves as Environment variables. Make sure the account credentials you are using are setup to deploy to both ECR and EKS and it has the proper Kubernetes permissions. You can set the Kubernetes permissions through the RBAC permissions of the cluster to give it access but I will not cover this here. Other important variables to make sure you set in CircleCI are Docker image repository url and repository name which are used by the build to save the new Docker Image. `CIRCLE_BRANCH` and `CIRCLE_BUILD_NUM` are given to us by CircleCI and all other variables are app dependent. Two environment variable that we have not seen yet but will need are the `CLUSTER_NAME` which is our Kubernetes cluster name and `AWS_DEFAULT_REGION` which is the AWS region of the cluster. We will need these later during deployment.

Now let's create the `.circleci.config.yml` file which will do the work of building our docker image and deploying our new application to our Kubernetes cluster.
```yaml
---
version: 2.1
jobs:
  setup:
    docker:
      - image: circleci/node:10.15.3
    working_directory: ~/app
    steps:
      - checkout
      - run:
          name: Update npm
          command: 'sudo npm install -g npm@latest'
      - restore_cache:
          key: dependency-cache-{{ .Branch }}-{{ checksum "package.json" }}
      - run:
          name: Install npm
          command: npm install
      - save_cache:
          key: dependency-cache-{{ .Branch }}-{{ checksum "package.json" }}
          paths:
            - node_modules
      - save_cache:
          key: v1-repo-{{ .Branch }}-{{ .Environment.CIRCLE_SHA1 }}
          paths:
            - ~/app
  test:
    docker:
      - image: circleci/node:10.15.3
    working_directory: ~/app
    steps:
      - restore_cache:
          key: v1-repo-{{ .Branch }}-{{ .Environment.CIRCLE_SHA1 }}
      - restore_cache:
          key: dependency-cache-{{ .Branch }}-{{ checksum "package.json" }}
      - run:
          name: Test code
          command: npm test
      - persist_to_workspace:
          root: ~/app
          paths:
            - .

  build_image_and_deploy_staging:
    docker:
      - image: circleci/python:3.7

    working_directory: ~/app

    steps:
      - attach_workspace:
          at: ~/app

      - run:
          name: Install awscli and gettext-base
          command: |
            sudo pip3 install awscli
      - run:
          name: Install aws-iam-authenticator
          command: |
            curl -o aws-iam-authenticator curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.13.7/2019-06-11/bin/linux/amd64/aws-iam-authenticator
            chmod +x ./aws-iam-authenticator
            sudo mv ./aws-iam-authenticator /usr/local/bin/aws-iam-authenticator
      - run:
          name: Install kubectl
          command: |
            curl -o kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.13.7/2019-06-11/bin/linux/amd64/kubectl
            chmod +x ./kubectl
            sudo mv ./kubectl /usr/local/bin/kubectl

      - setup_remote_docker

      - run:
          name: Login to repository and build docker image
          command: |
            eval $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
            docker build -t ${AWS_REPOSITORY_URL}/${REPOSITORY_NAME}:${CIRCLE_BRANCH}-${CIRCLE_BUILD_NUM} .
            docker push ${AWS_REPOSITORY_URL}/${REPOSITORY_NAME}:${CIRCLE_BRANCH}-${CIRCLE_BUILD_NUM}
      - run:
          name: Prepare K8S templates
          command: |
            aws eks --region $AWS_DEFAULT_REGION update-kubeconfig --name $CLUSTER_NAME
            rm -rf .k8s/.generated && mkdir -p .k8s/.generated
            for f in .k8s/templates/staging.yml
              do
              envsubst < $f > ".k8s/.generated/$(basename $f)"
            done
      - run:
           name: Deploy
           command: |
             kubectl apply -f .k8s/.generated/ --validate=true
             kubectl get pod

workflows:
  build-test-and-deploy:
    jobs:
      - setup
      - test:
          requires:
           - setup
      - build_image_and_deploy_staging:
          requires:
            - test
          filters:
            branches:
              only:
                - master
```

The `setup` and `test` jobs that are listed here but can be changed for you specific app, in this case we used a simple node application as an example. The `build_image_and_deploy_staging` job is the bulk of this config and tutorial. At the bottom of the config.yml file you can see the workflow section that shows you need to run the `setup` and `test` jobs before building the image and deploying it. I will not cover this, but you can look at it to get an idea of the complete workflow. Now let's go through the `build_image_and_deploy_staging` job bit by bit.

```yaml
build_image_and_deploy_staging:
    docker:
      - image: circleci/python:3.7

    working_directory: ~/app
```
The main thing to note here is that we use a python docker image because we need the awscli command since we are deploying to ECR and EKS.

```yaml
- attach_workspace:
    at: ~/app
```
First we attach the workspace from our previous jobs so we can use the same checked out code and dependencies if any that have been installed. If you do not have any other jobs before this make sure you use the `checkout` command to checkout your code and do any other setup that is necessary.

```yaml
- run:
    name: Install awscli and gettext-base
    command: |
      sudo pip3 install awscli
```
This installs the awscli command so that we can interact with ECR and EKS.

```yaml
- run:
    name: Install aws-iam-authenticator
    command: |
      curl -o aws-iam-authenticator curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.13.7/2019-06-11/bin/linux/amd64/aws-iam-authenticator
      chmod +x ./aws-iam-authenticator
      sudo mv ./aws-iam-authenticator /usr/local/bin/aws-iam-authenticator
```
Now we download the `aws-iam-authenticator` utility so that we can authenticate our AWS credentials when interacting with EKS.

```yaml
- run:
    name: Install kubectl
    command: |
      curl -o kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.13.7/2019-06-11/bin/linux/amd64/kubectl
      chmod +x ./kubectl
      sudo mv ./kubectl /usr/local/bin/kubectl
```
The last bit of setup is to download the `kubectl` utility so that we can interact with our Kubernetes cluster.

```yaml
- setup_remote_docker
```
From the [CircleCI website](https://discuss.circleci.com/t/confused-about-what-setup-remote-docker-really-does/11469?gclid=EAIaIQobChMI28K-5JSV5QIVzZyzCh0eMAFaEAAYASAAEgIuNvD_BwE) "When you run `setup_remote_docker`, we allocate a remote Docker engine. You are connecting to it via TCP. You can’t run Docker within Docker, as noted at the top of the documentation: For security reasons, the Docker Executor doesn’t allow building Docker images within a job space."

```yaml
- run:
    name: Login to repository and build docker image
    command: |
      eval $(aws ecr get-login --region $AWS_DEFAULT_REGION --no-include-email)
      docker build -t ${AWS_REPOSITORY_URL}/${REPOSITORY_NAME}:${CIRCLE_BRANCH}-${CIRCLE_BUILD_NUM} .
      docker push ${AWS_REPOSITORY_URL}/${REPOSITORY_NAME}:${CIRCLE_BRANCH}-${CIRCLE_BUILD_NUM}
```
This command gets login credentials from ECR, then builds our Docker image and pushes it to our remote ECR repository. As you can see we use the same environment variables that we used in the template, and therefore are able to make sure we use the same Docker image when generating our Kubernetes deployment file from the template.

```yaml
- run:
    name: Prepare K8S templates
    command: |
      aws eks --region $AWS_DEFAULT_REGION update-kubeconfig --name $CLUSTER_NAME
      rm -rf .k8s/.generated && mkdir -p .k8s/.generated
      for f in .k8s/templates/staging.yml
        do
        envsubst < $f > ".k8s/.generated/$(basename $f)"
      done
```
Here we first configure our kubectl in this workspace to use our kubeconfig from our cluster. Without this we will not be able to interact with our cluster or issue commands to it. The next command removes any lingering generated deployment files just in case. Then we use the `envsubst` command to replace all the environment variables in our `staging.yml` template and generate a new Kubernetes deployment config.

```yaml
- run:
   name: Deploy
   command: |
     kubectl apply -f .k8s/.generated/ --validate=true
```
The final command applies our generated Kubernetes deployment file while validating it. You can add a command after this to check for the deployment's progress if you would like. But with this command we have just successfully deployed our changes to our Kubernetes cluster.
