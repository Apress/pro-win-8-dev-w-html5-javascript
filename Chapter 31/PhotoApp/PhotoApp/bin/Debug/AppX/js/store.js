(function() {
    var storage = Windows.Storage;

    var licensedCapabilities = {
        basicApp: false,
    }

WinJS.Namespace.define("ViewModel.Store", {
    events: WinJS.Utilities.eventMixin,

    checkCapability: function (name) {
        var available = licensedCapabilities[name] != undefined
            ? licensedCapabilities[name] : true;
        setImmediate(function () {
            ViewModel.Store.events.dispatchEvent("capabilitycheck",
                { capability: name, enabled: available });
        });
        return available;
    },

    currentApp: Windows.ApplicationModel.Store.CurrentAppSimulator,

    loadLicenseData: function () {
        var url
            = new Windows.Foundation.Uri("ms-appx:///store/initial.xml");
        return storage.StorageFile.getFileFromApplicationUriAsync(url)
            .then(function (file) {
                return ViewModel.Store.currentApp.reloadSimulatorAsync(file);
            });
    },

});

    ViewModel.Store.currentApp.licenseInformation.addEventListener("licensechanged",
        function () {
            var license = ViewModel.Store.currentApp.licenseInformation;
            licensedCapabilities.basicApp = license.isActive;
    });
})();