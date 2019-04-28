---
title: Setting Up Google Optimize in a React App Using Segment
date: "2019-04-27"
description: Setting up Google Optimize for A/B experiments in a Single Page Application(SPA)
---
We recently decided to migrate to Google Optimize(GO or Optimize from here on) as our A/B experiment test system for our frontend SPA which is built using React and Redux. We weren't quite getting everything we wanted out of our previous vendor, and GO seemed like a promising system with simple integration to Universal Analytics, Google Tag Manager, and all of Google's products which some of which we use heavily. However, there aren't very many resources online that talk about using GO for a SPA, so I hope this post can be used by other developers to skip some of the pitfalls we fell into.

### Initial Setup
We use Segment.io to deploy Google Analytics(GA) and Google Tag Manager(GTM) on our site. Therefore we decided to also use it to deploy Google Optimize. This causes some problems that we will go over in this post, and therefore something we are thinking about revisiting(possibly loading GA and GO on our SPA ourselves). But if you deploy your GA script using Segment you must also deploy GO using segment because GA needs to be loaded on the page before GO can be loaded on the page. If you do not want to deploy GO using Segment you should be able to follow GO's guidelines for setup placing the GO script under your GA script in the head of your page, using the proper container ID's in the script, and then adding your page hiding snippet on your page.

1. First make sure you setup a GO account and a container for you application in your account. You can follow Google's documentation to do the [account setup](https://support.google.com/optimize/answer/6211921?hl=en&ref_topic=7310368). The initial setup is the same for any application and their documentation is fairly straightforward to follow.

2. Once you have setup your GO container for your application, you must take the container ID and set it in Segment on your Google Analytics Destination. There is a setting called `Optimize Container ID` where you can place the container id. It Should start with a `GTM-` and be followed by a combination of numbers and letters.

Now your application should be connected to your GO container and you should be ready to start deploying experiments to your SPA. However, the GO page hiding snippet, which is used to hide your website until GO is loaded, will not work with this setup. Since we are loading GO using Segment it is loaded asynchronously as part of Segment's analytics script. The major problem is that our `dataLayer` and `gaData` variable are not initialized until after Segment finishes loading our GA script. So instead of using GO's page hiding snippet, we've created our own version of it. Using our redux state we keep track of whether or not GO has been loaded on the page, and we display a loading screen on our website until GO is loaded or until our reducer times out. Our reducer and action creator code looks like this:

```javascript
import { combineReducers } from 'redux'

export const constants = {
  LOAD_GO: 'LOAD_GO',
  LOAD_GO_SUCCESS: 'LOAD_GO_SUCCESS',
  LOAD_GO_FAILURE: 'LOAD_GO_FAILURE'
}

export const loadGO = () => (dispatch) => {
  dispatch({type: constants.LOAD_GO})
  const maxWaitTime = 300
  let currentWait = 0
  const goObserver = setInterval(() => {
    if (window.gaData) {
      dispatch({type: constants.LOAD_GO_SUCCESS})
      clearInterval(goObserver)
    }
    if (currentWait >= maxWaitTime) {
      dispatch({type: constants.LOAD_GO_FAILURE})
      clearInterval(goObserver)
    } else {
      currentWait++
    }
  }, 50)
}

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.LOAD_GO:
      return true
    case constants.LOAD_GO_SUCCESS:
    case constants.LOAD_GO_FAILURE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  loading: loadingReducer
})
```

We then check the value in state whether or not GO has been loaded on our layout which wraps all of our application. This gives us functionality similar to the page hiding snippet but allows us to use more on brand loaders instead of a blank white screen. However, an obvious drawback to this is the fact that every time a user comes to our website they will initially see a loader but the same would be true for seeing a blank white page with the GO page hiding snippet. Something you can do to limit this effect is to remove the loader when you are not currently running any GO experiments on your website.

