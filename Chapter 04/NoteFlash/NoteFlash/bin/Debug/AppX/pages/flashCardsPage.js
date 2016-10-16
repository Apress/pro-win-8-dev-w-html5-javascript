(function () {
    "use strict";

    var appState = WinJS.Binding.as({
        title: "", mode: null, leftNote: "=",
        rightNote: "=", currentIndex: 0, noteCount: 0,
        notes: [], currentNote: null,
        results: {
            numberCorrect: 0,
            numberWrong: 0
        },
    });

    WinJS.UI.Pages.define("/pages/flashCardsPage.html", {
        ready: function (element, options) {

            WinJS.Binding.processAll(document.body, appState);

            backButton.addEventListener("click", function (e) {
                showPage("/pages/selectorPage.html");
            });
            $("#noteButtons button").listen("click", handleButtonClick);

            setState(options);
            selectAndDisplayNote();
        }
    });

    function setState(mode) {

        appState.mode = mode;
        switch (mode) {
            case "leftHand":
                appState.title = "Left Hand Notes";
                break;
            case "rightHand":
                appState.title = "Right Hand Notes";
                break;
            case "bothHands":
                appState.title = "All Notes";
                break;
        }

        appState.notes = [];
        if (mode == "leftHand" || mode == "bothHands") {
            Notes.leftHand.slice().forEach(function (item) {
                appState.notes.push(item);
            });
        }
        if (mode == "rightHand" || mode == "bothHands") {
            Notes.rightHand.slice().forEach(function (item) {
                appState.notes.push(item);
            });
        }
        appState.currentIndex = 0;
        appState.results.numberCorrect = 0;
        appState.results.numberWrong = 0;
        appState.noteCount = appState.notes.length;
    }

    function selectAndDisplayNote() {
        if (appState.notes.length > 0) {
            var index = Math.floor((Math.random() * appState.notes.length));
            var note = appState.notes.splice(index, 1)[0];
            appState.leftNote = (note.hand == "left" ? "&#"
                + note.character + ";" : "=");
            appState.rightNote = (note.hand == "right" ? "&#"
                + note.character + ";" : "=");
            appState.currentNote = note;
            appState.currentIndex++;
        } else {
            $("#noteButtons button").forEach(function (item) {
                item.style.display = "none";
            });
            $("#noteButtons button[id]").setAttribute("style", "");
        }
    }

function handleButtonClick(e) {
    if (this.id == "restart") {
        showPage("/pages/flashCardsPage.html", appState.mode);
    } else if (this.id == "back") {
        showPage("/pages/selectorPage.html");
    } else {
        $("button[data-note].correct").removeClass("correct");
        $("button[data-note=" + appState.currentNote.note + "]")
            .addClass("correct");

        if (this.innerText == appState.currentNote.note) {
            appState.results.numberCorrect++;
        } else {
            appState.results.numberWrong++;
        }
        selectAndDisplayNote();
    }
}
})();
