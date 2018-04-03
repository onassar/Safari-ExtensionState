# SafariExtensionState

## Usage
Below is an example of how to call the `SafariExtensionState` class. You'd likely make the below call from within your `global.html` file, so that after an `install` or `update` action, your code is triggered.

``` javascript
SafariExtensionState.installed(function(version) {
    console.log('(global.html): Installed');
    var tab = safari.application.activeBrowserWindow.openTab(),
        url = 'https://website.com/safari/extension/installed';
    tab.url = url;
});
ExtensionState.updated(function(version) {
    console.log('(global.html): Updated');
});
```
