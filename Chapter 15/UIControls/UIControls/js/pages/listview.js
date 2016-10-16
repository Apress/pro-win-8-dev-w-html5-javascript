(function () {

    WinJS.UI.Pages.define("/pages/ListView.html", {
        ready: function () {

            var proxyObject = WinJS.Binding.as({
                layout: "Grid",
                groups: false,
                groupHeaderPosition: "top",
                maxRows: 3,
                ensureVisible: null,
                searchFor: null,
            });

            Templates.createControls(midPanel, list, "listView1", proxyObject);
            Templates.createControls(rightPanel, list, "listView2", proxyObject);

            proxyObject.bind("layout", function (val) {
                list.winControl.layout = val == "Grid" ?
                    new WinJS.UI.GridLayout() : new WinJS.UI.ListLayout();
            });

            proxyObject.bind("maxRows", function (val) {
                list.winControl.layout.maxRows = val;
            });

            proxyObject.bind("groupHeaderPosition", function (val) {
                list.winControl.layout.groupHeaderPosition = val;
            });

            proxyObject.bind("groups", function (val) {
                if (val) {
                    var groupDataSource = ViewModel.data.groupedLetters;
                    list.winControl.itemDataSource = groupDataSource.dataSource;
                    list.winControl.groupDataSource = groupDataSource.groups.dataSource;
                } else {
                    list.winControl.itemDataSource = ViewModel.data.letters.dataSource;
                    list.winControl.groupDataSource = null;
                }
            });

            list.addEventListener("iteminvoked", function (e) {
                e.detail.itemPromise.then(function (item) {
                    invoked.innerText = item.data.letter;
                    $('.invoked').removeClass("invoked");
                    WinJS.Utilities.addClass(e.target, "invoked");
                });
            });

            list.addEventListener("selectionchanged", function (e) {
                this.winControl.selection.getItems().then(function (items) {
                    var selectionString = "";
                    items.forEach(function (item) {
                        selectionString += item.data.letter + ", ";
                    });
                    selected.innerText = selectionString.slice(0, -2);
                });
            });

            proxyObject.bind("ensureVisible", function (val) {
                list.winControl.ensureVisible(val == null ? 0 : val);
            });

            proxyObject.bind("searchFor", function (val) {
                if (val != null) {
                    var index = -1;
                    ViewModel.data.letters.forEach(function (item) {
                        if (item.letter == val.toUpperCase()) {
                            index = ViewModel.data.letters.indexOf(item);
                        }
                    });
                    if (index > -1) {
                        list.winControl.ensureVisible(index);
                        list.winControl.selection.set([index]);
                    }
                }
            });

            var handler = {
                countChanged: function (newCount, oldCount) {
                    itemCount.innerText = newCount;
                }
            };
            list.winControl.itemDataSource.createListBinding(handler);

            $(".buttonContainer button").listen("click", function (e) {
                var ds = list.winControl.itemDataSource;
                ds.beginEdits();
                var promise;
                if (this.innerText == "Add Item") {
                    promise = ds.insertAtEnd(null, { letter: "A", group: 4 });
                } else {
                    //promise = ds.remove("1");
                    promise = ds.itemFromIndex(0).then(function (item) {
                        return ds.remove(item.key);
                    });
                }
                promise.then(function () {
                    ds.endEdits();
                });
            });
        }
    });
})();