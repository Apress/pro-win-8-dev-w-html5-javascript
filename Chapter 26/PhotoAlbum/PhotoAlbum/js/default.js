(function () {

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
                    case activation.ActivationKind.protocol:
                        if (args.detail.uri.schemeName == "photoalbum") {
                            var path = args.detail.uri.path;
                            storage.StorageFile.getFileFromPathAsync(path)
                                .then(function (file) {
                                    App.processFile(file);
                                });
                        }
                        break;
                    case activation.ActivationKind.shareTarget:
                        WinJS.Navigation.navigate("/pages/shareTargetView.html",
                            args.detail.shareOperation);
                        break;
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
                        switch (args.detail.verb) {
                            case 'addpictures':
                            case 'addmixed':
                            case 'addstorage':
                                WinJS.Navigation.navigate("/pages/autoplayView.html",
                                    args.detail.files);
                                break;
                            case 'open':
                                args.detail.files.forEach(function (file) {
                                    App.processFile(file);
                                });
                                WinJS.Navigation.navigate("/pages/albumView.html");
                                break;
                        }
                        break;
                    default:
                        WinJS.Navigation.navigate("/pages/albumView.html");
                        break;
                }

            }));
        }
    };
    app.start();
})();
