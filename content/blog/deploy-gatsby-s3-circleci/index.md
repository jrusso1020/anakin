---
title: Deploying a Gatsby Application to an S3 Bucket Using CircleCI
date: "2019-08-15"
description: This is a tutorial about how to deploy a Gatsby.js application to an S3 bucket using CircleCI.
---

So you've created your first Gatsby.js application and you'd like to deploy it on AWS instead of Netlify like everyone else. I personally chose AWS because this was an application for work and the rest of our stack is hosted on AWS as well. My approach (and many others) to deploying applications is to first do it manually and then automate it using CI/CD such as CircleCI. So in this tutorial I will start with the initial manual process, which is documented elsewhere as well, and then move to the automated process.

### Initial Manual Deployment
I won't be going over the whole process in detail but I will try and touch on everything briefly. This [blog](https://itnext.io/static-website-over-https-with-s3-cloudfront-gatsby-continuously-delivered-b2b33bb7fa29) does a good job of going over some of the details I will rush through. What I did first was buy a domain name for my application through Route53. Then I setup an S3 bucket on AWS that is public and setup to host a static website. It is necessary for it to be public so that you can use Cloudfront as a CDN in front of it. I followed the following [tutorial](https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/) provided by Gatsby's website to setup everything manually initially. Through this I used the `gatsby-plugin-s3` package to simplify deployment to S3. You can install this using `npm install --save gatsby-plugin-s3` and then adding the following to your `gatsby-config.js`

```js
plugins: [
 {
     resolve: `gatsby-plugin-s3`,
     options: {
         bucketName: 'my-website-bucket'
     },
 },
]
```
Next you must add the following to your `package.json` so that you can use the `npm run deploy` command to deploy your application to S3
```
"scripts": {
   ...
   "deploy": "gatsby-plugin-s3 deploy -y"
}
```
In order to deploy your application to an S3 bucket programmatically you need to setup an AWS IAM user with the correct privileges. The easiest is to have admin privileges on the account you can also add a policy to it that looks like the following
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```

This will give the account full access to all S3 actions and resources, if you would like you can limit it to just the bucket you are using as well for added security.

Once you have this account setup, you can configure it in your environment as your default or set the environment variables in your current environment. I prefer the latter since I have multiple AWS IAM users for different operations. This can be accomplished by running the following commands in your current terminal shell
```
export AWS_ACCCESS_KEY_ID=your_access_key_here
export AWS_SECRET_ACCESS_KEY=your_secret_key_here
```
Now that you have set these variables you can run the command `npm run build && npm run deploy` to automatically build and deploy your Gatsby application to your S3 bucket. After running this command you should be able to go to your S3 bucket url and see your application. However, there are a couple of more steps I personally did to make my application a little robust. I created a Cloudfront distribution connected to my S3 bucket, make sure to use your Static Website Hosting Endpoint as the CloudFront origin. Once you have setup the Cloudfront Origin you can then create an SSL/TLS certificate in ACM and connect it to your Cloudfront distribution and set your CNAME to your custom domain.

I know I briefly went through these parts rather quickly, but I think there are plenty of other tutorials to explain this part of the setup and I have tried to link to a couple of them. The next step from here is setting up automated deploys to your S3 bucket via CircleCI

### Automated Deployments
Okay let's start but just looking at the `.circleci/config.yml` file that will be located in your project.
```yaml
---
version: 2.1
jobs:
  setup:
    docker:
      - image: circleci/node:10.15.3
    working_directory: ~/application
    steps:
      - checkout
      - run:
          name: Update npm
          command: 'sudo npm install -g npm@latest'
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Install npm wee
          command: npm install
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}
          paths:
            - node_modules
      - save_cache:
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
          paths:
            - ~/application
  build_and_deploy:
    docker:
      - image: circleci/node:10.15.3
    working_directory: ~/application
    steps:
      - restore_cache:
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Deploy
          command: |
            if [ "${CIRCLE_BRANCH}" = "master" ]; then
              GATSBY_ACTIVE_ENV=staging npm run build && npm run deploy
            else
              GATSBY_ACTIVE_ENV=production npm run build && npm run deploy
            fi
workflows:
  version: 2.1
  build:
    jobs:
      - setup
      - build_and_deploy:
          requires:
            - setup
          filters:
            branches:
              only:
                - master
```
As you can see there are two jobs in the config file. The first sets up your project and then the second and final handles the build and deploy steps. Technically you can break up build and deploy into individual steps but I just kept them the same. Once you create this file you have to go into CircleCI and set your environment variables. Under Settings in the CircleCI project, you can go to AWS Permissions and set your access key and secret key that were created for the manual steps. I also set another environment variable for the aws region of my bucket using the AWS_DEFAULT_REGION key.

Now let's take a look at our config file piece by piece. The first job looks like so
```yaml
setup:
  docker:
    - image: circleci/node:10.15.3
  working_directory: ~/application
  steps:
    - checkout
    - run:
        name: Update npm
        command: 'sudo npm install -g npm@latest'
    - restore_cache:
        key: dependency-cache-{{ checksum "package.json" }}
    - run:
        name: Install npm wee
        command: npm install
    - save_cache:
        key: dependency-cache-{{ checksum "package.json" }}
        paths:
          - node_modules
    - save_cache:
        key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
        paths:
          - ~/white-glove
```
This uses the docker image that is the same node version used locally for development and sets the working directory. Then in the steps first we checkout the code. Then we make sure we are using the latest npm version. Next we try to restore the cache for our node_modules if it exists for this same `package.json`. Next we install all of our node modules. The final two steps are saving caches for our node_modules and repository to be used by the next jobs.

```yaml
build_and_deploy:
    docker:
      - image: circleci/node:10.15.3
    working_directory: ~/white-glove
    steps:
      - restore_cache:
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}
      - run:
          name: Deploy
          command: |
            npm run build && npm run deploy
```
This code restores the caches we created in the last step so we don't need to checkout code again or reinstall modules. It then builds and deploys our code using the commands we ran locally.

Finally we have the workflow which handles only deploying on pushes to certain branches
```yaml
workflows:
  version: 2.1
  build:
    jobs:
      - setup
      - build_and_deploy:
          requires:
            - setup
          filters:
            branches:
              only:
                - master
```
As you can see we run the `setup` job every time but we only run the `build_and_deploy` job when the branch is the master branch and we require the `setup` job to be run first. You can also add in a test job to occur after setup and to be run every time, and be required by `build_and_deploy` but that's a relatively simple addon. Another add on is to handle pushing to either staging or production based on the branch, but that is also covered by other documentation.

Now if you have setup your project on CircleCI, you should be able to push to your master branch and see that your application is deployed to your S3 bucket!

### Additional Resources
1. https://www.gatsbyjs.org/docs/deploying-to-s3-cloudfront/
2. https://itnext.io/static-website-over-https-with-s3-cloudfront-gatsby-continuously-delivered-b2b33bb7fa29
3. https://circleci.com/blog/automate-your-static-site-deployment-with-circleci/
4. https://circleci.com/docs/2.0/deployment-integrations/
5. https://medium.com/@zlwaterfield/circleci-s3-upload-dbffa0956b6f
6. https://www.freecodecamp.org/news/how-to-set-up-continuous-deployment-to-aws-s3-using-circleci-in-under-30-minutes-a8e268284098/
7. https://medium.com/the-apps-team/deploying-gatsby-site-to-s3-using-circleci-restful-api-9df167158a0
