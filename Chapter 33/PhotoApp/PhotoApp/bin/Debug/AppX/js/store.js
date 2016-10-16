(function() {
    var storage = Windows.Storage;

    var licensedCapabilities = {
        basicApp: false,
        fileTypes: false,
        depth: false,
        thumbnails: false,
        print: false,
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

        //currentApp: Windows.ApplicationModel.Store.CurrentAppSimulator,
        currentApp: Windows.ApplicationModel.Store.CurrentApp,
        loadLicenseData: function () {
            //var url
            //    = new Windows.Foundation.Uri("ms-appx:///store/upgrades.xml");
            //return storage.StorageFile.getFileFromApplicationUriAsync(url)
            //    .then(function (file) {
            //        return ViewModel.Store.currentApp.reloadSimulatorAsync(file);
            //    });
            return WinJS.Promise.wrap("true");
        },

        isBasicAppPurchased: function () {
            var license = ViewModel.Store.currentApp.licenseInformation;
            return license.isActive && !license.isTrial;
        },

        isFullyUpgraded: function() {
            return ViewModel.Store.currentApp.licenseInformation.productLicenses.lookup("theworks").isActive;
        },

        getProductInfo: function () {
            return ViewModel.Store.currentApp.loadListingInformationAsync().then(function (info) {
                var products = [];
                var cursor = info.productListings.first();
                do {
                    var prodInfo = cursor.current;

                    products.push({
                        id: prodInfo.value.productId,
                        name: prodInfo.value.name,
                        price: prodInfo.value.formattedPrice,
                        purchased: ViewModel.Store.currentApp.licenseInformation.productLicenses.lookup(prodInfo.value.productId).isActive
                    });
                } while (cursor.moveNext());
                return products;
            });
        },

        requestAppPurchase: function() {
            ViewModel.Store.events.dispatchEvent("apppurchaserequested");
        },

        requestUpgradePurchase: function (productId) {
            ViewModel.Store.events.dispatchEvent("productpurchaserequested", { product: productId });
        }
    });

    ViewModel.Store.currentApp.licenseInformation.addEventListener("licensechanged",
        function () {
            var license = ViewModel.Store.currentApp.licenseInformation;
            licensedCapabilities.basicApp = license.isActive;
            
            var products = license.productLicenses;
            if (products.lookup("theworks").isActive || (license.isActive && license.isTrial)) {
                licensedCapabilities.fileTypes = true;
                licensedCapabilities.depth = true;
                licensedCapabilities.thumbnails = true;
                licensedCapabilities.print = true;
            } else {
                licensedCapabilities.fileTypes = products.lookup("fileTypes").isActive;
                licensedCapabilities.depth = products.lookup("depth").isActive;
                licensedCapabilities.thumbnails = products.lookup("thumbnails").isActive;
            }
  
        });
})();