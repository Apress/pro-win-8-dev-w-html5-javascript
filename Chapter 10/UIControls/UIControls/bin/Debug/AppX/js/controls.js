(function () {

WinJS.Namespace.define("App.Controls", {

    apptest: [
        { type: "select", id: "disabled", title: "Disabled", values: ["", "disabled"], labels: ["No", "Yes"] },
        { type: "select", id: "theme", title: "Theme", values: ["Small", "Big"], useProxy: true },
        { type: "input", id: "value", title: "Value", value: "Hello" },
        { type: "span", id: "value", value: "<Ready>", title: "Value" },
        { type: "buttons", title: "Buttons", labels: ["Add Item", "Delete Item"] },
        { type: "toggle", id: "disabled", title: "Disabled", value: false},
    ]
});

})();