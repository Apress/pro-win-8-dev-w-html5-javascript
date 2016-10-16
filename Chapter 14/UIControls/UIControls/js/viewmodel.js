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
                { file: "/images/data/snowdrop.jpg", name: "Snowdrop"}]
        }   
    });
   
})();


