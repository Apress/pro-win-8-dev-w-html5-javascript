(function () {
    "use strict";

    WinJS.Namespace.define("ViewModel", WinJS.Binding.as({
        State: {
            zip1: "10036",
            zip2: "20500",
        }
    }));

    ViewModel.State.messages = new WinJS.Binding.List();
})();
