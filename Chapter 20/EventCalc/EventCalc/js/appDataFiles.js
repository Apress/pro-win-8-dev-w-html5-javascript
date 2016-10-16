(function () {

    var storage = Windows.Storage;
    var historyFileName = "calcHistory.json";
    var folder = storage.ApplicationData.current.localFolder;

    function readHistory() {
        folder.getFileAsync(historyFileName)
        .then(function (file) {
            var fileData = storage.FileIO.readLinesAsync(file)
            .then(function (lines) {
                lines.forEach(function (line) {
                    ViewModel.State.history.push(JSON.parse(line));
                });
            })
        });
    }

    readHistory();

    ViewModel.State.history.addEventListener("iteminserted", function (e) {
        folder.createFileAsync(historyFileName,
                storage.CreationCollisionOption.openIfExists)
        .then(function (file) {
            var stringData = JSON.stringify(e.detail.value);
            storage.FileIO.appendLinesAsync(file, [stringData]);
        });
    });

    (function () {
        storage.StorageFile.getFileFromApplicationUriAsync(
            Windows.Foundation.Uri("ms-appx:///data/calcData.json"))
        .then(function (file) {
            var cachedData = {};
            storage.FileIO.readLinesAsync(file).then(function (lines) {
                lines.forEach(function (line) {
                    var calcResult = JSON.parse(line);
                    if (cachedData[calcResult.first] == null) {
                        cachedData[calcResult.first] = {};
                    }
                    cachedData[calcResult.first][calcResult.second] = calcResult.result;
                });
            });
            ViewModel.State.cachedResult = cachedData;
        });
    })();
})();
