(function () {
    "use strict";

    var app = WinJS.Application;
    var view = Windows.UI.ViewManagement;

    app.onactivated = function (eventObject) {

        document.getElementById("status").innerText
            = getMessageFromView(view.ApplicationView.value);

        window.addEventListener("resize", function() {
            document.getElementById("status").innerText
                = getMessageFromView(view.ApplicationView.value);
        });

    };

    function getMessageFromView(currentView) {
        var displayMsg;
        switch (currentView) {
            case view.ApplicationViewState.filled:
                displayMsg = "(Filled)";
                break;
            case view.ApplicationViewState.snapped:
                displayMsg = "(Snapped)";
                break;
            case view.ApplicationViewState.fullScreenLandscape:
                displayMsg = "(Full - Landscape)";
                break;
            case view.ApplicationViewState.fullScreenPortrait:
                displayMsg = "(Full - Portrait)";
                break;
        }
        return displayMsg;
    }

    app.start();
})();
