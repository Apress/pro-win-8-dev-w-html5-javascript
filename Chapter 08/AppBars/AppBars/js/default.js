(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;

    WinJS.Navigation.addEventListener("navigating", function (e) {

        var navbar = ViewModel.State.navBarControlElement;
        if (navbar) {
            navbar.parentNode.removeChild(navbar);
        }

        if (ViewModel.State.appBarElement) {
            ViewModel.State.appBarElement.winControl.hide();
        }

        WinJS.UI.Animation.exitPage(contentTarget.children).then(function () {
            WinJS.Utilities.empty(contentTarget);
            WinJS.UI.Pages.render(e.detail.location, contentTarget)
                .then(function () {
                    return WinJS.Binding.processAll(document.body, ViewModel);
                }).then(function() {
                    return WinJS.UI.Animation.enterPage(contentTarget.children)
                });
        });
    });

    app.onactivated = function (eventObject) {
        WinJS.UI.processAll().then(function () {

            ViewModel.State.appBarElement = appbar;
            ViewModel.State.navBarContainerElement = navBarContainer;

            WinJS.Navigation.navigate("page1.html");

            fontSelect.addEventListener("change", function (e) {
                command.innerText = this.value;
                fontFlyout.winControl.hide();
            });
        });
    };
    app.start();
})();
