---
title: Setting Up AWS Elastic Kubernetes Service (EKS) and Deploying
date: "2019-05-15"
description: This is a tutorial on how to setup an AWS Elastic Kubenertes Service (EKS) cluster and deploy a Docker container service to EKS. We will mostly follow the AWS tutorial but make some changes to deploy your personal containers instead of the ones provided by the EKS tutorial. This process was used to deploy our Next.js Application.
---

In a previous [post](/next-js-docker-ecr) I talked about setting up a Next.js Docker container and deploying it to Elastic Container Registry (ECR). This was the first step for us to get our Next.js app ready to deploy to Elastic Kubernetes Service (EKS), but you could use any other Docker image with this tutorial to deploy to EKS.

The first part of this tutorial will follow along with AWS's tutorial on setting up EKS using their management console which you can find [here](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html). Since we've deployed our EKS cluster, a cli has been released called `eksctl` which can be used for creating and managing EKS clusters. Amazon has a second tutorial [here](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) describing setup and deployment of an EKS cluster using `eksctl`. I will go over how to setup your EKS cluster using `eksctl` after first going over using the management console. I highly recommend at least reading the management console tutorial first so you can understand what `eksctl` does under the hood.

### Deploying an EKS cluster using the AWS management console
1. Create an EKS Service role in IAM management console
2. Setup your VPC in Cloudformation's management console using the supplied template YAML file in the tutorial
3. Install `kubectl` for Amazon EKS
4. Install `aws-iam-authenticator` for Amazon EKS
5. Install the `aws-cli` using `pip` (recommend using a newer version of python, 3.6 or above)
6. Create the EKS cluster in the management console
7. Create a kubeconfig file for the cluster
8. Launch and configure EKS worker nodes using Cloudformation and the template YAML file AWS gives you, in the management console
9. Allow the EKS worker nodes to join the EKS cluster, by using `kubectl` and an authentication YAML file the tutorial shows you how to create

### Deploying an EKS cluster using ekstl
First make sure you have downloaded the `aws-cli` tool and configured your account information.
```bash
$ pip install awscli --upgrade --user
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

Next you need to install `eksctl` which if you have a mac can be done through homebrew. If you do not have a mac you can look at the tutorial linked below to find out how to do this.
```bash
brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
```

Check your `eksctl` version and make sure it is at least 0.1.31.
```bash
eksctl version
```

Once you have installed `eksctl` and setup `aws-cli` you can create and deploy your EKS cluster in one command
```bash
eksctl create cluster \
--name prod \
--version 1.12 \
--nodegroup-name standard-workers \
--node-type t3.medium \
--nodes 3 \
--nodes-min 1 \
--nodes-max 4 \
--node-ami auto
```

This will give you the same exact setup you would get from the management console tutorial. The `name` parameter is what you want to name the EKS cluster. The `version` parameter is the version of kubernetes to use to deploy (1.12 is the newest at the time of this publication). The `nodegroup-name` parameter is the name of the worker nodes Cloudformation stack you will create. The `node-type` is the type of EC2 instance to use. The `nodes` parameter is how many worker nodes you want running normally in your EKS cluster. `Nodes-min` is the minimum number of nodes to ever have running and `nodes-max` is the maximum number of nodes you can ever have running. This is used when you are rolling out new deployments. When you deploy a change to your EKS cluster, it will start up a new node with this new code so you will have 4 nodes running at this time (3 with old code, 1 with new code). Then once you have a node up and running with new code, an old node will spin down and a new node will spin up with the new code. This will continue until you have 3 new nodes running with your new code. The last parameter is `node-ami` which is the Amazon Machine Image to start the EC2 instances with. By setting it to auto it will automatically pick the one for your given region.

This command should take about 10-15 minutes to run and you should see an output that tells you what phase the creation and deployment script is on. The output should look something like
```
[ℹ]  using region us-west-2
[ℹ]  setting availability zones to [us-west-2b us-west-2c us-west-2d]
[ℹ]  subnets for us-west-2b - public:192.168.0.0/19 private:192.168.96.0/19
[ℹ]  subnets for us-west-2c - public:192.168.32.0/19 private:192.168.128.0/19
[ℹ]  subnets for us-west-2d - public:192.168.64.0/19 private:192.168.160.0/19
[ℹ]  nodegroup "standard-workers" will use "ami-0abcb9f9190e867ab" [AmazonLinux2/1.12]
[ℹ]  creating EKS cluster "prod" in "us-west-2" region
[ℹ]  will create 2 separate CloudFormation stacks for cluster itself and the initial nodegroup
[ℹ]  if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=us-west-2 --name=prod'
[ℹ]  2 sequential tasks: { create cluster control plane "prod", create nodegroup "standard-workers" }
[ℹ]  building cluster stack "eksctl-prod-cluster"
[ℹ]  deploying stack "eksctl-prod-cluster"
[ℹ]  building nodegroup stack "eksctl-prod-nodegroup-standard-workers"
[ℹ]  deploying stack "eksctl-prod-nodegroup-standard-workers"
[✔]  all EKS cluster resource for "prod" had been created
[✔]  saved kubeconfig as "/Users/user/.kube/config"
[ℹ]  adding role "arn:aws:iam::ACCOUNT_ID:role/eksctl-prod-nodeg-NodeInstanceRole-IJP4S12W3020" to auth ConfigMap
[ℹ]  nodegroup "standard-workers" has 0 node(s)
[ℹ]  waiting for at least 1 node(s) to become ready in "standard-workers"
[ℹ]  nodegroup "standard-workers" has 3 node(s)
[ℹ]  node "ip-192-168-22-17.us-west-2.compute.internal" is not ready
[ℹ]  node "ip-192-168-32-184.us-west-2.compute.internal" is ready
[ℹ]  kubectl command should work with "/Users/user/.kube/config", try 'kubectl get nodes'
[✔]  EKS cluster "prod" in "us-west-2" region is ready
```
Now that you have created and deployed your cluster you should be ready to deploy your application to your worker nodes.

### Deploying your application to EKS worker nodes
The following steps are what differs from AWS's tutorial. There are two approaches. One approach is to create a deployment file, which will contain the information needed to deploy your application's Docker image(s) to your worker nodes and setup a load balancer in front of them. You then apply this deployment to your EKS cluster using `kubectl`. The second approach is to run individual commands using `kubectl` to manually create the loadbalancer and set the Docker image(s) on the worker nodes. We took the first approach by taking information from this [tutorial](https://blog.alterway.fr/en/kubernetes-101-launch-your-first-kubernetes-app.html), so I will go over that one.
First you need to setup your `deployment.yml` so that you can tell your EKS cluster how you want to deploy your application(s) to it. This is similar to what our YAML file looks like for deploying our Next.js app to EKS and putting a loadbalancer in front of it.
```yaml
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

