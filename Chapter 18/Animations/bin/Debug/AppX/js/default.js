(function () {
    "use strict";

    var app = WinJS.Application;
    window.$ = WinJS.Utilities.query;

    WinJS.Navigation.addEventListener("navigating", function (e) {
        var elem = document.getElementById("contentTarget");

        WinJS.UI.Animation.exitPage(elem.children).then(function () {
            WinJS.Utilities.empty(elem);
            WinJS.UI.Pages.render(e.detail.location, elem)
                .then(function () {
                    return WinJS.UI.Animation.enterPage(elem.children)
                });
        });
    });

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll().then(function () {
            document.getElementById("navbar").addEventListener("click",
                function (e) {
                    var navTarget = "pages/" + e.target.winControl.id + ".html";
                    WinJS.Navigation.navigate(navTarget);
                });
        })

        //.then(function() {
        //    WinJS.Navigation.navigate("pages/ContentAnimations.html");
        //})
    };

    app.start();
})();