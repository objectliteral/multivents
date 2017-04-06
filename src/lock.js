var lock = function (scope) {
    
    return (function () {
        
        if (scope.isPublic === true) {
            return function () {
                return this;
            };
        } else {
            return function lock (type) {

                if (typeof type === "undefined") {
                    scope.locked = true;
                } else {
                    scope.addEvent(type).locked = true;
                }

                return this;

            };
        }

    }());

};

export default lock;
