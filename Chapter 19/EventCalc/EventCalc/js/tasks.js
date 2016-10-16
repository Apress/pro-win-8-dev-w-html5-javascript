(function () {
    WinJS.Namespace.define("Utils", {
        doWork: function (count) {
            var canceled = false;

            return new WinJS.Promise(function (fDone, fError, fProgress) {
                var blockSize = 500;

                var results = {};

                (function calcBlock(start) {
                    for (var first = start; first < start + blockSize; first++) {
                        results[first] = {};
                        for (var second = start; second < start + blockSize; second++) {
                            results[first][second] = first + second;
                        }
                    }
                    if (!canceled && start + blockSize < count) {
                        fProgress(start);
                        setImmediate(function () {
                            calcBlock(start + blockSize);
                        });
                    } else {
                        fDone(results);
                    }
                })(1);

            }, function () {
                canceled = true;
            });
        },

        doBackgroundWork: function () {
            var interval = 1000;
            var canceled = false;
            var timeoutid;

            var p = new WinJS.Promise(function (fDone, fError, fProgress) {
                var startTime = Date.now();
                function getElapsedTime() {
                    var elapsed = Date.now() - startTime;
                    if (!canceled && !p.stop) {
                        fProgress(elapsed / 1000);
                        timeoutid = setTimeout(getElapsedTime, interval);
                    } else {
                        fDone();
                    }
                };
                setImmediate(getElapsedTime);
            }, function () {
                canceled = true;
                if (timeoutid) {
                    clearTimeout(timeoutid);
                }
            });

            p.stop = false;
            return p;
        }

    });
})();
