(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    WinJS.strictProcessing();

    function writeEventMessage(msg) {
        ViewModel.State.eventLog.push({ message: msg });
    };

    app.onactivated = function (args) {
        var promises = [];

        if (args.detail.kind === activation.ActivationKind.launch) {
            switch (args.detail.previousExecutionState) {
                case activation.ApplicationExecutionState.suspended:
                    startBackgroundWork();
                    writeEventMessage("Resumed from Suspended");
                    break;
                case activation.ApplicationExecutionState.terminated:
                    ViewModel.State.setData(app.sessionState);
                    writeEventMessage("Launch from Terminated");
                    promises.push(performInitialization());
                    break;
                case activation.ApplicationExecutionState.notRunning:
                case activation.ApplicationExecutionState.closedByUser:
                case activation.ApplicationExecutionState.running:
                    writeEventMessage("Fresh Launch");
                    promises.push(performInitialization());
                    break;
            }

            if (args.detail.splashScreen) {
                args.detail.splashScreen.addEventListener("dismissed", function (e) {
                    writeEventMessage("Splash Screen Dismissed");
                });
            }

            promises.push(WinJS.UI.processAll().then(function () {
                return WinJS.Binding.processAll(calcElems, ViewModel.State);
            }));

            args.setPromise(WinJS.Promise.join(promises));
        }
    };

    app.oncheckpoint = function (args) {
        // app is about to be suspended
        app.sessionState = ViewModel.State.getData();
        backgroundPromise.stop = true;
        args.setPromise(backgroundPromise);
        writeEventMessage("Suspended");
    };

    function performInitialization() {
        calcButton.addEventListener("click", function (e) {
            var first = ViewModel.State.firstNumber = Number(firstInput.value);
            var second = ViewModel.State.secondNumber = Number(secondInput.value);
            if (first < 5000 && second < 5000) {
                ViewModel.State.result = ViewModel.State.cachedResult[first][second];
            } else {
                ViewModel.State.result = first + second;
            }
        });

        ViewModel.State.bind("result", function (val) {
            if (val != null) {
                ViewModel.State.history.push({
                    message: ViewModel.State.firstNumber + " + "
                        + ViewModel.State.secondNumber + " = "
                        + val
                });
            }
        });

        startBackgroundWork();

        return Utils.doWork(5000).then(function (data) {
            ViewModel.State.cachedResult = data;
        });
    };

    var backgroundPromise;

    function startBackgroundWork() {
        backgroundPromise = Utils.doBackgroundWork();
        var updatedExistingEntry = false;
        backgroundPromise.then(function () { }, function () { }, function (progress) {
            var newItem = {
                message: "Activated: " + Number(progress).toFixed(0) + " seconds ago"
            };
            ViewModel.State.eventLog.forEach(function (item, index) {
                if (item.message.indexOf("Activated:") == 0) {
                    updatedExistingEntry = true;
                    ViewModel.State.eventLog.setAt(index, newItem);
                }
            });
            if (!updatedExistingEntry) {
                ViewModel.State.eventLog.push(newItem);
            }
        });
    }


    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", function (e) {
        WinJS.Application.queueEvent({
            type: "activated",
            detail: {
                kind: activation.ActivationKind.launch,
                previousExecutionState: activation.ApplicationExecutionState.suspended
            }
        });
    });

    app.start();
})();
