(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var wnote = Windows.UI.Notifications;
    WinJS.strictProcessing();

    var textMessages = ["Today: Pick up groceries", "Tomorrow: Oil change",
                        "Wed: Book vacation", "Thu: Renew insurance", "Sat: BBQ"];

    var images = ["/images/lily.png", "/images/astor.png", "/images/carnation.png",
        "/images/daffodil.png", "/images/snowdrop.png"];

    function getTemplateContent(template) {
        return wnote.TileUpdateManager.getTemplateContent(template);
    }

    function getBadgeTemplateContent(template) {
        return wnote.BadgeUpdateManager.getTemplateContent(template);
    }

    function populateTemplate(xml, textValues, imgValues) {
        if (textValues) {
            var textNodes = xml.getElementsByTagName("text");
            var count = Math.min(textNodes.length, textValues.length);
            for (var i = 0; i < count; i++) {
                textNodes[i].innerText = textValues[i];
            }
        }
        if (imgValues) {
            var imgNodes = xml.getElementsByTagName("image");
            var count = Math.min(imgNodes.length, imgValues.length);
            for (var i = 0; i < count; i++) {
                imgNodes[i].attributes.getNamedItem("src").innerText = imgValues[i]
            }
        }
        return xml;
    }

    function populateBadgeTemplate(xml, value) {
        var badgeNode = xml.getElementsByTagName("badge")[0];
        badgeNode.attributes.getNamedItem("value").innerText = value;
        return xml;
    }

    function updateTile(xml) {
        var notification = new wnote.TileNotification(xml);
        var updater = wnote.TileUpdateManager.createTileUpdaterForApplication();
        updater.update(notification);
    }

    function updateBadge(xml) {
        var notification = new wnote.BadgeNotification(xml);
        var updater = wnote.BadgeUpdateManager.createBadgeUpdaterForApplication();
        updater.update(notification);
    }

    function combineXML(firstXml, secondXML) {
        var wideBindingElement = secondXML.getElementsByTagName("binding")[0];
        var importedNode = firstXml.importNode(wideBindingElement, true);
        var squareVisualElement = firstXml.getElementsByTagName("visual")[0];
        squareVisualElement.appendChild(importedNode);
        return firstXml;
    }

    function clearTile() {
        wnote.TileUpdateManager.createTileUpdaterForApplication().clear();
        wnote.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {
                WinJS.Utilities.query("#container > button").listen("click",
                    function (e) {
                        switch (this.id) {
                            case "basicTile":
                                var squareTemplate =
                                    wnote.TileTemplateType.tileSquarePeekImageAndText02;
                                var squareXML =
                                    populateTemplate(getTemplateContent(squareTemplate),
                                        [textMessages.length, "Reminders"], images);
                                var wideTemplate =
                                    wnote.TileTemplateType.tileWidePeekImageCollection02;
                                var wideData = textMessages.slice(0, 4)
                                wideData.unshift(textMessages.length + " Reminders");
                                var wideXml =
                                    populateTemplate(getTemplateContent(wideTemplate),
                                    wideData, images);
                                updateTile(combineXML(squareXML, wideXml));
                                break;
                            case "clearTile":
                                clearTile();
                                break;
                            case "numericBadge":
                                var template = getBadgeTemplateContent(
                                    wnote.BadgeTemplateType.badgeNumber);
                                var badgeXml = populateBadgeTemplate(template,
                                    textMessages.length);
                                updateBadge(badgeXml);
                                break;
                            case "glyphBadge":
                                var template = getBadgeTemplateContent(
                                    wnote.BadgeTemplateType.badgeGlyph);
                                var badgeXml = populateBadgeTemplate(template, "alert");
                                updateBadge(badgeXml);
                                break;
                        }
                    });
            }));
        }
    };
    app.start();
})();
