---
title: Setting Up a Next.js Docker Container and Publishing it to AWS ECR
date: "2019-05-13"
description: This is a tutorial on how to setup a simple Docker image for a Next.js application so that we can deploy the Docker image to a container registry. We will use AWS Elastic Container Registry (ECR) in this tutorial as our Docker container registry. This way we can access our Docker image from other machines and deploy the image to something like AWS Elastic Kubernetes Server (EKS) or AWS Elastic Container Service (ECS).
---

The first step in "dockerizing" an application is to download Docker onto your local machine. Personally we develop locally on macs, so we downloaded [Docker for Mac](https://docs.docker.com/v17.12/docker-for-mac/install/#what-to-know-before-you-install) using the tutorial in that link. Once you have Docker installed locally, you need to create a `Dockerfile` in the root of your Next.js application. We created the following `Dockerfile` for our Next.js app.

```
FROM node:10-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]
```

The first line `FROM node:10-alpine` is the base Docker image we used to create our application's image. We developed our application using node version 10.15.3 so we used a base container with the corresponding node version. Another thing to note here is that it is an *alpine* container. The main reason for using alpine containers as your base image is that they are smaller. They remove unnecessary bloat your application doesn't need to run. By switching our application from using the `node:10` base image to `node:10-alpine`, we were able to shrink our Docker image from over 400kb to around 70kb (more than 75% savings in size). To learn about more reasons why an alpine image is normally better for creating Docker images, take a look at the following [link](https://nickjanetakis.com/blog/the-3-biggest-wins-when-using-alpine-as-a-base-docker-image
).

The next line is `ENV PORT 3000`, which sets our application's port that it will run on within the Docker container. We also set some other environment variables in our real `Dockerfile`. Since this is a frontend application without any secure credentials in it, we found it easiest to just set all of our environment variables directly in the `Dockerfile`. There are two other approaches to setting a Docker image's environment variables we came across while developing. The first is to use a `docker_compose.yml` file that you do not commit to your github repo and use locally to create the Docker image. You can either put the environment variables directly in the `docker_compose.yml` or have it use your `.env` file. Here is a [link](https://docs.docker.com/compose/environment-variables/) describing how to do this from Docker's documentation. Another approach that we came across is to create a secret Docker image that just sets environment variables and then use that as one of your base images in your `Dockerfile`. You would build and push this Docker image to a registry locally so that your secrets are never linked, and you can still use them in your application. But once again we found this unnecessary since our environment variables for our frontend application are viewable when you visit our web app in the browser anyways.

The next two lines `RUN mkdir -p /usr/src/app` and `WORKDIR /usr/src/app` create a directory in our container for our application's code to reside in and then sets the working directory to `/usr/src/app`. By setting the working directory, we will run all of our commands in this directory. We then copy our `package.json` and `package-lock.json` into our app directory using `COPY package*.json /usr/src/app/`. This allows us to then download our dependencies into our application's directory using `RUN npm install`.

Finally we copy the rest of our application using `COPY . /usr/src/app` into the app's directory and call `RUN npm run build` to create our production build files. `EXPOSE 3000` exposes port 3000 on the container, and finally we run the last command `CMD [ "npm", "start" ]` to startup our production build of our web application in the container. With that we have a docker image that we can build and run locally, or deploy to an Docker registry and run on a server.

### Deploying to ECR
Now that we have our `Dockerfile` we can create our Docker image and deploy it to our Docker image registry which in this case will be AWS Elastic Container Registry (ECR).

1. First step is to make sure you have an AWS account and to download the aws-cli. This can be achieved by using the following [tutorial](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
2. Next you need to create an image repository on ECR, which AWS also has a great tutorial for [here](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html)
3. View the push commands in the repo to find out how to push an image to the repo
4. The first command is `$(aws ecr get-login --no-include-email --region AWS_REGION)`. This command will login to docker on your local machine using your AWS credentials so you can push your image to your repository. This part of the command `aws ecr get-login --no-include-email --region AWS_REGION` is used to get your login credentials from aws and returns a script you can run to login to Docker. By wrapping it in `$()` you are telling your console to execute the result of `aws ecr get-login --no-include-email --region AWS_REGION`. Make sure you have aws-cli setup locally too with your AWS credentials in your `.aws` directory. You also must specify what region you created the ECR instance in.
5. The next command `docker build -t REPOSITORY_NAME:COMMIT_ID -f Dockerfile .` will build your Docker image from the specified `Dockerfile` following `-f` in the current directory `.`. If you have multiple `Dockerfile`'s like `Dockerfile.staging` and `Dockerfile.production`, the `-f` command allows you to specify which one to use to build your Docker image. `REPOSITORY_NAME` is the name of our ECR repository, not our git repository. What comes after the colon(:) following the `REPOSITORY_NAME` will be the tag. We tag our Docker image using our git commit sha during our CI/CD deployment. This way we can keep track of what code is in each Docker image in our repo and rollback if necessary.
6. Then we want to tag the Docker image we just created using `docker tag REPOSITORY_NAME:COMMIT_ID ACCOUNT_ID.dkr.ecr.AWS_REGION.amazonaws.com/REPOSITORY_NAME:COMMIT_ID`.
7. Finally push your image your Docker image to ECR using `docker push ACCOUNT_ID.dkr.ecr.AWS_REGION.amazonaws.com/REPSITORY_NAME:COMMIT_ID`

This shows you how to deploy to ECR using manual commands, but we have setup our CI/CD platform to run the commands for us so we have automatic deployments when we push to our staging or production branches on Github.

### Additional Resources
The following resources were used to come up with this approach and write this post
1. [https://medium.com/@khwsc1/a-simple-react-next-js-app-development-on-docker-6f0bd3f78c2c](https://medium.com/@khwsc1/a-simple-react-next-js-app-development-on-docker-6f0bd3f78c2c)
2. [https://medium.com/google-cloud/next-js-tutorial-deploy-to-docker-on-google-cloud-container-engine-6b0c19dd8ecb](https://medium.com/google-cloud/next-js-tutorial-deploy-to-docker-on-google-cloud-container-engine-6b0c19dd8ecb)
