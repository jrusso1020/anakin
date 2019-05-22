---
title: Deploying a New Docker Image to an EKS Cluster on Codeship
date: "2019-05-19"
description: This is a tutorial about how to deploy a new Docker image to your Kubernetes worker nodes with Codeship when you've deployed your cluster on EKS. This was based on a combination of tutorials found on Codeship and comments and extraneous links. The documentation on Codeship requires you to look in multiple places and is outdated in some cases, so hopefully this aggregates it in one place and updates it.
---

In two of my previous posts we [created a Docker image for a Next.js application and pushed it to ECR](/next-js-docker-ecr), and then we also talked about [setting up and deploying an application to EKS](/setup-deployment-on-eks). This post details how to setup auto deployments to EKS on Codeship for your application's Docker images. We ran into quite a few problems trying to follow Codeship's documentation, so hopefully this post can help some other's get through the issues we encountered.

### Codeship Pro vs Codeship Basic
The first thing to note is that all the examples on Codeship are done using Codeship Pro, which is their newer offering. We have been using Codeship for a few years now and have all of our projects using Codeship Basic. Although it is possible to use Codeship Basic to deploy to EKS, it's much easier to use Codeship Pro because Codeship has created Docker containers to help you. So we started our new project with Codeship Pro and this tutorial will be done using Codeship Pro. In order to use Codeship Pro you must define a "codeship-services.yml" and a "codeship-steps.yml". These files tell Codeship how to setup your project and how you want to test and deploy it. I will go over how we setup both of these files to test our application, push an updated image to ECR, and deploye the updated image to EKS.

### Codeship Services
Let's start by showing you our "codeship-services.yml", and then we can go over what each section of this file is doing.
```yaml
app-staging:
  build:
    image: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging
    dockerfile: Dockerfile.staging
  volumes:
    - .:/code

app-production:
  build:
    image: 146222393540.dkr.ecr.us-east-1.amazonaws.com/app-production
    dockerfile: Dockerfile.production
  volumes:
    - .:/code

app-test:
  build:
    image: company_name/app
    dockerfile: Dockerfile.codeship

aws-generator:
  image: codeship/aws-ecr-dockercfg-generator
  encrypted_env_file: aws_creds_k8s_env.encrypted # contains Secret, AccessKey, Region, and k8s config
  add_docker: true

kubernetes-deployment:
  encrypted_env_file: aws_creds_k8s_env.encrypted
  image: codeship/eks-kubectl

```

#### Creating our App's Docker Container
```yaml
app-staging:
  build:
    image: ACCOUNT_ID.dkr.ecr.AWS_REGION.amazonaws.com/app-staging
    dockerfile: Dockerfile.staging
  volumes:
    - .:/code

app-production:
  build:
    image: 146222393540.dkr.ecr.us-east-1.amazonaws.com/app-production
    dockerfile: Dockerfile.production
  volumes:
    - .:/code
```
The first part of this file creates our staging and production app services which create a Docker images. These will be the images that we push to ECR and then deploy to EKS. Since they are essentially the same we will only go over the staging application. We must specify the image name and the dockerfile to use to build the image. The **volumes** value allows us to define where our applications code will reside, which in this case is within the /code directory.

#### Creating our App's Test Service
```yaml
app-test:
  build:
    image: company_name/app
    dockerfile: Dockerfile.codeship
```
This is similar to our **app** service. Here we are defining a Docker container for us to run our tests in, but as you can see the Dockerfile we are using is different. This is because we can simplify our container so that it doesn't necessarily need to run the application our build it. We just need our applications files in the container so that we can run our test commands.

