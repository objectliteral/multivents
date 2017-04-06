var reset = function (scope) {

    return (function () {
        
        if (scope.isPublic === true) {
            return function () {
                return this;
            };
        } else {
            return function reset (type) {
                
                if (scope.events !== null) {
                    if (typeof type === "undefined") {
                        scope.events = { };
                    } else {
                        scope.addEvent(type, true);
                    }
                }

                return this;
                
            };
        }

    }());

};

export default reset;
