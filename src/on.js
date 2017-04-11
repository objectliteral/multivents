import { isLocked } from './plugins/locking/index.js';

var on = function (scope) { // eslint-disable-line id-length

    var addEvent,
        events,
        locked;

    addEvent = scope.addEvent;
    events = scope.events;
    locked = isLocked(scope);

    return function on (type, func, ctx, async) { // eslint-disable-line id-length

        if (locked(this) || (events[type] && events[type].locked)) {
            return this;
        }

        addEvent(type).callbacks.push({
            "callbackFunction": func,
            "context": ctx,
            "silenced": false,
            "async": async === false ? -1 : async || 0
        });

        return this;

    };

};

export default on;
