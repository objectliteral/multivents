/* global define,module,setTimeout */

var Channel;

Channel = (function () {

    'use strict';

    var ChannelConstructor,
        channels;

    channels = { };

    /**
     * Calling the `Channel` function creates a new message channel over which messages can be sent.
     * The function adds methods to an object that allow for listening to and triggering events.
     * You can pass in an object to transform it into a message channel or a string to create a public named channel.
     */
    ChannelConstructor = function ChannelConstructor (target) { // eslint-disable-line no-shadow

        var addEvent,
            channel,
            emit,
            events,
            isPublic,
            locked,
            silenced;

        locked = silenced = false;

        addEvent = function (eventName, override) {

            if (typeof events[eventName] === "undefined" || override) {
                events[eventName] = {
                    "callbacks": [],
                    "silenced": false,
                    "locked": false
                };
            }

            return events[eventName];

        };

        /**
         * The `events` variable saves the names of registered events and associates those names
         * with arrays of callback functions to be called, when the event is triggered.
         */
        events = {};

        isPublic = typeof target === 'string';

        if (isPublic) {
            channels[target] = {};
            channel = channels[target];
        } else if (typeof target === 'object') {
            channel = target;
        } else {
            channel = this || {};
        }

        emit = function emit (type, data, async) { // eslint-disable-line no-shadow

            var asyncEvt,
                asyncScore,
                callback,
                index,
                len,
                list;

            if (silenced || (events[type] && events[type].silenced)) {
                return this;
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
                                    // [ this ].concat(this.data)
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

            return this;

        };

        Object.assign(channel, {

             /**
             * With this method you can register callbacks to be executed when a certain event is triggered.
             *
             * @param {String} The name of the event is specified by a string. It doesn't matter,
             *                 whether this event name already exists or not.
             * @param {Function} The function to be called, when the event is triggered.
             * @param {Object} Optionally, you can provide a context for the callback function.
             * @param {boolean} A preference regarding whether this callback shall the executed asynchronously.
             *                  (Not a guarantee!)
             */
            "on": function on (type, func, ctx, async) { // eslint-disable-line id-length

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

            },

            /**
             * This method does the same as `on` but it registers a callback that will only be executed once.
             *
             * @param {String} The name of the event is specified by a string. It doesn't matter,
             *                 whether this event name already exists or not.
             * @param {Function} The function to be called, when the event is triggered.
             * @param {Object} Optionally, you can provide a context for the callback function.
             * @param {boolean} A preference regarding whether this callback shall the executed
             *                  asynchronously. (Not a guarantee!)
             */
            "once": function once (type, func, ctx, async) {

                var callbackFunction,
                    called;

                called = false;

                callbackFunction = function () {
                    if (!called) {
                        func.apply(this, [].slice.call(arguments));
                        channel.off(type, callbackFunction);
                        called = true;
                    }
                };

                this.on(type, callbackFunction, ctx, async);

                return this;

            },

            /**
             * This method allows it to remove event listeners. If a reference to a function is given,
             * only that function is removed. If only the type is given, all callbacks are removed from that event.
             * If no arguments are passed, all callbacks on all events are removed.
             * On public channels, only the first option (with both a type and a function reference) is permitted.
             *
             * @param {String} Optional: The event name of the callbacks to be removed.
             * @param {Function} Optional: The callback function to be removed.
             */
            "off": function off (type, func) {

                var index,
                    typeIndex;

                if (locked === true) {
                    return this;
                }

                if (isPublic === false) {
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
                        events[type].callbacks.splice(index, 1);
                    }
                }

                return this;

            },

            /**
             * Calling this method triggers the specified event and will result in all registered callbacks being executed.
             * You should no rely on the order in which the callbacks are being invoked.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to
             *                 the callback function.
             */
            "emit": function (type) {
                return emit.call(this, type, Array.prototype.slice.call(arguments, 1));
            },

            /**
             * This method works like `emit` but guarantees synchronous execution of all callbacks for this event.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to
             *                 the callback function.
             */
            "emitSync": function (type) {
                return emit.call(this, type, Array.prototype.slice.call(arguments, 1), false);
            },

            /**
             * This method works like `emit` but guarantees asynchronous execution of all callbacks for this event.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to
             *                 the callback function.
             */
            "emitAsync": function (type) {
                return emit.call(this, type, Array.prototype.slice.call(arguments, 1), true);
            },

            /**
             * The `silence` method prevents any new messages from being sent over the message channel.
             * Affects the entire channel or specific events or even specific callbacks.
             * Does not affect public channels at all.
             *
             * @param {String} Optional: The name of the event that is meant to be silenced.
             *                 If no event type is specified, the whole channel will be silenced.
             * @param {Function} Optional: The function that is no longer to be executed when the event is triggered.
             *                   If no function is specified the whole event type will be silenced.
             */
            "silence": (function () {

                if (isPublic === true) {
                    return function () {
                        return this;
                    };
                } else {
                    return function silence (type, func) {

                        var callbackCount,
                            evt,
                            index;

                        if (typeof type === "undefined") {
                            silenced = true;

                            return this;
                        }

                        if (typeof func === "undefined") {
                            addEvent(type).silenced = true;

                            return this;
                        }

                        evt = events[type];

                        if (typeof evt !== "undefined") {
                            callbackCount = evt.callbacks.length;
                            for (index = 0; index < callbackCount; index = index + 1) {
                                if (evt.callbacks[index].callbackFunction === func) {
                                    evt.callbacks[index].silenced = true;
                                }
                            }
                        }

                        return this;

                    };
                }

            }()),

            /**
             * With this method you can enable message sending after it was disable using `silence`.
             *
             * This method does not check if the channel is public, because if it were, it could not
             * have been silenced in the first place.
             *
             * @param {String} Optional: The name of the event that is meant to be unsilenced.
             * @param {Function} Optional: The function that shall be executed again, after being silenced.
             */
            "unsilence": function unsilence (type, func) {

                var callbackCount,
                    evt,
                    index;

                if (typeof type === "undefined") {
                    silenced = false;

                    return this;
                }

                if (typeof func === "undefined") {
                    addEvent(type).silenced = false;
                    
                    return this;
                }

                evt = events[type];

                if (typeof evt !== "undefined") {
                    callbackCount = evt.callbacks.length;
                    for (index = 0; index < callbackCount; index = index + 1) {
                        if (evt.callbacks[index].callbackFunction === func) {
                            evt.callbacks[index].silenced = false;
                        }
                    }
                }

                return this;

            },

            /**
             * `Lock` prevents new callbacks from being added. Affects the entire channel or specific events.
             * Does not affect public channels at all.
             *
             * @param {String} Optional: The name of the event to which no new callbacks shall be registerd.
             *                 If no event name is specified, the whole channel will be locked.
             */
            "lock": (function () {
                
                if (isPublic === true) {
                    return function () {
                        return this;
                    };
                } else {
                    return function lock (type) {

                        if (typeof type === "undefined") {
                            locked = true;
                        } else {
                            addEvent(type).locked = true;
                        }

                        return this;

                    };
                }

            }()),

            /**
             * Unlock allows callbacks from being added to a channel after it was locked.
             *
             * This method does not check if the channel is public, because if it were, it could not
             * have been locked in the first place.
             *
             * @param {String} Optional: The name of the event that shall accept new callbacks again.
             */
            "unlock": function unlock (type) {

                if (typeof type === "undefined") {
                    locked = false;
                } else {
                    addEvent(type).locked = false;
                }

                return this;

            },

            /**
             * This lets you remove all event listeners from the message channel or from a specified event type.
             * (Also sets `silenced` and `locked` to `false`).
             *
             * @param {String} Optional: The name of the event whose callbacks shall be removed.
             *                 If no event type is given, the whole channel will be reset.
             */
            "reset": (function () {
                
                if (isPublic === true) {
                    return function () {
                        return this;
                    };
                } else {
                    return function reset (type) {
                        
                        if (events !== null) {
                            if (typeof type === "undefined") {
                                events = { };
                            } else {
                                addEvent(type, true);
                            }
                        }

                        return this;
                        
                    };
                }

            }()),

            /**
             * Returns whether the channel or an event type or a specific callback is silenced.
             *
             * @param {String} Optional: The name of the event whose status is being requested.
             *                 If no event type is specified, the whole channel's status will be returned.
             * @param {Function} Optional: The function whose status is being requested.
             *                   If no function is specified the whole event type's status will be returned.
             */
            "isSilenced": function isSilenced (type, func) {
                
                return isPublic === false && (function () {

                    var callbackCount,
                        channelSilenced,
                        evt,
                        index;

                    channelSilenced = false;

                    if (typeof type === "undefined" || silenced) {
                        channelSilenced = silenced;
                    } else if (events[type] && (typeof func === "undefined" || events[type].silenced)) {
                        channelSilenced = events[type].silenced;
                    } else {
                        evt = events[type];
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

            },

            /**
             * Returns whether the channel or an event type is locked.
             *
             * @param {String} Optional: The name of the event whose status is being requested.
             *                 If no event type is specified, the whole channel's status will be returned.
             */
            "isLocked": function isLocked (type) {
                
                return isPublic === false && (function () {

                    var channelLocked;

                    if (typeof type === "undefined" || locked) {
                        channelLocked = locked;
                    } else {
                        channelLocked = (events[type] || false) && events[type].locked;
                    }

                    return channelLocked;

                }());

            },

            /**
             * This function creates a restricted access reference to the channel.
             *
             * NOTE: Try not to use this function. Better alternatives will be integrated into the code in the future.
             *
             * @param {Array} The function that ought to be still accessible by the restricted channel.
             * @return A channel with some methods disabled.
             */
            "restrict": function (permissions, prohibitions) {

                /* eslint-disable */ 
                // this function is deprecated and thus I dont bother making it compliant with the new eslint-config

                var _channel,
                    methods,
                    that = this; // I heard, this is out of fashion now. I dont care.

                _channel = {};

                if (permissions === undefined) {
                    permissions = [];
                }

                permissions.push('isSilenced', 'isLocked', 'restrict');

                if (prohibitions === undefined) {
                    prohibitions = [];
                }

                methods = {
                    'on' : [ 'on', 'attach', 'subscribe' ],
                    'attach' : [ 'on', 'attach', 'subscribe' ],
                    'subscribe' : [ 'on', 'attach', 'subscribe' ],
                    'off' : [ 'off', 'detach', 'unsubscribe' ],
                    'detach' : [ 'off', 'detach', 'unsubscribe' ],
                    'unsubscribe' : [ 'off', 'detach', 'unsubscribe' ],
                    'emit' : [
                        'emit', 'emitSync', 'emitAsync',
                        'fire', 'fireSync', 'fireAsync',
                        'trigger', 'triggerSync', 'triggerAsync',
                        'publish', 'publishSync', 'publishAsync'
                    ],
                    'fire' : [
                        'emit', 'emitSync', 'emitAsync',
                        'fire', 'fireSync', 'fireAsync',
                        'trigger', 'triggerSync', 'triggerAsync',
                        'publish', 'publishSync', 'publishAsync'
                    ],
                    'trigger' : [
                        'emit', 'emitSync', 'emitAsync',
                        'fire', 'fireSync', 'fireAsync',
                        'trigger', 'triggerSync', 'triggerAsync',
                        'publish', 'publishSync', 'publishAsync'
                    ],
                    'publish' : [
                        'emit', 'emitSync', 'emitAsync',
                        'fire', 'fireSync', 'fireAsync',
                        'trigger', 'triggerSync', 'triggerAsync',
                        'publish', 'publishSync', 'publishAsync'
                    ],
                    'emitSync' : [ 'emitSync', 'fireSync', 'triggerSync', 'publishSync' ],
                    'fireSync' : [ 'emitSync', 'fireSync', 'triggerSync', 'publishSync' ],
                    'publishSync' : [ 'emitSync', 'fireSync', 'triggerSync', 'publishSync' ],
                    'triggerSync' : [ 'emitSync', 'fireSync', 'triggerSync', 'publishSync' ],
                    'emitAsync' : [ 'emitAsync', 'fireAsync', 'triggerAsync', 'publishAsync' ],
                    'fireAsync' : [ 'emitAsync', 'fireAsync', 'triggerAsync', 'publishAsync' ],
                    'triggerAsync' : [ 'emitAsync', 'fireAsync', 'triggerAsync', 'publishAsync' ],
                    'publishAsync' : [ 'emitAsync', 'fireAsync', 'triggerAsync', 'publishAsync' ],
                    'silence' : [ 'silence', 'unsilence' ],
                    'unsilence' : [ 'unsilence', 'silence' ],
                    'lock' : [ 'lock', 'unlock' ],
                    'unlock' : [ 'unlock', 'lock' ],
                    'isSilenced' : [ 'isSilenced' ],
                    'isLocked' : [ 'isLocked' ],
                    'restrict' : [ 'restrict' ]
                };

                permissions.forEach(function (value) {

                    if (methods[value] !== undefined) {
                        methods[value].forEach(function (_method) {
                            if (prohibitions.indexOf(_method) === -1 && that[_method] !== undefined) {
                                _channel[_method] = that[_method];
                            }
                        });
                    }

                });

                return _channel;

            }

        });

        /**
         * These aliases get added to give you the best expressability.
         * You can currently only delete them by creating a new channel and `delete channel.subscribe` etc.
         */
        channel.subscribe = channel.attach = channel.on;
        channel.unsubscribe = channel.detach = channel.off;
        channel.publish = channel.fire = channel.trigger = channel.emit;
        channel.publishSync = channel.fireSync = channel.triggerSync = channel.emitSync;
        channel.publishAsync = channel.fireAsync = channel.triggerAsync = channel.emitAsync;

        return channel;

    };

    /**
     * This method returns a named channel.
     *
     * @param {String} The name of the public channel you want to retrieve.
     * @return The public channel with the specified name
     */
    ChannelConstructor.get = function (name) {
        return channels[name];
    };

    return ChannelConstructor;

}());

// see UMD pattern at https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Channel = factory();
    }
}(this, function () {
    'use strict';
    return Channel;
}));
