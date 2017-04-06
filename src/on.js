var on = function ({ channel, events, isPublic, silenced, locked, addEvent }) { // eslint-disable-line id-length

    return function on (type, func, ctx, async) { // eslint-disable-line id-length

        if (locked || (events[type] && events[type].locked)) {
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
