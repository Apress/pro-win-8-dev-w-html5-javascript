(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var storage = Windows.Storage;
    var search = storage.Search;

app.onactivated = function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
        if (args.detail.previousExecutionState !==
            activation.ApplicationExecutionState.suspended) {

            refresh.addEventListener("click", function (e) {
                loadFiles();
            });

            WinJS.Utilities.query("#buttonContainer > div").listen("change",
                function (e) {
                if (ViewModel.Store.checkCapability(e.target.id)) {
                    ViewModel.State[e.target.id] = e.target.winControl.checked;
                    if (e.target.id == "thumbnails") {
                        listView.winControl.itemDataSource
                            = ViewModel.State.pictureDataSource.dataSource;
                    } else {
                        setImmediate(loadFiles);
                    }

                } else {
                    e.target.winControl.checked = false;
                }
            });

            listView.addEventListener("iteminvoked", function (e) {
                flipView.winControl.currentPage = e.detail.itemIndex;
            });
            flipView.addEventListener("pageselected", function (e) {
                var index = flipView.winControl.currentPage;
                listView.winControl.ensureVisible(index);

            });
        }
        args.setPromise(WinJS.UI.processAll().then(function() {
            return WinJS.Binding.processAll(document.body, ViewModel)
                .then(function () {
                    return ViewModel.Store.loadLicenseData().then(function () {
                        setupPrinting();
                        loadFiles();
                        ViewModel.Store.checkCapability("basicApp");
                    });
            });
        }));
    }
};

    function setupPrinting() {
        Windows.Graphics.Printing.PrintManager.getForCurrentView().onprinttaskrequested =
            function (e) {
                if (ViewModel.Store.checkCapability("print")
                    && ViewModel.State.pictureDataSource.length > 0) {
                    var printTask = e.request.createPrintTask("PrintAlbum",
                        function (printEvent) {
                            printEvent.setSource(
                                MSApp.getHtmlPrintDocumentSource(document));
                    });
                    printTask.options.orientation
                        = Windows.Graphics.Printing.PrintOrientation.landscape;
            };
        };
    }

    function loadFiles() {
        var options = new search.QueryOptions();
        options.fileTypeFilter.push(".png");

        if (ViewModel.State.fileTypes) {
            options.fileTypeFilter.push(".jpg", ".jpeg");
        }
        if (ViewModel.State.depth) {
            options.folderDepth = search.FolderDepth.deep;
        } else {
            options.folderDepth = search.FolderDepth.shallow;
        }
        storage.KnownFolders.picturesLibrary.createFileQueryWithOptions(options)
            .getFilesAsync().then(function (files) {
                var list = ViewModel.State.pictureDataSource;
                list.dataSource.beginEdits();
                list.length = 0;
                files.forEach(function (file) {
                    list.push({
                        image: URL.createObjectURL(file),
                        title: file.displayName
                    });
                });
                list.dataSource.endEdits();
        })
    };

    app.start();
})();
