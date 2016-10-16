(function () {
    "use strict";

    function handleMusicButtonEvents(e) {
        switch (e.type) {
            case "mousedown":
                this.style.backgroundColor = "#6B997A";
                break;
            case "mouseup":
                this.style.backgroundColor = "";
                break;
            case "click":
                showPage("/pages/flashCardsPage.html", this.id);
                break;
        }
    };

    WinJS.UI.Pages.define("/pages/selectorPage.html", {
        ready: function (element, options) {
            var buttons = WinJS.Utilities.query("div.musicButton");
            ["mouseup", "mousedown", "click"].forEach(function (eventType) {
                buttons.listen(eventType, handleMusicButtonEvents);
            });
        }
    });
})();
