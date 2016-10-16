(function () {

    WinJS.Namespace.define("ViewModel", WinJS.Binding.as({
        State: {
            firstNumber: null,
            secondNumber: null,
            result: null,
            history: new WinJS.Binding.List(),
            eventLog: new WinJS.Binding.List(),
            cachedResult: null
        }
    }));

    WinJS.Namespace.define("ViewModel.Converters", {
        calcNumber: WinJS.Binding.converter(function (val) {
            return val == null ? "" : val;
        }),
        calcResult: WinJS.Binding.converter(function (val) {
            return val == null ? "?" : val;
        }),
    });

    WinJS.Namespace.define("ViewModel.State", {
        getData: function () {
            var data = {
                firstNumber: ViewModel.State.firstNumber,
                secondNumber: ViewModel.State.secondNumber,
                history: [],
                events: []
            };
            ViewModel.State.history.forEach(function (item) {
                data.history.push(item);
            });
            ViewModel.State.eventLog.forEach(function (item) {
                data.events.push(item);
            });
            return data;
        },
        setData: function (data) {
            data.history.forEach(function (item) {
                ViewModel.State.history.push(item);
            });
            data.events.forEach(function (item) {
                ViewModel.State.eventLog.push(item);
            });
            ViewModel.State.firstNumber = data.firstNumber;
            ViewModel.State.secondNumber = data.secondNumber;
        }
    });

})();
