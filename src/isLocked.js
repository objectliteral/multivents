var isLocked = function (scope) {

    return function isLocked (type) {
        
        return scope.isPublic === false && (function () {
            
            var channelLocked;

            if (typeof type === "undefined" || scope.locked) {
                channelLocked = scope.locked;
            } else {
                channelLocked = (scope.events[type] || false) && scope.events[type].locked;
            }

            return channelLocked;

        }());

    };

};

export default isLocked;
