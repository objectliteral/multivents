var unlock = function (scope) {

    return function unlock (type) {

        if (typeof type === "undefined") {
            scope.locked = false;
        } else {
            scope.addEvent(type).locked = false;
        }

        return this;

    };

};

export default unlock;
