(function () {

var navBarCommands = [
    //{ name: "AppTest", icon: "target" },
        { name: "ToggleSwitch", icon: "\u0031" },
        { name: "Rating", icon: "\u0032" },
        { name: "Tooltip", icon: "\u0033" },
        { name: "TimePicker", icon: "\u0034" },
        { name: "DatePicker", icon: "\u0035" },
        { name: "Flyout", icon: "\u0036" },
        { name: "Menu", icon: "\u0037" },
        { name: "MessageDialog", icon: "\u0038" },
        { name: "FlipView", icon: "pictures" },
        { name: "ListView", icon: "list" },
        { name: "SemanticZoom", icon: "zoom" },
        { name: "ListContext", icon: "list" },
];

WinJS.Namespace.define("Templates", {

    generateNavBarCommands: function (navBarElement, templateElement) {
        navBarCommands.forEach(function (commandItem) {
            templateElement.winControl.render(commandItem, navBarElement);
        });
    },

    createControls: function (container, uiControl, key, proxy) {
        var promises = [];

        App.Controls[key].forEach(function (definition) {
            var targetObject = definition.useProxy ? proxy : uiControl.winControl ? uiControl.winControl : uiControl;
            promises.push(Templates["create" + definition.type](container,definition, targetObject));
        });
                
            
        return WinJS.Promise.join(promises).then(function () {
            $("*[data-win-bind]", container).forEach(function (childElem) {
                childElem.removeAttribute("data-win-bind");
            });
        });
    },

    createtoggle: function (containerElem, definition, uiControl) {
        return toggleSwitchTemplate.winControl.render(definition).then(function (newElem) {
            var toggle = newElem.children[0];
            toggle.id = definition.id;
            if (definition.labelOn != undefined) {
                toggle.winControl.labelOn = definition.labelOn;
                toggle.winControl.labelOff = definition.labelOff;
            }
            toggle.addEventListener("change", function (e) {
                setImmediate(function () {
                    uiControl[definition.id] = toggle.winControl.checked;
                });
            });
            containerElem.appendChild(newElem.removeChild(toggle));
            uiControl[definition.id] = toggle.winControl.checked;
        });
    },

    createinput: function (containerElem, definition, uiControl) {
        return inputTemplate.winControl.render(definition).then(function (newElem) {
            WinJS.Utilities.query("input", newElem).forEach(function (elem) {
                elem.id = definition.id;
                elem.addEventListener("change", function (e) {
                    setImmediate(function () {
                        uiControl[elem.id] = elem.value;
                    });
                });
                uiControl[definition.id] = elem.value;                
            });
            containerElem.appendChild(newElem.removeChild(newElem.children[0]));
        });
    },

    createselect: function (containerElem, definition, uiControl) {
        return selectTemplate.winControl.render(definition).then(function (newElem) {

            var selectElem = WinJS.Utilities.query("select", newElem)[0];
            selectElem.id = definition.id;
            definition.values.forEach(function (value, index) {
                var option = selectElem.appendChild(document.createElement("option"));
                option.innerText = definition.labels ? definition.labels[index] : value;
                option.value = value;
            });

            selectElem.addEventListener("change", function (e) {
                setImmediate(function () {
                    uiControl[definition.id] = selectElem.options[selectElem.selectedIndex].value;
                });
            });
            containerElem.appendChild(newElem.removeChild(newElem.children[0]));
            uiControl[definition.id] = selectElem.options[0].value;
        });
    },

    createspan: function (containerElem, definition, uiControl) {
        return spanTemplate.winControl.render(definition).then(function (newElem) {
            WinJS.Utilities.query("span", newElem).forEach(function (elem) {
                elem.id = definition.id;
            });
            containerElem.appendChild(newElem.removeChild(newElem.children[0]));
        });
    },

    createbuttons: function (containerElem, definition, uiControl) {
        var newDiv = containerElem.appendChild(document.createElement("div"));
        WinJS.Utilities.addClass(newDiv, "buttonContainer");
        if (definition.title) {
            var titleElem = newDiv.appendChild(document.createElement("h2"))
            titleElem.innerText = definition.title;
            WinJS.Utilities.addClass(titleElem, "controlTitle");
        }
        definition.labels.forEach(function (label) {
            var button = newDiv.appendChild(document.createElement("button"));
            button.innerText = label;
        });
    }
});

})();