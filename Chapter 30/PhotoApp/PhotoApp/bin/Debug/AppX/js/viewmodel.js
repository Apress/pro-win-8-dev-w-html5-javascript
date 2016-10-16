(function () {

    WinJS.Namespace.define("ViewModel", {
        State: WinJS.Binding.as({
            pictureDataSource: new WinJS.Binding.List(),
            fileTypes: false,
            depth: false,
            thumbnails: false,
        }),
    });

    WinJS.Namespace.define("Converters", {
        display: WinJS.Binding.converter(function(val) {
            return val ? "block" : "none";
        })
    });

})();