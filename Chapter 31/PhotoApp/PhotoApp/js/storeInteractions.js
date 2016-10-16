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
        }
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
})();