var off = function (scope) {

    return function off (type, func) {

        var events = scope.events,
            index,
            typeIndex;

        if (scope.locked === true) {
            return this;
        }

        if (scope.isPublic === false) {
            if (typeof type === "undefined") {
                for (typeIndex in events) {
                    if (events.hasOwnProperty(typeIndex)) {
                        events[typeIndex].callbacks = [];
                    }
                }
            } else if (events[type] && events[type].locked === false) {
                if (typeof func === "undefined") {
                    events[type].callbacks = [];
                } else {
                    for (index = 0; index < events[type].callbacks.length; index = index + 1) {
                        events[type].callbacks.splice(index, 1);
                    }
                }
            }

            return this;

        }

        if (typeof type !== "undefined" && events[type] && typeof func !== "undefined") {
            for (index = 0; index < events[type].callbacks.length; index = index + 1) {
                if (events[type].callbacks[index].callbackFunction === func) {
                    events[type].callbacks.splice(index, 1);
                }
            }
        }

        return this;

    };
    
};

export default off;
