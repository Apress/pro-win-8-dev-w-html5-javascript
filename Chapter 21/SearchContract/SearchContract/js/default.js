(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var search = Windows.ApplicationModel.Search;
    WinJS.strictProcessing();

    app.onactivated = function (args) {
        var searchTerm;
        var promise;

        switch (args.detail.kind) {
            case activation.ActivationKind.search:
                ViewModel.writeMessage("Search Activation");
                searchTerm = args.detail.queryText;
                break;
            case activation.ActivationKind.launch:
                ViewModel.writeMessage("Launch Activation");
                searchTerm = "";
                break;
        }

        if (args.detail.previousExecutionState
            != activation.ApplicationExecutionState.suspended) {
            ViewModel.writeMessage("App was not resumed");
            promise = WinJS.UI.processAll().then(function () {
                var sp = search.SearchPane.getForCurrentView();
                sp.searchHistoryEnabled = false;
                showSearch.addEventListener("click", function (e) {
                    sp.show(ViewModel.searchTerm);
                });

                sp.addEventListener("suggestionsrequested", function (e) {
                    var deferral = e.request.getDeferral();
                    ViewModel.asyncSuggest(e.queryText).then(function (suggestions) {
                        e.request.searchSuggestionCollection.appendQuerySuggestions(suggestions);
                        deferral.complete();
                    });
                });

                sp.addEventListener("resultsuggestionchosen", function (e) {
                    ViewModel.search(e.tag);
                });



            });
        } else {
            ViewModel.writeMessage("App was resumed");
            promise = WinJS.Promise.as(true);
        }

        args.setPromise(promise.then(function () {
            ViewModel.search(searchTerm);
        }));
    };

    app.start();
})();
