var silence = function (scope) {
    
    return (function () {

        if (scope.isPublic === true) {
            return function () {
                return this;
            };
        } else {
            return function silence (type, func) {

                var callbackCount,
                    evt,
                    index;

                if (typeof type === "undefined") {
                    scope.silenced = true;

                    return this;
                }

                if (typeof func === "undefined") {
                    scope.addEvent(type).silenced = true;

                    return this;
                }

                evt = scope.events[type];

                if (typeof evt !== "undefined") {
                    callbackCount = evt.callbacks.length;
                    for (index = 0; index < callbackCount; index = index + 1) {
                        if (evt.callbacks[index].callbackFunction === func) {
                            evt.callbacks[index].silenced = true;
                        }
                    }
                }

                return this;

            };
        }

    }());

};

export default silence;
