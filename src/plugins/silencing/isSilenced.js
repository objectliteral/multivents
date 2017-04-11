var isSilenced = function (scope) {

    return function isSilenced (type, func) {
                
        return scope.isPublic === false && (function () {

            var callbackCount,
                channelSilenced,
                evt,
                index;

            channelSilenced = false;

            if (typeof type === "undefined" || scope.silenced) {
                channelSilenced = scope.silenced;
            } else if (scope.events[type] && (typeof func === "undefined" || scope.events[type].silenced)) {
                channelSilenced = scope.events[type].silenced;
            } else {
                evt = scope.events[type];
                if (typeof evt !== "undefined") {
                    callbackCount = evt.callbacks.length;
                    for (index = 0; index < callbackCount; index = index + 1) {
                        if (evt.callbacks[index].callbackFunction === func) {
                            channelSilenced = evt.callbacks[index].silenced;
                            break;
                        }
                    }
                }
            }

            return channelSilenced;

        }());

    };

};

export default isSilenced;
