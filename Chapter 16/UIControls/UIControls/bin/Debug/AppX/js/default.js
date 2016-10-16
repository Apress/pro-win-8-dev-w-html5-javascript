(function () {
    "use strict";

    var app = WinJS.Application;
    window.$ = WinJS.Utilities.query;
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.Navigation.addEventListener("navigating", function (e) {
        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location, contentTarget)
                .then(function () {
                    return WinJS.Binding.processAll(contentTarget, ViewModel.State)
                        .then(function () {
                            return WinJS.UI.Animation.enterPage(contentTarget.children)
                        });
                });
        });
    });

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll().then(function () {

            Templates.generateNavBarCommands(navbar, navBarCommandTemplate);

            navbar.addEventListener("click", function (e) {
                var navTarget = "pages/" + e.target.winControl.label + ".html";
                WinJS.Navigation.navigate(navTarget);
                navbar.winControl.hide();
            });
        })

        //.then(function() {
        //    return WinJS.Navigation.navigate("pages/ToggleSwitch.html");
        //})
    };

    app.start();
})();
