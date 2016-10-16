(function () {
    var geo = Windows.Devices.Geolocation;
    var geoloc;

    var messages = new WinJS.Binding.List();
    function writeMessage(msg) {
        messages.push({ message: msg });
    }

    function getStatus(code) {
        for (var propName in geo.PositionStatus) {
            if (code == geo.PositionStatus[propName]) { return propName; }
        }
    }

    WinJS.UI.Pages.define("/pages/geolocation.html", {
        ready: function () {
            messageList.winControl.itemDataSource = messages.dataSource;

            WinJS.Utilities.query("#buttonsContainer button").listen("click",
                function (e) {
                    switch (e.target.innerText) {
                        case "Get Location":
                            getLocation();
                            break;
                        case "Start Tracking":
                            startTracking();
                            break;
                        case "Stop Tracking":
                            stopTracking();
                            break;
                    }
                });
            geoloc = new geo.Geolocator();
            writeMessage("Status: " + getStatus(geoloc.locationStatus));
            geoloc.addEventListener("statuschanged", function (e) {
                writeMessage("Status: " + getStatus(geoloc.locationStatus));
            });
        }
    });

    function getLocation() {
        geoloc.desiredAccuracy = geo.PositionAccuracy.high;
        geoloc.getGeopositionAsync().then(function (pos) {
            writeMessage("Snapshot - Lat: " + pos.coordinate.latitude
                + " Lon: " + pos.coordinate.longitude
                + " (" + pos.coordinate.timestamp.toTimeString() + ")");
        });
    }

    function startTracking() {
        geoloc.movementThreshold = 100;
        geoloc.addEventListener("positionchanged", displayLocation);
        writeMessage("Tracking started");
        start.disabled = !(stop.disabled = false);
    }

    function stopTracking() {
        geoloc.removeEventListener("positionchanged", displayLocation);
        writeMessage("Tracking stopped");
        start.disabled = !(stop.disabled = true);
    }

    function displayLocation(e) {
        writeMessage("Track - Lat: " + e.position.coordinate.latitude
            + " Lon: " + e.position.coordinate.longitude
            + " (" + e.position.coordinate.timestamp.toTimeString() + ")");

    }


})();