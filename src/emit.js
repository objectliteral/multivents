var emit = function ({ channel, events, silenced }) {
    
    return function emit (type, data, async) { // eslint-disable-line no-shadow

        var asyncEvt,
            asyncScore,
            callback,
            index,
            len,
            list;

        if (silenced || (events[type] && events[type].silenced)) {
            return channel;
        }

        list = (events[type] && events[type].callbacks) || [];
        len = list.length;
        index = 0;

        asyncEvt = async === false ? -1 : async || 0;

        for (; index < len; index = index + 1) {
            callback = list[index];
            if (!callback.silenced) {
                asyncScore = callback.async + asyncEvt;
                if ((callback.async === 0 && asyncEvt === 0) || asyncScore > 0 || asyncEvt === 1) {

                    setTimeout(

                        function () {

                            this.func.apply(this.context,
                                this.data.concat([ this ])
                            );

                        }.bind({
                            "func": callback.callbackFunction,
                            "context": callback.context,
                            "name": type,
                            "channel": channel,
                            "async": true,
                            "data": data
                        }),

                    0);

                } else if (asyncScore < 0 || asyncEvt === -1) {
                    list[index].callbackFunction.apply(list[index].context,
                        data.concat([ {
                            "func": callback.callbackFunction,
                            "context": callback.context,
                            "name": type,
                            "channel": channel,
                            "async": false,
                            "data": data
                        } ])
                    );
                }
            }
        }

        return channel;

    };

};

export default emit;
