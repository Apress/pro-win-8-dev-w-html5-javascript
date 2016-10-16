(function () {
    "use strict";
    
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    window.$ = WinJS.Utilities.query;

    window.showPage = function (url, options) {
        WinJS.Utilities.empty(pageFrame);
        WinJS.UI.Pages.render(url, pageFrame, options);
    };

    app.onactivated = function (args) {
        showPage("/pages/selectorPage.html");
    };

    app.start();
})();
