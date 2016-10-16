(function () {
    WinJS.Namespace.define("ViewModel", {
        Settings: WinJS.Binding.as({
            backgroundColor: "#1D1D1D",
            textColor: "#FFFFFF",
            showHistory: true
        })
    });

    WinJS.Namespace.define("ViewModel.Converters", {
        display: WinJS.Binding.converter(function (val) {
            return val ? "block" : "none";
        }),
    });

    WinJS.Application.onsettings = function (e) {
        e.detail.applicationcommands = {
            "colorsDiv": { href: "colorsSettings.html", title: "Colors" },
            "historyDiv": { href: "historySettings.html", title: "History" }
        };
        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    var storage = Windows.Storage;
    var settingNames = ["backgroundColor", "textColor", "showHistory"];
    var loadingSettings = false;

    settingNames.forEach(function (setting) {
        ViewModel.Settings.bind(setting, function (newVal, oldVal) {
            if (!loadingSettings && oldVal != null) {
                var container = storage.ApplicationData.current.roamingSettings;
                if (setting == "showHistory") {
                    container.values["HighPriority"] = newVal;
                } else if (setting == "backgroundColor" || setting == "textColor") {
                    var comp = new storage.ApplicationDataCompositeValue();
                    comp["backgroundColor"] = ViewModel.Settings.backgroundColor;
                    comp["textColor"] =  ViewModel.Settings.textColor;
                    container.values["colors"] = comp;
                }
            }
        });
    });

    function loadSettings() {
        loadingSettings = true;
        var container = storage.ApplicationData.current.roamingSettings;
        ["HighPriority", "colors"].forEach(function (setting) {
            value = container.values[setting];
            if (value != null) {
                if (setting == "HighPriority") {
                    ViewModel.Settings.showHistory = value;
                } else {
                    ViewModel.Settings.backgroundColor = value["backgroundColor"];
                    ViewModel.Settings.textColor = value["textColor"];
                }
            }
        });
        setImmediate(function () {
            loadingSettings = false;
        })
    };
    loadSettings();

    storage.ApplicationData.current.addEventListener("datachanged", function (e) {
        loadSettings();
    });
})();
