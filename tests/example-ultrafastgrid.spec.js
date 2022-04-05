'use strict';

const {
  VisualGridRunner,
  RunnerOptions,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-webdriverio');

let eyes;
let runner;
let configuration;

describe('Demo Test - App with canvas - wdio', function () {

  before(async () => {
    // Create a runner with concurrency of 5
    // You can increase this value if your plan supports a higher concurrency

    const runnerOptions = new RunnerOptions().testConcurrency(5);

    runner = new VisualGridRunner(runnerOptions);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);

    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    // Initialize the eyes configuration

    configuration = eyes.getConfiguration();

    // use new Configuration() when not setting eyes setter methods. e.g. eyes.setLogHandler() etc...
    // new Configuration();

    // You can get your api key from the Applitools dashboard

    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)

    // create a new batch info instance and set it to the configuration

    configuration.setBatch(new BatchInfo('Demo Batch - WDIO - Ultrafast Grid'))

    configuration.addBrowser(800, 600, BrowserType.CHROME);
 
  });


  beforeEach(async function () {
    configuration.setAppName('Demo App - WDIO - Ultrafast');
    configuration.setTestName('Smoke Test - WDIO - Ultrafast');

    // Set the configuration to eyes

    eyes.setConfiguration(configuration);

    await eyes.open(browser);
  });

  const fnPreserveBuf = function() {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(contextType, contextAttributes = {}) {
      if (['webgl', 'experimental-webgl', 'webgl2'].includes(contextType)) {
        contextAttributes.preserveDrawingBuffer = true;
      }
      return getContext.call(this, contextType, contextAttributes);
    }
  };

  before(async () => {
    browser.cdp('Page', 'enable');
    browser.on('Page.addScriptToEvaluateOnNewDocument', fnPreserveBuf);
  }),



  it('ultraFastTest', async () => {

    // Navigate to the url we want to test

    await browser.url('https://www.google.com/maps/@32.0729592,34.8072057,15z');

    //await expect(browser).toHaveTitle('ACME demo app');

    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html

    await eyes.check('Login Window', Target.window().fully(true));

    // Click the "Log in" button.
    //const loginButton = await browser.$('#log-in');
    //await loginButton.click();

    // Check the app page
   // await eyes.check('App Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();
  });

  after(async () => {
    const results = await runner.getAllTestResults();
    console.log(results);
  });

});
