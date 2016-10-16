(function () {

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var appstate = activation.ApplicationExecutionState;
    var storage = Windows.Storage;
    var share = Windows.ApplicationModel.DataTransfer;

    app.onactivated = function (args) {
        if (args.detail.previousExecutionState != appstate.suspended) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                var list = new WinJS.Binding.List();
                listView.winControl.itemDataSource = list.dataSource;

                storage.KnownFolders.picturesLibrary
                    .getFilesAsync(storage.Search.CommonFileQuery.orderByName)
                    .then(function (files) {
                        files.forEach(function (file) {
                            list.unshift({
                                img: URL.createObjectURL(file),
                                title: file.displayName, file: file
                            });
                        });
                    });

                share.DataTransferManager.getForCurrentView()
                    .addEventListener("datarequested", function (e) {

                        var deferral = e.request.getDeferral();

                        listView.winControl.selection.getItems().then(function (items) {
                            if (items.length > 0) {
                                var datapackage = e.request.data;

                                var files = [];
                                items.forEach(function (item) {
                                    files.push(item.data.file);
                                });
                                datapackage.setStorageItems(files);

                                //datapackage.setUri(new Windows.Foundation.Uri("http://apress.com"));

                                datapackage.properties.title = "Share Images";
                                datapackage.properties.description = "Images from the Pictures Library";
                                datapackage.properties.applicationName = "ShareHelper";
                                datapackage.properties.insert("referenceURL", "http://apress.com");

                            } else {
                                e.request.failWithDisplayText(
                                    "Select the images you want to share and try again");
                            }
                        });
                        deferral.complete();
                    });
            }));
        }
    };
    app.start();
})();
