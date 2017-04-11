var unsilence = function (scope) {
    
    return function unsilence (type, func) {

        var callbackCount,
            evt,
            index;

        if (typeof type === "undefined") {
            scope.silenced = false;

            return this;
        }

        if (typeof func === "undefined") {
            scope.addEvent(type).silenced = false;
            
            return this;
        }

        evt = scope.events[type];

        if (typeof evt !== "undefined") {
            callbackCount = evt.callbacks.length;
            for (index = 0; index < callbackCount; index = index + 1) {
                if (evt.callbacks[index].callbackFunction === func) {
                    evt.callbacks[index].silenced = false;
                }
            }
        }

        return this;

    };

};

export default unsilence;
