(function () {
    "use strict";

    var wnote = Windows.UI.Notifications;

    WinJS.Namespace.define("Toast", {

        getTemplateContent: function (templateName) {
            var template = wnote.ToastTemplateType[templateName];
            return wnote.ToastNotificationManager.getTemplateContent(template);
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

        showToast: function (xml) {
            var notification = wnote.ToastNotification(xml);
            var notifier = wnote.ToastNotificationManager.createToastNotifier();
            notifier.show(notification);
            return notification;
        }

    });
})();
