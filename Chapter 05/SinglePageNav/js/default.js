(function () {
    "use strict";

    var app = WinJS.Application;
    window.$ = WinJS.Utilities.query;

    app.onactivated = function (eventObject) {

        WinJS.Navigation.addEventListener("navigating", function (e) {
            var targetElem = $('#topRight div.contentTarget')[0];
            WinJS.Utilities.empty(targetElem);

            var content = e.detail.location == "basic"
                ? "contentBasic.html" : "contentButton.html";
            WinJS.UI.Pages.render(content, targetElem);
        });

        $('#left button').listen("click", function (e) {
            if (this.id == "button1") {
                WinJS.Navigation.navigate("basic", "Hello from default.js");
            } else {
                WinJS.Navigation.navigate("button");
            }
        });
        WinJS.UI.processAll();
    };
    app.start();
})();
