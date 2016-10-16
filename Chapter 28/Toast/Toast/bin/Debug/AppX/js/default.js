(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var wnote = Windows.UI.Notifications;
    WinJS.strictProcessing();

    var toastMessages = ["7pm Leave Office", "8pm: Meet Jacqui at Lucca's Bar",
        "9pm: Dinner at Joe's"];
    var toastImage = "/images/reminder.png";

function getTemplateContent(templateName) {
    var template = wnote.ToastTemplateType[templateName];
    return wnote.ToastNotificationManager.getTemplateContent(template);
}

function setToastLaunchValue(xml, val) {
    var attribute = xml.createAttribute("launch");
    attribute.innerText = val;
    xml.getElementsByTagName("toast")[0].attributes.setNamedItem(attribute);
}

function getToastLaunchValue(xml) {
    var attribute =
       xml.getElementsByTagName("toast")[0].attributes.getNamedItem("launch");
    return attribute ? attribute.value : null;
}

function scheduleToast(xml, time, interval, count) {
    var notification = wnote.ScheduledToastNotification(xml, time, interval, count);
    var notifier = wnote.ToastNotificationManager.createToastNotifier();
    notifier.addToSchedule(notification);
}

function setToastDuration(xml, duration) {
    var attribute = xml.createAttribute("duration");
    attribute.innerText = duration;
    xml.getElementsByTagName("toast")[0].attributes.setNamedItem(attribute);
}

function getToastSettingValueFromEnum(val) {
    for (var prop in wnote.NotificationSetting) {
        if (wnote.NotificationSetting[prop] == val) {
            return prop;
        }
    }
}

    function setToastAudio(xml, silent, sound, loop) {
        var audioElem = xml.createElement("audio");
        if (silent) {
            audioElem.setAttribute("silent", "true");
        } else {
            audioElem.setAttribute("src", sound);
            audioElem.setAttribute("loop", loop);
        }
        xml.getElementsByTagName("toast")[0].appendChild(audioElem);
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

    function showToast(xml) {
        var notification = wnote.ToastNotification(xml);
        var notifier = wnote.ToastNotificationManager.createToastNotifier();
        notifier.show(notification);
        return notification;
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {

                if (typeof args.detail.arguments == "string"
                        && args.detail.arguments.indexOf("notification") == 0) {
                    // respond to notification being activated
                }

                var notificationId = 0;

                WinJS.Utilities.query("#container > button").listen("click",
                    function (e) {
                        switch (this.id) {
                            case "toast":
                                var xml = getTemplateContent("toastImageAndText04");
                                populateTemplate(xml, toastMessages, [toastImage]);
                                setToastDuration(xml, "long");
                                setToastAudio(xml, false,
                                    "ms-winsoundevent:Notification.Reminder", false);
                                setToastLaunchValue(xml, "notification" + notificationId++);
                                var notification = showToast(xml);
                                notification.addEventListener("activated", function (e) {
                                    var id = getToastLaunchValue(e.target.content)
                                    console.log("Toast notification " + id
                                        + " was activated");
                                });
                                notification.addEventListener("dismissed", function (e) {
                                    var id = getToastLaunchValue(e.target.content);
                                    if (e.reason == wnote.ToastDismissalReason.userCanceled) {
                                        console.log("The user dismissed toast notification " + id);
                                    } else if (e.reason == wnote.ToastDismissalReason.timedOut) {
                                        console.log("Toast notification " + id + " timed out");
                                    }
                                });
                                break;
                            case "schedule":
                                var xml = getTemplateContent("toastImageAndText04");
                                populateTemplate(xml, toastMessages, [toastImage]);
                                var scheduleDate = new Date(new Date().getTime()
                                    + (10 * 1000));
                                scheduleToast(xml, scheduleDate, 60000, 2);
                                break;
                            case "check":
                                var notifier = wnote.ToastNotificationManager.createToastNotifier();
                                var value = getToastSettingValueFromEnum(notifier.setting);
                                console.log("Toast setting: " + value);
                                break;
                        }
                    });
            }));
        }
    };


    app.start();
})();
