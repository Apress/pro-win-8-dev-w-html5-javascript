(function () {
    "use strict";

    var app = WinJS.Application;

    WinJS.Navigation.addEventListener("navigating", function (e) {

        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location, contentTarget)
            .then(function () {
                return WinJS.UI.Animation.enterPage(contentTarget.children)
            });
        });
    });

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll().then(function () {
            navbar.addEventListener("click", function (e) {
                var navTarget = "pages/" + e.target.winControl.id + ".html";
                WinJS.Navigation.navigate(navTarget);
            });
        })

        //.then(function() {
        //    WinJS.Navigation.navigate("pages/CSSGestures.html");
        //})
    };

    app.start();
})();
