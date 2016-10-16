(function () {

    var storage = Windows.Storage;
    var access = storage.AccessCache;
    var cache = access.StorageApplicationPermissions.futureAccessList;
    var pickers = storage.Pickers;

    var dataCache = [];

    WinJS.Namespace.define("App", {

        adaptLayout: function (prepareForPrint) {
            var flist = ViewModel.fileList;
            if (prepareForPrint == true) {
                dataCache = flist.splice(4, flist.length - 4);
            } else {
                dataCache.forEach(function (item) {
                    flist.push(item);
                });
                dataCache.length = 0;
            }
        },


        loadFilesFromCache: function () {
            return new WinJS.Promise(function (fDone, fErr, fProg) {
                if (cache.entries.length > 0) {
                    ViewModel.fileList.length = 0;
                    var index = cache.entries.length - 1;
                    (function processEntry() {
                        cache.getFileAsync(cache.entries[index].token)
                            .then(function (file) {
                                App.processFile(file, false);
                                if (--index != -1) {
                                    processEntry();
                                } else {
                                    fDone();
                                }
                            });
                    })();
                } else {
                    fDone();
                }
            });
        },

        processFile: function (file, addToCache) {
            ViewModel.fileList.unshift({
                img: URL.createObjectURL(file),
                title: file.displayName,
                file: file
            });
            if (addToCache !== false) {
                cache.add(file);
            }
        },

        pickFiles: function () {
            var picker = pickers.FileOpenPicker();
            picker.fileTypeFilter.replaceAll([".jpg", ".png"]);
            picker.pickMultipleFilesAsync().then(function (files) {
                if (files != null) {
                    files.forEach(function (file) {
                        App.processFile(file);
                    });
                }
            });
        },

        clearCache: function () {
            cache.clear();
            ViewModel.fileList.length = 0;
        }
    });

})();
