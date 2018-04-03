# SafariExtensionState

## Usage
``` javascript
SafariExtensionState.installed(function(version) {
    console.log('Stencil (global.html): Installed');
    var tab = safari.application.activeBrowserWindow.openTab(),
        url = __installedSuccessUrl;
    tab.url = url;
});
ExtensionState.updated(function(version) {
    console.log('Stencil (global.html): Updated');
});
```
