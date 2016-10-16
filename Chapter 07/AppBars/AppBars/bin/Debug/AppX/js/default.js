(function () {
    "use strict";

    var app = WinJS.Application;

    WinJS.Navigation.addEventListener("navigating", function (e) {

        if (window.navbar) {
            window.navbar.parentNode.removeChild(navbar);
        }

        if (window.appbar) {
            window.appbar.winControl.hide();
        }

        //WinJS.Utilities.empty(contentTarget);
        //WinJS.UI.Pages.render(e.detail.location, contentTarget);

        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location, contentTarget).then(function () {
                return WinJS.UI.Animation.enterPage(contentTarget.children)
            });
        });
    });

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll().then(function () {

            WinJS.Navigation.navigate("page1.html");

            fontSelect.addEventListener("change", function (e) {
                command.innerText = this.value;
                fontFlyout.winControl.hide();
            });
        });
    };
    app.start();
})();
