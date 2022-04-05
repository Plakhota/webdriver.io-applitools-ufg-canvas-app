# Applitools Tutorial - WebdriverIO 6 Ultrafast Grid

Get started with Applitools visual testing with this example of using the Ultrafast Grid with the Applitools WebdriverIO 6 SDK.

Learn more about how to install and start this project with our [WebdriverIO 6 tutorial](https://applitools.com/tutorials/webdriverio6.html)!

<https://applitools.com/tutorials/webdriverio6.html>

## More Information

Learn more about Applitools [Eyes](https://info.applitools.com/ucY77) and the [Ultrafast Test Cloud](https://info.applitools.com/ucY78) at [applitools.com](https://info.applitools.com/ucY76).

More about the Eyes WebdriverIO 6 SDK:
* https://www.npmjs.com/package/@applitools/eyes-webdriverio


## Canvas apps
to set preserveDrawingBuffer to true before the browser navigates to the webpage with canvas:
1) Install dev-tools to use CDP: npm install @wdio/devtools-service --save-dev
2) Make sure that wdio.conf.js has  services: ['devtools']
3) Add the function that sets preserveDrawingBuffer to Page.addScriptToEvaluateOnNewDocument. This needs to happen before the browser navigated to the webpage. (See the test)