#### Creating the aws-generator Service
```yaml
aws-generator:
  image: codeship/aws-ecr-dockercfg-generator
  encrypted_env_file: aws_creds_k8s_env.encrypted # contains Secret, AccessKey, Region, and k8s config
  environment:
    - AWS_REGION=us-east-1
  add_docker: true
```
The **aws-generator** service is how we are going to push our new Docker image to ECR and tag it. We use the **codeship/aws-ecr-dockercfg-generator** Docker image which has functionality to push to ECR built into it. We pass an **encrypted_env_file** value of **aws_creds_k8s_env.encrypted** which is a file within our code repository. This file is an encrypted **.env** file so that we can check it into the repo but includes AWS credentials and our kubeconfig file so we can deploy to EKS. This **.env** file consists of the following keys
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
ENV_VAR_HELPER=...
```
The **AWS_ACCESS_KEY_ID** and **AWS_SECRET_ACCESS_KEY** are your AWS access key and secret for an account that has both ECR push access and EKS deploy access. The **AWS_REGION** is the region that you have your ECR repository and EKS cluster. **ENV_VAR_HELPER** is a special value that has your kubeconfig stored in it. You must make sure that your kubeconfig stored in this value has both of your clusters (staging and production) in it. We generate this value using a Docker container made by Codeship. This can be done using the following commands.
```bash
kubectl config view --flatten > kubeconfigdata
docker run --rm -it -v $(pwd):/files codeship/env-var-helper cp kubeconfigdata:/root/.kube/config k8s-env
```
The first command flattens your kubeconfig and stores it in a file called kubeconfigdata. Then we run a command using the **codeship/env-var-helper** Docker container. This creates a **k8s-env** file which will have your **ENV_VAR_HELPER** value. You can either move this **ENV_VAR_HELPER** value to another **.env** file or put your AWS credentials in here.

In order to create the **aws_creds_k8s_env.encrypted** file we must download and use the `jet` cli created by Codeship. This cli allows us to run our Codeship Pro builds locally as well as encrypt values. First you must get your aes key from your Codeship Pro project. You can find this in the settings. Copy and paste the value into a file called **codeship.aes** (you can use another name for the file but you will need to pass that value into the jet command using --key-path). Next you need to download the `jet` cli, which can be done through homebrew on mac using the following command `brew cask install codeship/taps/jet` or you can look [here](https://documentation.codeship.com/pro/jet-cli/installation/) to see how to install on other machines. Once it is installed, you can encrypt your **.env** file by using the following command `jet encrypt .env aws_creds_k8s_env.encrypted`. You can replace **.env** with whatever you have named your environment file and the same goes for the second command which is the name of the outputted encrypted file.

The last key in this service is **add_docker**. The **add_docker** key tells the service to make sure it adds docker to the container so that we can run docker cli specific commands. These are necessary to build our image and deploy to ECR.

#### Creating the kubernetes-deployment Service
```yaml
kubernetes-deployment:
  encrypted_env_file: aws_creds_k8s_env.encrypted
  image: codeship/eks-kubectl
```
This last service, **kubernetes-deployment**, will be how we deploy our updated Docker image to our EKS cluster. We also pass in our encrypted environment file here `encrypted_env_file: aws_creds_k8s_env.encrypted`. We then specify the image which is one created and maintained by codeship, `image: codeship/eks-kubectl`. This will allow us to run `kubectl` commands that modify our EKS cluster.

### Codeship Steps
```yaml
- name: ci
  type: parallel
  steps:
  - service: app-test
    command: npm test

- type: serial
  tag: master
  steps:
    - name: push-staging
      type: push
      image_tag: "{{.CommitID}}"
      service: app-staging
      registry: https://ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
      image_name: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging
      dockercfg_service: aws-generator
    - name: staging-deploy
      service: kubernetes-deployment
      command: /bin/sh -c 'kubectl config use-context arn:aws:eks:us-east-1:ACCOUNT_ID:cluster/app-staging && kubectl set image deployment/app-staging-deployment app-staging=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:$CI_COMMIT_ID'

- type: serial
  tag: production
  steps:
    - name: push-production
      type: push
      image_tag: "{{.CommitID}}"
      service: app-production
      registry: https://ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
      image_name: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-production
      dockercfg_service: aws-generator
    - name: production-deploy
      service: kubernetes-deployment
      command: /bin/sh -c 'kubectl config use-context user@app-production.us-east-1.eksctl.io && kubectl set image deployment/app-production-deployment app-production=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-production:$CI_COMMIT_ID'

```
Here is our full **codeship-steps.yml** file. We will talk about each section in more detail in the following sections, but as you can see it is broken up into two sections. The first section runs our test on every push to a branch on github. The second section handles deploying our application.

#### Testing
```yaml
- name: ci
  type: parallel
  steps:
  - service: app-test
    command: npm test
```
This section of the file handles running out tests. We have passed a **type** of **parallel** which means the following commands will all be run in parallel. Although we only have one test command, you could define multiples steps here and use **parallel** to split up your tests and run them in parallel so that you speed up your continuous integration. You must define what service to use, which in our case is **app-test** (our container we created for testing in the codeship-services.yml). You must also define the command to run which in our case is `npm test` since we are testing a Next.js application. This part of the **codeship-steps.yml** is run on every push of a branch to our Github repo and allows us to continuously test our application.

#### Deploying
```yaml
- type: serial
  tag: master
  steps:
    - name: push-staging
      type: push
      image_tag: "{{.CommitID}}"
      service: app-staging
      registry: https://ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
      image_name: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging
      dockercfg_service: aws-generator
    - name: staging-deploy
      service: kubernetes-deployment
      command: /bin/sh -c 'kubectl config use-context arn:aws:eks:us-east-1:ACCOUNT_ID:cluster/app-staging && kubectl set image deployment/app-staging-deployment app-staging=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:$CI_COMMIT_ID'

