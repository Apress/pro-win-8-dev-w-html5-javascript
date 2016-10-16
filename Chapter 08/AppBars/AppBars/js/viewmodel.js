(function () {
    "use strict";

    WinJS.Namespace.define("ViewModel.State", {
        appBarElement: null,
        navBarContainerElement: null,
        navBarControlElement: null
    });

    WinJS.Namespace.define("ViewModel", WinJS.Binding.as({
        UserData: {
            word: null,
            wordLength: null,
        }
    }));

    ViewModel.UserData.wordList = new WinJS.Binding.List();

    ViewModel.UserData.bind("word", function (newVal) {
        if (newVal) {
            ViewModel.UserData.wordLength = newVal ? newVal.length : null;
            ViewModel.UserData.wordList.push(newVal);
        }
    });

    WinJS.Namespace.define("ViewModel.Converters", {
        //defaultStringIfNull: WinJS.Binding.converter(function (val) {
        //    return val ? val : "<No Word>";
        //})
        defaultStringIfNull: function (src, srcprop, dest, destprop) {
            var srcObject= src;
            var targetObject = dest;

            srcprop.slice(0, srcprop.length -1).forEach(function (prop) {
                srcObject = srcObject[prop] != undefined ? srcObject[prop] : null;
            });

            destprop.slice(0, destprop.length -1).forEach(function (prop) {
                targetObject = targetObject[prop] == undefined ? null: targetObject[prop];
            });

            srcObject.bind(srcprop[srcprop.length - 1], function (val) {
                var value = val != null ? val :
                    srcprop[srcprop.length - 1] == "wordLength" ? "N/A" : "<No Word>";
                targetObject[destprop[destprop.length - 1]] = value;
            });
        }
    });

    ViewModel.Converters.defaultStringIfNull.supportedForProcessing = true;

})();