### Experiment Setup
Now I will go over how to setup a GO experiment in your SPA app. I will not go over in detail the actual setup of the experiment in GO because this varies on the use case. However, one important thing to note is how you target users for the experiment. There are two ways to target a user for a given A/B experiment: on page load or by a custom event. Since SPA's only load once(on the initial visit to the website), you need to be careful when targeting users on page load. You generally should only use the on load target option if you want the user to be targeted on entering any page of your website or you know every entry for a user for a given experiment. This way the user will enter the experiment on initial page load. If you do not want every user to be targeted in an experiment and you only want user's who reach a certain page(after entering from another page) in your application to be targeted, then you will most likely have to fire a custom event on that page to enter the user in the experiment. You can fire the event as you fire any other GA event, but you want to make sure you have the experiment value on render so you know what variation to show. Besides that the flow for setting up a GO experiment in our React app goes as follows.

1. Set up the experiment in GO with your variations and targeting rules.

2. (Optional) Setup custom goals in your UA/GA account that you can track in your GO experiment. This requires knowing an event's category, label, action, and/or value that you want to track.

3. Set up your GO experiment to track a given event. We send events using segment that are forwarded to UA. So we call events using `analytics.track(…)` and then can target an event by it's category, action, value, and/or label in GO. But you can also set up goals in GA and then GO will allow you to pick it as a pre-made goal, instead of defining it directly in GO. This is useful for events you already track in GA.

4. Once you have the experiment setup we must use the experiment ID in our application. We set it as an environment variable for a given experiment because we have staging and production experiments for testing purposes.

5. Get the experiment value in your application to know which variation to show. We use the following code to check our `window.gaData` value to determine the current experiment variation on a given page. Experiment values are stored in the `window.gaData` value under the key that is your UA container ID. All your experiments will then be stored in this context using the key of the experiment ID. Each experiment stores a single string value that corresponds to the variation. The control is defined as the string `'0'` and all variations will increase by 1(still as a string). We use the following code to determine the variation for a given experiment. It is good to handle null and undefined values throughout your code to default to the control.

```javascript
export const getVariantId = (experimentId) => {
  const UA_ID = process.env.UA_ID
  if (window.gaData && window.gaData[UA_ID] && window.gaData[UA_ID].experiments) {
    return window.gaData[UA_ID].experiments[experimentId] || '0'
  }
  return '0'
}
```

And as I previously stated we have separate staging and production containers for GO so we can test experiments in our QA environment. Therefore all of UA, GO, and experiment ID's are stored as environment variables. The drawback to this is that we then have to recreate the experiment in our production GO container and make sure all the proper ID's are set in our environment variables, but it allows us to avoid problems in the experiment setup in production.

### Conclusion
#### Cons
1. The initial setup was a little cumbersome and difficult to figure out with the lack of online resources.

2. GO initially didn't allow you to edit experiments once they are running, which meant you had to clone an experiment and restart if there was an error. (However, it appears they recently added the feature to allow you to stop and edit an experiment which fixes this problem.)

3. Using GO in a SPA is a little complex and prone to errors, like not having the experiment loaded on the page if your targeting isn't setup correctly or you don't wait for GO to load on your page. This can also cause your page to look like it's taking a while to render if you display a loader while you do this.

4. Setting up new experiments require's code deploys.

5. Initial learning curve of using GO and setting up experiments.
#### Pros
1. Seamless integration with GA/UA.

2. Once you have done the initial setup you can easily follow a recipe to setup new experiments which make them easy to set up in the future.

3. You can trigger events to track using Segment's analytics script like all of your other events

4. The targeting feature is very explicit, allowing you to target a user on a number of things even firing your own event or using first party cookies.

Overall we are happy with our experience with GO. Most of the cons we have for using it involve initial setup and learning curve. But once you have spent some time with it, everything becomes much easier and streamlined. The event tracking and reporting is very nice because it is integrated with UA. So if you are using UA for reporting and tracking it's a very nice tool to use. We also use GO for a rails application, which allows us to use the GO editor which is really user friendly and allows you to easily create variations for static websites. This is definitely a pro but not something that we get to utilize in our SPA.
