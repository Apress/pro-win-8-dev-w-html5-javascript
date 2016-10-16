(function () {

    var pops = Windows.UI.Popups;

    ViewModel.Store.events.addEventListener("capabilitycheck", function (e) {
        if (e.detail.capability == "basicApp") {
            if (ViewModel.Store.currentApp.licenseInformation.isTrial
                    && e.detail.enabled) {
                var daysLeft = Math.ceil(
                    (ViewModel.Store.currentApp.licenseInformation.expirationDate
                    - new Date()) / (24 * 60 * 60 * 1000));
                var md = new pops.MessageDialog("You have " + daysLeft
                    + " days left in your free trial");
                md.title = "Free Trial";
                md.commands.append(new pops.UICommand("OK"));
                md.commands.append(new pops.UICommand("Buy Now"));
                md.defaultCommandIndex = 0;
                md.showAsync().then(function (command) {
                    if (command.label == "Buy Now") {
                        buyApp();
                    }
                });

            } else if (!e.detail.enabled) {
                var md = new pops.MessageDialog("Your free trial has expired");
                md.commands.append(new pops.UICommand("Buy Now"));
                md.showAsync().then(function () {
                    buyApp().then(function (purchaseResult) {
                        if (!purchaseResult) {
                            ViewModel.Store.checkCapability("basicApp");
                        }
                    });
                });
            }
        } else if (e.detail.capability == "print" && !e.detail.enabled) {
            var md = new pops.MessageDialog("Printing is only available to subscribers");
            md.commands.append(new pops.UICommand("Subscribe"));
            md.commands.append(new pops.UICommand("Cancel"));
            md.showAsync().then(function (command) {
                if (command.label != "Cancel") {
                    buyUpgrade("theworks");
                }
            });

        } else if (!e.detail.enabled) {
            var md = new pops.MessageDialog("You need to buy an upgrade to use this "
                + " feature or subscribe to unlock all features");
            md.commands.append(new pops.UICommand("Upgrade"));
            md.commands.append(new pops.UICommand("Subscribe"));
            md.commands.append(new pops.UICommand("Cancel"));
            md.showAsync().then(function (command) {
                if (command.label != "Cancel") {
                    var product = command.label
                        == "Upgrade" ? e.detail.capability : "theworks";
                    buyUpgrade(product).then(function (upgradeResult) {
                        if (upgradeResult) {
                            var val = ViewModel.State[e.detail.capability];
                            if (val != undefined) {
                                ViewModel.State[e.detail.capability] = !val;
                            }
                            ViewModel.State.reloadState();
                        }
                    });
                }
            });
        }
    });

    ViewModel.Store.events.addEventListener("apppurchaserequested", function () {
        buyApp().then(function (result) {
            if (result) {
                ViewModel.State.reloadState();
            }
        });
    });

    ViewModel.Store.events.addEventListener("productpurchaserequested", function (e) {
        buyUpgrade(e.detail.product).then(function (result) {
            if (result) {
                ViewModel.State.reloadState();
            }
        });
    });

    function buyApp() {
        var md = new pops.MessageDialog("placholder");
        return ViewModel.Store.currentApp.requestAppPurchaseAsync(false).then(function () {
            if (ViewModel.Store.currentApp.licenseInformation.isActive) {
                md.title = "Success"
                md.content = "Your purchase was succesful. Thank you.";
                return md.showAsync().then(function () {
                    return true;
                });
            } else {
                return false;
            }
        }, function () {
            md.title = "Error"
            md.content = "Your purchase could not be completed. Please try again.";
            return md.showAsync().then(function () {
                return false;
            });
        });
    }

function buyUpgrade(product) {
    var md = new pops.MessageDialog("");
    return ViewModel.Store.currentApp.requestProductPurchaseAsync(product, false)
    .then(function () {
        if (ViewModel.Store.currentApp.licenseInformation.productLicenses.lookup(product).isActive) {
            md.title = "Success"
            md.content = "Your upgrade was succesful. Thank you.";
            return md.showAsync().then(function () {
                return true;
            });
        } else {
            return false;
        }
    }, function () {
        md.title = "Error"
        md.content = "Your upgrade could not be completed. Please try again.";
        return md.showAsync().then(function () {
            return false;
        });
    });
}

})();