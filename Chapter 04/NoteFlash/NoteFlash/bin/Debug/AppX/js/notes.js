(function () {
    "use strict";

    var Note = WinJS.Class.define(function (note, character, hand) {
        this.note = note;
        this.character = character;
        this.hand = hand;
    });

    WinJS.Namespace.define("Notes", {
        leftHand: [
                new Note('C', 80, "left"), new Note('D', 81, "left"),
                new Note('E', 82, "left"), new Note('F', 83, "left"),
                new Note('G', 84, "left"), new Note('A', 85, "left"),
                new Note('B', 86, "left"), new Note('C', 87, "left"),
                new Note('D', 88, "left"), new Note('E', 89, "left"),
                new Note('F', 90, "left"), new Note('G', 91, "left"),
                new Note('A', 92, "left"), new Note('B', 93, "left"),
                new Note('C', 94, "left")
        ],
        rightHand: [
                new Note('C', 82, "right"), new Note('D', 83, "right"),
                new Note('E', 84, "right"), new Note('F', 85, "right"),
                new Note('G', 86, "right"), new Note('A', 87, "right"),
                new Note('B', 88, "right"), new Note('C', 89, "right"),
                new Note('D', 90, "right"), new Note('E', 91, "right"),
                new Note('F', 92, "right"), new Note('G', 93, "right"),
                new Note('A', 94, "right"),
        ],
    });

})();