The main thing to notice here is this part
```yaml
spec:
  containers:
  - name: app-staging
    image: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:TAG
    ports:
      - containerPort: 3000
```

Here we define the containers we want our worker nodes to use. The image value points to a Docker image we have stored on AWS ECR with our Next.js application in it and runs on port 3000. Then if you look at our load balancer definition

```yaml
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

You can see that we run the load balancer on `port` 80 but set the `targetPort` to 3000 so it forwards the traffic to our Docker container's port.

Once you have created your `deployment.yml`, you can deploy your stack using the command `kubectl create -f deployment.yml`. This will start your first depoyment to your stack and give you some output telling you what's being created. You can then run the command `kubectl get services` to get your load balancer information and the external IP that it is accessbile on. The result of this will look something like this.

```
NAME                  TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
app-staging-service   LoadBalancer   10.23.249.131   35.195.136.97   80:32750/TCP   1m
```

If you can't see your full external IP address you can also run the following command `kubectl describe services app-staging-service` to see a more detailed view of the service and it's full external IP.

### Updating your application's Docker image
Once you have deployed for the first time, you are going to want to make changes to your app's Docker image and deploy those changes to your EKS cluster. In order to do this all you need to do is update the Docker image your worker nodes are using and wait for it to rollout to all of them. You can do this by using the following command

```bash
kubectl set image deployment/app-staging-deployment app-staging=ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/app-staging:NEW_TAG
```

This command rolls out an updated image to your `app-staging` containers. You just need to specify the new container in your registry with the correct tag. After you run this command you can run `kubectl rollout status -w deployment/app-staging-deployment` to check the status of your deployment. It should tell you what is happening in your deployment and return once the deployment is complete. If you deployment seems like it is stuck you should run the command `kubectl get pods` which will show you what pods are running. If one of them is in an infinite crash back loop you can use the following command to roll back your deployment `kubectl rollout undo deployment/app-staging-deployment`. But assuming your deployment is successful, now you've successfully created, deployed, and updated your AWS EKS cluster!

### Additional Resources
1. https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html
2. https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html
3. https://stackoverflow.com/questions/54109603/how-to-use-docker-image-in-ecr-with-aws-eks
4. https://blog.alterway.fr/en/kubernetes-101-launch-your-first-kubernetes-app.html
5. https://codeburst.io/getting-started-with-kubernetes-deploy-a-docker-container-with-kubernetes-in-5-minutes-eb4be0e96370
6. https://www.edureka.co/blog/amazon-eks/
