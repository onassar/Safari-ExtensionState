
/**
 * SafariExtensionState
 * 
 * @link    https://github.com/onassar/SafariExtensionState
 * @author  Oliver Nassar <onassar@gmail.com>
 * @abstract
 */
var SafariExtensionState = (function() {

    /**
     * __configFilePath
     * 
     * @access  private
     * @return  String (default: '../Info.plist')
     */
    var __configFilePath = '../Info.plist';

    /**
     * __getConfigVersion
     * 
     * @access  private
     * @param   Function callback
     * @return  void
     */
    var __getConfigVersion = function(callback) {
        var request = new XMLHttpRequest();
        request.open('get', __configFilePath);
        request.onload = function () {
            var infoFile = request.responseXML,
                keys = infoFile.getElementsByTagName('key');
            for (var i = 0; i < keys.length; i++){
                if (keys[i].firstChild.data === 'CFBundleShortVersionString') {
                    var version = keys[i].nextElementSibling.firstChild.data;
                    callback(version);
                    break;
                }
            }
        };
        request.send();
    };

    /**
     * __getLocalVersion
     * 
     * @access  private
     * @return  undefined|String
     */
    var __getLocalVersion = function() {
        return localStorage['SafariExtensionState.version'];
    };

    /**
     * __putLocalVersion
     * 
     * @access  private
     * @param   String version
     * @return  void
     */
    var __putLocalVersion = function(version) {
        localStorage['SafariExtensionState.version'] = version;
    };

    // Public
    return {

        /**
         * installed
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        installed: function(callback) {
            var localVersion = __getLocalVersion();
            if (typeof localVersion === 'undefined') {
                __getConfigVersion(function(version) {
                    callback(version);
                    __putLocalVersion(version);
                });
            }
        },

        /**
         * updated
         * 
         * @access  public
         * @param   Function callback
         * @return  void
         */
        updated: function(callback) {
            var localVersion = __getLocalVersion();
            if (typeof localVersion !== 'undefined') {
                __getConfigVersion(function(version) {
                    if (localVersion !== version) {
                        callback(version);
                        __putLocalVersion(version);
                    }
                });
            }
        }
    };
})();
