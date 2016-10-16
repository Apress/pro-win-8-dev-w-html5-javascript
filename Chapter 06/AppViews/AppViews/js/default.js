(function () {
    "use strict";

    var app = WinJS.Application;
    var view = Windows.UI.ViewManagement;
    var display = Windows.Graphics.Display;

    app.onactivated = function (eventObject) {

        switch (display.DisplayProperties.resolutionScale) {
            case display.ResolutionScale.scale100Percent:
                testImg.src = "images/img100.png";
                break;
            case display.ResolutionScale.scale140Percent:
                testImg.src = "images/img140.png";
                break;
            case display.ResolutionScale.scale180Percent:
                testImg.src = "images/img180.png";
                break;
        };

        view.innerText = getMessageFromView(view.ApplicationView.value);

        window.addEventListener("view", function () {
            topRight.innerText = getMessageFromView(view.ApplicationView.value);
        });

        displayOrientation();

        display.DisplayProperties.addEventListener("orientationchanged", function (e) {
            displayOrientation();
        });

        lock.addEventListener("click", function (e) {
            if (this.innerText == "Lock") {
                display.DisplayProperties.autoRotationPreferences =
                    display.DisplayOrientations.landscape |
                    display.DisplayOrientations.landscapeFlipped;
                this.innerText = "Unlock";
            } else {
                display.DisplayProperties.autoRotationPreferences = 0;
                this.innerText = "Lock";
            }
        });

        WinJS.UI.Pages.render("/content.html", document.getElementById("bottomRight"));
    };

    function displayOrientation() {
        var msg = getStringFromValue(display.DisplayProperties.currentOrientation);
        currentOrientation.innerText = "Current: " + msg;

        msg = getStringFromValue(display.DisplayProperties.nativeOrientation);
        nativeOrientation.innerText = "Native: " + msg;
    }

    function getStringFromValue(value) {
        var result;
        switch (value) {
            case display.DisplayOrientations.landscape:
                result = "Landscape";
                break;
            case display.DisplayOrientations.landscapeFlipped:
                result = "Landscape Flipped";
                break;
            case display.DisplayOrientations.portrait:
                result = "Portrait";
                break;
            case display.DisplayOrientations.portraitFlipped:
                result = "Portrait Flipped";
                break;
        }
        return result;
    }

    function getMessageFromView(currentView) {
        var displayMsg;
        switch (currentView) {
            case view.ApplicationViewState.filled:
                displayMsg = "Filled View";
                break;
            case view.ApplicationViewState.snapped:
                displayMsg = "Snapped View";
                break;
            case view.ApplicationViewState.fullScreenLandscape:
                displayMsg = "Full - Landscape";
                break;
            case view.ApplicationViewState.fullScreenPortrait:
                displayMsg = "Full - Portrait";
                break;
        }
        return "View: " + displayMsg;
    }

    app.start();
})();
