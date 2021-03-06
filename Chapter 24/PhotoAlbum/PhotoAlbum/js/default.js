﻿(function () {

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var appstate = activation.ApplicationExecutionState;
    var storage = Windows.Storage;

    var query = storage.ApplicationData.current.localFolder
        .createFolderQuery();
    query.addEventListener("contentschanged", function () {
        App.loadFilesFromCache();
    });
    query.getFoldersAsync();


    app.onactivated = function (args) {

        if (args.detail.previousExecutionState != appstate.suspended) {
            args.setPromise(WinJS.UI.processAll().then(function () {

                if (ViewModel.fileList.length == 0) {
                    App.loadFilesFromCache();
                }

                switch (args.detail.kind) {
                    case activation.ActivationKind.fileOpenPicker:
                        var pickerUI = args.detail.fileOpenPickerUI;
                        WinJS.Navigation.navigate("/pages/openPickerView.html",
                            pickerUI);
                        break;
                    case activation.ActivationKind.fileSavePicker:
                        var pickerUI = args.detail.fileSavePickerUI;
                        WinJS.Navigation.navigate("/pages/savePickerView.html",
                            pickerUI);
                        break;
                    case activation.ActivationKind.file:
                        args.detail.files.forEach(function (file) {
                            App.processFile(file);
                        });
                    default:
                        WinJS.Navigation.navigate("/pages/albumView.html");
                        break;
                }

            }));
        }
    };
    app.start();
})();
