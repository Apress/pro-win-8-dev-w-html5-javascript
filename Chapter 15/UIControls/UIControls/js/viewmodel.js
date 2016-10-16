(function () {
    "use strict";

    WinJS.Namespace.define("ViewModel", {
        data: {
            images: new WinJS.Binding.List([
                { file: "/images/data/aster.jpg", name: "Aster"},
                { file: "/images/data/carnation.jpg", name: "Carnation"},
                { file: "/images/data/daffodil.jpg", name: "Daffodil"},
                { file: "/images/data/lily.jpg", name: "Lilly"},
            ]),

            extraImages: [{ file: "/images/data/orchid.jpg", name: "Orchid"},
                { file: "/images/data/peony.jpg", name: "Peony"},
                { file: "/images/data/primula.jpg", name: "Primula"},
                { file: "/images/data/rose.jpg", name: "Rose"},
                { file: "/images/data/snowdrop.jpg", name: "Snowdrop" }],

            letters: new WinJS.Binding.List(),
            groupedLetters: null,
        },
    });
   

    var src = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
                "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    src.forEach(function (item, index) {
        ViewModel.data.letters.push({
            letter: item,
            group: index % 3
        });
    });

    ViewModel.data.groupedLetters = ViewModel.data.letters.createGrouped(
        function (item) { return item.group.toString(); },
        function (item) {
            //return "Group " + item.group;
            return {
                title: "Group " + item.group
            };
        },
        function (g1, g2) { return g1 - g2; }
    );

})();


