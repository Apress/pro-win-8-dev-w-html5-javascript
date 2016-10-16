(function () {
    "use strict";

    var app = WinJS.Application;
    var $ = WinJS.Utilities.query;
   
    function requestData(zip, targetElem) {

        ViewModel.State.messages.push("Started for " + zip);

        var promise = WinJS.xhr({
            url: "http://gomashup.com/json.php?fds=geo/usa/zipcode/" + zip
        }).then(function (xhr) {
            ViewModel.State.messages.push(zip + " Successful");
            var dataObject = JSON.parse(xhr.response.slice(1, -1)).result;
            WinJS.Utilities.empty(targetElem);
            zipTemplate.winControl.render(dataObject[0], targetElem);
            return true;
        }, function (xhr) {
            ViewModel.State.messages.push(zip + " Failed");
            WinJS.Utilities.empty(targetElem);
            targetElem.innerText = "Error: " + (xhr.statusText != null ? xhr.statusText : xhr.message);
            return false;
        }).then(function (allok) {
            if (allok) {
                ViewModel.State.messages.push(zip + " Complete");
            }
            return allok;
        });

        return promise;
    }

    app.onactivated = function (args) {
        $('input').listen("change", function (e) {
            ViewModel.State[this.id] = this.value;
        });

        var p1, p2;

        $('button').listen("click", function (e) {
            if (this.id == "go") {

                p1 = requestData(ViewModel.State.zip1, middle);
                p2 = requestData(ViewModel.State.zip2, right);

                WinJS.Promise.thenEach([p1, p2], function (data) {
                    ViewModel.State.messages.push("A Request is Complete");
                }).then(function (results) {
                    ViewModel.State.messages.push(results.length + " Requests Complete");
                });
          
            } else {
                p1.cancel();
                p2.cancel();
                ViewModel.State.messages.push("All Requests Canceled");
            }
        });

        ViewModel.State.messages.addEventListener("iteminserted", function (e) {
                messageTemplate.winControl.render({ message: e.detail.value }, messages);
            });

        WinJS.UI.processAll().then(function () {
            return WinJS.Binding.processAll(document.body, ViewModel);
        });
    };

    app.start();
})();
