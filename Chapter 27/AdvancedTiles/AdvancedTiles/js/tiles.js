(function () {

    var wnote = Windows.UI.Notifications;

    WinJS.Namespace.define("Tiles", {
        getTemplateContent: function (template) {
            return wnote.TileUpdateManager.getTemplateContent(template);
        },
        getBadgeTemplateContent: function (template) {
            return wnote.BadgeUpdateManager.getTemplateContent(template);
        },
        populateTemplate: function (xml, textValues, imgValues) {
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
        },
        populateBadgeTemplate: function (xml, value) {
            var badgeNode = xml.getElementsByTagName("badge")[0];
            badgeNode.attributes.getNamedItem("value").innerText = value;
            return xml;
        },
        updateTile: function (xml) {
            var notification = new wnote.TileNotification(xml);
            var updater = wnote.TileUpdateManager.createTileUpdaterForApplication();
            updater.update(notification);
        },
        updateBadge: function (xml) {
            var notification = new wnote.BadgeNotification(xml);
            var updater = wnote.BadgeUpdateManager.createBadgeUpdaterForApplication();
            updater.update(notification);
        },
        combineXML: function (firstXml, secondXML) {
            var wideBindingElement = secondXML.getElementsByTagName("binding")[0];
            var importedNode = firstXml.importNode(wideBindingElement, true);
            var squareVisualElement = firstXml.getElementsByTagName("visual")[0];
            squareVisualElement.appendChild(importedNode);
            return firstXml;
        },
        clearTile: function () {
            wnote.TileUpdateManager.createTileUpdaterForApplication().clear();
            wnote.BadgeUpdateManager.createBadgeUpdaterForApplication().clear();
        }
    });
})();