(function() {
    
    function renderItem(itemPromise) {
        return itemPromise.then(function (item) {
            var topElem = document.createElement("div");
            WinJS.Utilities.addClass(topElem, "renderDiv");
            var imgElem = topElem.appendChild(document.createElement("img"));
            imgElem.src = item.data.file;
            var titleElem = topElem.appendChild(document.createElement("div"));
            titleElem.innerText = item.data.name;
            return topElem;
        });
    }

WinJS.UI.Pages.define("/pages/FlipView.html", {
    ready: function () {

        var proxyObject = WinJS.Binding.as({
            itemTemplate: ItemTemplate,
            customAnimations: false,
        });

        Templates.createControls(rightPanel, flip, "flipView", proxyObject)
        .then(function () {

            proxyObject.bind("itemTemplate", function (val) {
                flip.winControl.itemTemplate =
                    val == "HTML" ? ItemTemplate : renderItem;
            });

            flip.addEventListener("datasourcecountchanged", function () {
                flip.winControl.count().then(function (countVal) {
                    itemCount.innerText = countVal;
                });
            });

            $('#rightPanel button').listen("click", function (e) {
                var data = ViewModel.data.images;
                var extras = ViewModel.data.extraImages;
                var buttonText = e.target.innerText.toLowerCase();
                switch (buttonText) {
                    case "add":
                    case "remove":
                        if (buttonText == "add" && extras.length > 0) {
                            data.push(extras.pop());
                        } else if (buttonText == "remove" && data.length > 1) {
                            extras.push(data.pop());
                        }

                        break;
                    case "previous":
                    case "next":
                        flip.winControl[buttonText]();
                        currentPage.innerText = flip.winControl.currentPage;
                        break;
                }
            });

            proxyObject.bind("customAnimations", function (val) {
                if (val) {
                    flip.winControl.setCustomAnimations({
                        next: function (pageout, pagein) {
                            return WinJS.Promise.join([WinJS.UI.Animation.fadeOut(pageout),
                                 WinJS.UI.Animation.fadeIn(pagein)]);
                        }
                    });
                } else {
                    flip.winControl.setCustomAnimations({
                        next: null
                    });
                }
            });
        });
    }
});
})();
