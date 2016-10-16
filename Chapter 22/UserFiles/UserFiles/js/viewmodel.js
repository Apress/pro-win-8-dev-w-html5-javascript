(function () {

    WinJS.Namespace.define("ViewModel", {
        State: WinJS.Binding.as({
            messages: new WinJS.Binding.List()
        })
    });

    WinJS.Namespace.define("App", {
        writeMessage: function (msg) {
            ViewModel.State.messages.push({ message: msg });
        },
        clearMessages: function () {
            ViewModel.State.messages.length = 0;
        }
    });

    App.writeMessage("Ready");
})();
