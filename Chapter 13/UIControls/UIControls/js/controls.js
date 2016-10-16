(function () {

WinJS.Namespace.define("App.Controls", {

    apptest: [
        { type: "select", id: "disabled", title: "Disabled", values: ["", "disabled"], labels: ["No", "Yes"] },
        { type: "select", id: "theme", title: "Theme", values: ["Small", "Big"], useProxy: true },
        { type: "input", id: "value", title: "Value", value: "Hello" },
        { type: "span", id: "value", value: "<Ready>", title: "Value" },
        { type: "buttons", title: "Buttons", labels: ["Add Item", "Delete Item"] },
        { type: "toggle", id: "disabled", title: "Disabled", value: false }],

    toggleSwitch: [
        { type: "toggle", id: "checked", title: "Value", value: true },
        { type: "toggle", id: "disabled", title: "Disabled", value: false }],

    rating: [
        { type: "toggle", id: "enableClear", title: "Enable Clear", value: true },
        { type: "toggle", id: "disabled", title: "Disabled", value: false },
        { type: "input", id: "userRating", title: "User Rating", value: 0 },
        { type: "input", id: "maxRating", title: "Max Rating", value: 6 },
        { type: "input", id: "averageRating", title: "Ave. Rating", value: 2.6 }],

    tooltip: [
        { type: "toggle", id: "infotip", title: "Infotip", value: false, labelOn: "Yes", labelOff: "No" },
        { type: "select", id: "placement", title: "Placement", values: ["top", "bottom", "left", "right"], labels: ["Top", "Bottom", "Left", "Right"]},
        { type: "buttons", labels: ["Open", "Close"] }],

    timePicker: [
        { type: "toggle", id: "showPeriod", title: "Show Period", value: true, useProxy: true, labelOn: "Yes", labelOff: "No" },
        { type: "toggle", id: "clock", title: "24 Hour Clock", value: false, useProxy: true, labelOn: "Yes", labelOff: "No" },
        { type: "input", id: "hourLength", title: "Hour Length", value: 2, useProxy: true },
        { type: "input", id: "minuteLength", title: "Min Length", value: 2, useProxy: true },
        { type: "span", id: "current", value: "Pick a Time", title: "Value" }],

    datePicker: [
        { type: "input", id: "dateLength", title: "Date Length", value: 2, useProxy: true },
        { type: "select", id: "monthPattern", title: "Month Style", values: ["{month.full}", "{month.abbreviated}"], labels: ["Full", "Abbreviated"]},
        { type: "select", id: "yearPattern", title: "Year Style", values: ["{year.full}", "{year.abbreviated}"], labels: ["Full", "Abbreviated"]},
        { type: "select", id: "calendar", title: "Calendar", values: ["GregorianCalendar", "HebrewCalendar", "ThaiCalendar"], labels: ["Gregorian", "Hebrew", "Thai"]},
        { type: "span", id: "current", value: "Pick a Date", title: "Value"}],

    flyout: [
        { type: "select", id: "placement", title: "Placement", values: ["top", "bottom", "left", "right"], labels: ["Top", "Bottom", "Left", "Right"]},
        { type: "select", id: "alignment", title: "Alignment", values: ["left", "center", "right"], labels: ["Left", "Center", "Right"]},
        { type: "buttons", labels: ["Show", "Hide"] }],

    menu: [{ type: "select", id: "placement", title: "Placement", values: ["top", "bottom", "left", "right"], labels: ["Top", "Bottom", "Left", "Right"], useProxy: true},
           { type: "select", id: "alignment", title: "Alignment", values: ["left", "center", "right"], labels: ["Left", "Center", "Right"], useProxy: true}],

    messagedialog: [
            { type: "toggle", id: "delay", title: "Ignore Input", value: false, labelOn: "Yes", labelOff: "No", useProxy: true },
            { type: "toggle", id: "title", title: "Title", value: true, labelOn: "Yes", labelOff: "No", useProxy: true },
            { type: "toggle", id: "addcommands", title: "Add Commands", value: true, labelOn: "Yes", labelOff: "No", useProxy: true },
            { type: "span", id: "commandSpan", value: "<Ready>", title: "Command" }],

});

})();