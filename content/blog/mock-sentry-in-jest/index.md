---
title: Mocking Sentry in Jest and Gatsby
date: "2019-09-23"
description: This is a very short and simple tutorial describing how to mock Sentry in the Jest testing framework and more specifically in a Gatsby.js application. This approach can be used in other javascript frameworks that use Jest, but I will use Gatsby.js and their unit testing tutorial as a basis.
tags: ["Sentry", "Jest", "Gatsby"]
---

When testing a React based application that uses [Sentry.io](https://sentry.io/) it is necessary to mock Sentry. You shouldn't be making API calls to report errors during your test, and more importantly you shouldn't need to load Sentry in your test environment anyways. However, if Sentry is missing or not setup in the testing environment this may cause your tests to fail, raising a `ReferenceError: Sentry is not defined`. Before discussing how to mock Sentry in your test, if you are adding Sentry to your Gatsby.js project, please follow [this great tutorial](https://www.gatsbyjs.org/packages/gatsby-plugin-sentry/) and which uses the plugin `gatsby-plugin-sentry`. This easy to use plugin adds Sentry to your project and only loads it in certain environments, in my case "staging" and "production".

Once you've setup Sentry if you need help adding Jest to your Gatsby.js application you can follow another tutorial [here](https://www.gatsbyjs.org/docs/unit-testing/). This will go through all of the initial setup to get Jest working with your Gatsby.js application. However if you use the global `Sentry` object created by `gatsby-plugin-sentry` in your code this will cause your tests to error out and fail. The solution around this is to mock the global `Sentry` object so that your tests can pass. So lets take a look at how we can setup your application to accomplish this.

First you must create a new file in your root directory, let's call it `setup-test-env.js`. This file can be used to setup globals and other things needed for you Jest tests after the tes environment has been setup. Then in your `jest.config.js` you must add the line `setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"]` like so

```js
// jest.config.js
module.exports = {
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleDirectories: ["node_modules", `<rootDir>`],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
}
```

This will ensure that the setup file is loaded in after the test environment is loaded. This is necessary because we need certain packages and values to be setup and loaded before we mock Sentry(like the Sentry package).

Now in `setup-test-env.js` we need to mock `Sentry` globally so that we can use it in our code run by our tests and not get an error that `Sentry` is not defined. This can be accomplished with the following line's of code

```js
// setup-test-env.js
import * as Sentry from "@sentry/browser"

global.Sentry = Sentry
jest.mock("@sentry/browser")
```

And just like that you should be able to run your tests and mock the global `Sentry` value so that your code is able to call the global `Sentry` object without raising any error's or making API calls.
