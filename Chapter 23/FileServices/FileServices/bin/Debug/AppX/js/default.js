(function () {

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    WinJS.Navigation.addEventListener("navigating", function (e) {
        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location,
                contentTarget, WinJS.Navigation.state)
                .then(function () {
                    return WinJS.UI.Animation.enterPage(contentTarget.children)
                });
        });
    });

    app.onactivated = function (args) {
        if (args.detail.previousExecutionState
            != activation.ApplicationExecutionState.suspended) {
            args.setPromise(WinJS.UI.processAll().then(function() {
                navbar.addEventListener("click", function (e) {
                    var navTarget = "pages/" + e.target.winControl.id + ".html";
                    WinJS.Navigation.navigate(navTarget);
                    navbar.winControl.hide();
                });
            }));
        }
    };

    app.start();
})();
