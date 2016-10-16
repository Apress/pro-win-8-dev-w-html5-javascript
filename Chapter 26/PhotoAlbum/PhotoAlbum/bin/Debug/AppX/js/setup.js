(function () {

    WinJS.Namespace.define("ViewModel", {
        fileList: new WinJS.Binding.List()
    });

    WinJS.Navigation.addEventListener("navigating", function (e) {
        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location, contentTarget,
                WinJS.Navigation.state)
                .then(function () {
                    WinJS.Binding.processAll(document.body, ViewModel);
                }).then(function () {
                    return WinJS.UI.Animation.enterPage(contentTarget.children)
                });
        });
    });
})();
