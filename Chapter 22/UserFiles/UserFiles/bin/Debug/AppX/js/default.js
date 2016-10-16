(function () {

    var $ = WinJS.Utilities.query;
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var storage = Windows.Storage;
    var search = Windows.Storage.Search;

    var imageFileNames = ["astor.jpg", "carnation.jpg", "daffodil.jpg",
        "lily.png", "orchid.jpg", "peony.jpg", "primula.jpg", "rose.png", "snowdrop.jpg"];


    storage.KnownFolders.picturesLibrary.getFolderAsync("flowers").then(function (folder) {
        var query = folder.createFileQuery();
        query.addEventListener("contentschanged", function (e) {
            App.writeMessage("New files!");
        });

       setTimeout(function () {
            query.getFilesAsync();
        }, 1000);
    });

    app.onactivated = function (args) {




        if (args.detail.previousExecutionState !=
            activation.ApplicationExecutionState.suspended) {


            args.setPromise(WinJS.UI.processAll().then(function () {


                $('#buttonsContainer > button').listen("click", function (e) {
                    App.clearMessages();
                    switch (e.target.id) {
                        case 'copyFiles':
                            storage.KnownFolders.picturesLibrary.createFolderAsync("flowers",
                                storage.CreationCollisionOption.replaceExisting)
                            .then(function (folder) {
                                imageFileNames.forEach(function (filename) {
                                    storage.StorageFile.getFileFromApplicationUriAsync(
                                        Windows.Foundation.Uri("ms-appx:///images/flowers/" + filename))
                                    .then(function (file) {
                                        file.copyAsync(folder).then(function () {
                                            App.writeMessage("Copied: " + filename);
                                        }, function (err) {
                                            App.writeMessage("Error: " + err);
                                        });
                                    });
                                });
                            });
                            break;
                        case 'copySeq':
                            var index = 0;
                            function copyFile(index, folder) {
                                return storage.StorageFile.getFileFromApplicationUriAsync(
                                    Windows.Foundation.Uri("ms-appx:///images/flowers/" +
                                       imageFileNames[index]))
                                .then(function (file) {
                                    return file.copyAsync(folder).then(function () {
                                        App.writeMessage("Copied: " + imageFileNames[index]);
                                    }).then(function () {
                                        index++;
                                        if (index < imageFileNames.length) {
                                            return copyFile(index, folder);
                                        }
                                    })
                                });
                            }
                            storage.KnownFolders.picturesLibrary.createFolderAsync("flowers",
                                storage.CreationCollisionOption.replaceExisting)
                            .then(function (folder) {
                                copyFile(index, folder).then(function () {
                                    App.writeMessage("All files copied");
                                });
                            });
                            break;
                        case 'deleteFiles':
                            storage.KnownFolders.picturesLibrary.getFolderAsync("flowers")
                            .then(function (folder) {
                                folder.getFilesAsync().then(function (files) {
                                    if (files.length == 0) {
                                        App.writeMessage("No files found");
                                    } else {
                                        files.forEach(function (storageFile) {
                                            storageFile.deleteAsync(storage.StorageDeleteOption.default);
                                            App.writeMessage("Deleted: " + storageFile.name);
                                        });
                                    }
                                });
                            })
                            break;
                        case 'sortFiles':
                            var options = new search.QueryOptions();
                            options.sortOrder.clear();
                            options.sortOrder.push({
                                ascendingOrder: false,
                                propertyName: "System.ItemNameDisplay"
                            });
                            storage.KnownFolders.picturesLibrary.getFolderAsync("flowers")
                            .then(function (folder) {
                                folder.createFileQueryWithOptions(options).getFilesAsync()
                                .then(function (files) {
                                    if (files.length == 0) {
                                        App.writeMessage("No files found");
                                    } else {
                                        files.forEach(function (storageFile) {
                                            App.writeMessage("Found: " + storageFile.name);
                                        });
                                    }
                                });
                            });
                            break;
                        case 'filterBasic':
                            var options = new search.QueryOptions();
                            options.fileTypeFilter.push(".doc", ".jpg", ".pdf");
                            options.folderDepth = search.FolderDepth.shallow;
                            options.indexerOption = search.IndexerOption.useIndexerWhenAvailable;
                            storage.KnownFolders.picturesLibrary.getFolderAsync("flowers")
                            .then(function (folder) {
                                folder.createFileQueryWithOptions(options).getFilesAsync()
                                .then(function (files) {
                                    if (files.length == 0) {
                                        App.writeMessage("No files found");
                                    } else {
                                        files.forEach(function (storageFile) {
                                            App.writeMessage("Found: " + storageFile.name);
                                        });
                                    }
                                });
                            });
                            break;
                        case 'filterAQS':
                            var options = new search.QueryOptions();
                            options.folderDepth = search.FolderDepth.deep;
                            options.applicationSearchFilter
                                = 'System.ItemType:=".jpg" AND System.Size:>300kb AND folder:flowers';
                            storage.KnownFolders.picturesLibrary.createFileQueryWithOptions(options)
                                .getFilesAsync().then(function (files) {
                                    if (files.length == 0) {
                                        App.writeMessage("No files found");
                                    } else {
                                        files.forEach(function (storageFile) {
                                            App.writeMessage("Found: " + storageFile.name);
                                        });
                                    }
                                });
                            break;
                        case 'commonQuery':
                            var options = new search.QueryOptions(
                                search.CommonFileQuery.orderByName, [".jpg", ".png"]);
                            storage.KnownFolders.picturesLibrary.getFolderAsync("flowers")
                                    .then(function (folder) {
                                        folder.createFileQueryWithOptions(options).getFilesAsync()
                                        .then(function (files) {
                                            if (files.length == 0) {
                                                App.writeMessage("No files found");
                                            } else {
                                                files.forEach(function (storageFile) {
                                                    App.writeMessage("Found: " + storageFile.name);
                                                });
                                            }
                                        });
                                    });
                            break;

                        case 'groupType':
                            storage.KnownFolders.picturesLibrary.getFolderAsync("flowers")
                                .then(function (flowersFolder) {
                                    flowersFolder.getFoldersAsync(search.CommonFolderQuery.groupByType)
                                    .then(function (typeFolders) {
                                        var index = 0;
                                        (function describeFolders() {
                                            App.writeMessage("Folder: " + typeFolders[index].displayName);
                                            typeFolders[index].getFilesAsync().then(function (files) {
                                                files.forEach(function (file) {
                                                    App.writeMessage("--File: " + file.name);
                                                });
                                                if (index < typeFolders.length - 1) {
                                                    index++;
                                                    describeFolders();
                                                }
                                            });
                                        })();
                                    });
                                });
                            break;
                    }
                });
            }));
        }
    };
    app.start();
})();
