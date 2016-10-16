(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var storage = Windows.Storage;
    var pickers = Windows.Storage.Pickers;

    var pickedFile = null;

    app.onactivated = function (args) {
        if (args.detail.previousExecutionState
            != activation.ApplicationExecutionState.suspended) {

            args.setPromise(WinJS.UI.processAll().then(function () {
                WinJS.Utilities.query('button').listen("click", function (e) {
                    if (this.id == "open") {
                        var openPicker = new pickers.FileOpenPicker();
                        openPicker.fileTypeFilter.replaceAll([".png", ".jpg"]);
                        openPicker.pickSingleFileAsync().then(function (file) {
                            pickedFile = file;
                            save.disabled = false;
                            thumbnail.src = URL.createObjectURL(file);
                        });
                    } else {
                        var savePicker = new pickers.FileSavePicker();
                        savePicker.defaultFileExtension = pickedFile.fileType;
                        savePicker.fileTypeChoices.insert(pickedFile.displayType,
                            [pickedFile.fileType]);
                        savePicker.suggestedFileName = "New Image File";
                        savePicker.pickSaveFileAsync().then(function (saveFile) {
                            if (saveFile) {
                                pickedFile.copyAndReplaceAsync(saveFile);
                            }
                        });
                    }
                });
            }));
        }
    };
    app.start();
})();
