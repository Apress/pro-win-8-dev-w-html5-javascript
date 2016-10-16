(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var storage = Windows.Storage;

    var fileList = [];

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {

                startButton.addEventListener("click", function (e) {
                    startButton.disabled = true;
                    var query = storage.KnownFolders.picturesLibrary.createFileQuery(
                            storage.Search.CommonFileQuery.orderByName);

                    query.addEventListener("contentschanged", function (e) {

                        query.getFilesAsync().then(function (files) {
                            files.forEach(function (file) {
                                if (fileList.indexOf(file.path) == -1) {
                                    fileList.push(file.path);
                                    displayToastForFile(file);
                                }
                            });
                        });
                    });

                    setTimeout(function () {
                        query.getFilesAsync().then(function (files) {
                            files.forEach(function (file) {
                                fileList.push(file.path);
                            });
                        });
                    }, 1000);
                });
            }));
        }
    };

    function displayToastForFile(file) {
        var messages = ["Found new file", file.displayName];
        var xml = Toast.getTemplateContent("toastImageAndText04");
        Toast.populateTemplate(xml, messages, ["ms-appx:///images/logo.png"]);
        var notification = Toast.showToast(xml);
        notification.addEventListener("activated", function (e) {
            if (file.fileType == ".jpg") {
                imgElem.src = URL.createObjectURL(file);
            } else {
                var options = new Windows.System.LauncherOptions();
                options.displayApplicationPicker = true;
                Windows.System.Launcher.launchFileAsync(file, options);
            }
        });
    }

    app.start();
})();