- type: serial
  tag: production
  steps:
    - name: push-production
      type: push
      image_tag: "{{.CommitID}}"
      service: app-production
      registry: https://ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
      image_name: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-production
      dockercfg_service: aws-generator
    - name: production-deploy
      service: kubernetes-deployment
      command: /bin/sh -c 'kubectl config use-context user@app-production.us-east-1.eksctl.io && kubectl set image deployment/app-production-deployment app-production=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-production:$CI_COMMIT_ID'
```
This is the meat of our **codeship-steps.yml** file and handles our deployments. As you can tell there is a separate set of steps for our staging and production deploys. As you can see, these steps have a type of **serial** because we want to run these steps one by one and only run the next one if the previous one was successful. The next thing to note is the **tag** value of **master** or **production**. This means that we are only going to run this step if we are on the **master** or **production** branches of our Github repo. Therefore these steps are skipped on most of our branches. There are two substeps of these steps, one for pushing the new updated Docker image to ECR and one to deploy to EKS. We will only go over the staging steps since they are the same as the production steps.

```yaml
- name: push-staging
  type: push
  image_tag: "{{.CommitID}}"
  service: app-staging
  registry: https://ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
  image_name: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging
  dockercfg_service: aws-generator
```
The **name** value can be anything you want it to be but we defined it as **push** since we are pushing to ECR. The **type** is also **push** since it is a push to ECR. The **image_tag** is what you want to tag your Docker image as when you push it to ECR. We use the commit sha so we can match a Docker image in ECR to a given commit in our git log. We are using the Go string template since that is how Codeship allows you to do this, and they give us access to the commit sha through the **CommitId** value. The **service** is which service in your **codeship-services.yml** you want to use. The **registry** value is what Docker image registry you are using. There are many different registries and you can use different ones. However, you may need to use a different Docker image for your **dockercfg_service** since we are using **codeship/aws-ecr-dockercfg-generator** which is ECR specific. The **image_name** is which repository in your registry to use. And finally, the **dockercfg_service** is the service from your **codeship-services.yml** that will know how to deploy to ECR.

```yaml
- name: staging-deploy
  service: kubernetes-deployment
  command: /bin/sh -c 'kubectl config use-context arn:aws:eks:us-east-1:ACCOUNT_ID:cluster/app-staging && kubectl set image deployment/app-staging-deployment app-staging=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:$CI_COMMIT_ID'
```
The last step is how we deploy changes to EKS. The **service** we are using is our **kubernetes-deployment** service which we defined in our **codeship-services.yml**. We then pass the **command** we want to run in the container to deploy to EKS. We run it with `/bin/sh -c '...'` so that we can pass it an environment value which in this case is **CI_COMMIT_ID**. This environment value is our commit's sha, which is what we used in the last step to tag our new image in ECR, and is necessary to deploy the right image to our EKS worker nodes. We then run two kubectl commands, `kubectl config use-context arn:aws:eks:us-east-1:ACCOUNT_ID:cluster/app-staging` and `kubectl set image deployment/app-deployment thor-staging=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app:$CI_COMMIT_ID` The first makes sure we use the right context for our cluster since our kubeconfig (which we stored in our encryped env file) has multiple clusters in it, staging and production. The second command set's our new Docker image on our EKS deployment that we defined in our initial deployment and is name **deployment/app-staging-deployment**. Now with that we have successfully pushed our new Docker image to ECR and deployed it to EKS.

### Using the Jet Cli
One cool thing that we haven't discussed yet in detail, is the ability to test your Codeship Pro build locally using the `jet` cli. You can do this by running the `jet steps` command to run your **codeship-steps.yml** file. This is a great tool for debugging locally before deploying. There are a few things to note for our **codeship-steps.yml** though. The first is that if you want to test your deploy steps you must pass the branch that triggers your deploy using the `--tag` flag. If you don't want your deploy to skip your **push** step to ECR or another container registry you need to pass the `--push` flag. And lastly, because we use the **CI_COMMIT_ID** environment variable you have to set this using the `--ci-commit-id` flag or else your test deploy will not have this value set, which will cause the push to error out. Altogether to test your full steps file you should run a command similar to this one `jet steps --tag master --push --ci-commit-id 4981234`

### Additional Resources
1. https://blog.codeship.com/using-aws-eks-in-your-continuous-integration-workflow/
2. https://documentation.codeship.com/pro/continuous-deployment/aws-eks/#deploying-to-eks
3. https://documentation.codeship.com/pro/continuous-deployment/deployment-with-kubernetes/
4. https://documentation.codeship.com/pro/builds-and-configuration/steps/
5. https://blog.codeship.com/aws-registry/
6. https://documentation.codeship.com/pro/builds-and-configuration/environment-variables/
7. https://documentation.codeship.com/pro/jet-cli/installation/
