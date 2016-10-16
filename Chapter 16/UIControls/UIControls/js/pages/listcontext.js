(function () {

WinJS.UI.Pages.define("/pages/ListContext.html", {
    ready: function () {

        zoomedOut.addEventListener("iteminvoked", function (e) {
            e.detail.itemPromise.then(function (item) {
                var invokedGroup = item.key;
                zoomedIn.winControl.groupDataSource.itemFromKey(invokedGroup)
                .then(function (item) {
                    var index = item.firstItemIndexHint;
                    zoomedIn.winControl.indexOfFirstVisible = index;
                });
            });
        });

zoomedIn.addEventListener("scroll", function (e) {

    var firstIndex = zoomedIn.winControl.indexOfFirstVisible;
    var lastIndex = zoomedIn.winControl.indexOfLastVisible;



    zoomedIn.winControl.itemDataSource.getCount().then(function (count) {
        var targetIndex = lastIndex == count - 1 ? lastIndex : firstIndex;


        var promises = {
            hightlightItem: zoomedIn.winControl.itemDataSource.itemFromIndex(firstIndex),
            visibleItem: zoomedIn.winControl.itemDataSource.itemFromIndex(targetIndex)
        };

        WinJS.Promise.join(promises).then(function (results) {
            zoomedOut.winControl.itemDataSource.itemFromKey(results.visibleItem.groupKey)
            .then(function (item) {
                zoomedOut.winControl.ensureVisible(item.index);
            });

            zoomedOut.winControl.itemDataSource.itemFromKey(results.hightlightItem.groupKey)
            .then(function (item) {
                var elem = zoomedOut.winControl.elementFromIndex(item.index);
                $('*.highlighted').removeClass("highlighted").removeClass("notHighlighted");
                WinJS.Utilities.addClass(elem, "highlighted");
                WinJS.Utilities.addClass(elem, "notHighlighted");
            });

        });
    });
}, true);
    }
});

})();