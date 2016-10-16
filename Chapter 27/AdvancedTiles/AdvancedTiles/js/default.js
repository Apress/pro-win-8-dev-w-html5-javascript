(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var wnote = Windows.UI.Notifications;
    WinJS.strictProcessing();

    var dataObjects = [
        { name: "Projects", quant: 6, key: "projects" },
        { name: "Clients", quant: 2, key: "clients" },
        { name: "Milestones", quant: 4, key: "milestones" }];

    function getValueFromEnum(val) {
        for (var prop in wnote.NotificationSetting) {
            if (wnote.NotificationSetting[prop] == val) {
                return prop;
            }
        }
    }

    function updateTileQueue(xml, tag) {
        var notification = new wnote.TileNotification(xml);
        notification.tag = tag;
        var updater = wnote.TileUpdateManager.createTileUpdaterForApplication();
        updater.update(notification);
    }

    function scheduleTileQueue(xml, tag, start, end) {
        var notification = new wnote.ScheduledTileNotification(xml, start);
        notification.tag = tag;
        notification.expirationTime = end;
        var updater = wnote.TileUpdateManager.createTileUpdaterForApplication();
        updater.addToSchedule(notification);
    }

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(function () {

                wnote.TileUpdateManager.createTileUpdaterForApplication()
                        .enableNotificationQueue(true);

                WinJS.Utilities.query("#container > button").listen("click",
                    function (e) {
                        switch (this.id) {
                            case "clear":
                                Tiles.clearTile();
                                break;
                            case "multiple":
                                dataObjects.forEach(function (item) {
                                    var xml = Tiles.getTemplateContent(
                                        wnote.TileTemplateType.tileSquareBlock);
                                    Tiles.populateTemplate(xml, [item.quant, item.name]);
                                    updateTileQueue(xml, item.key);
                                });
                                break;
                            case "update":
                                var dob = dataObjects[1];
                                dob.quant++;
                                var xml = Tiles.getTemplateContent(
                                    wnote.TileTemplateType.tileSquareBlock);
                                Tiles.populateTemplate(xml, [dob.quant, dob.name]);
                                updateTileQueue(xml, dob.key);
                                break;
                            case "schedule":
                                var xml = Tiles.getTemplateContent(
                                    wnote.TileTemplateType.tileSquareBlock);
                                Tiles.populateTemplate(xml, [10, "Days Left"]);
                                var start = new Date(new Date().getTime() + (20 * 1000));
                                var end = new Date(start.getTime() + (30 * 1000));
                                scheduleTileQueue(xml, "daysleft", start, end);
                                break;
                            case "check":
                                var setting =
                                    wnote.TileUpdateManager.
                                    createTileUpdaterForApplication().setting;
                                console.log("Live tile updates are " +
                                    getValueFromEnum(setting));

                        }
                    });
            }));
        }
    };
    app.start();
})();
