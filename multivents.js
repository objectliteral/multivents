/* global module,setTimeout */

/**
 * @author Peter Steinberg <objectliteral@outlook.com>
 * @summary Multifunctional Event System
 * @fileOverview This is the only source file of multivents. It includes all the functionality and API.
 */

var Channel; // eslint-disable-line no-unused-vars

/**
 * This constructor function creates a new message channel. You can invoke the constructor without passing any arguments (using the `new` keyword if you want to) and a new channel object is created for you. You can also call `Channel` as a function and pass in an object, that you want to transform into a message channel. A third option would be to pass the constructor a string, which creates a named channel.
 *
 * @param {Object} [target] An object that is to be transormed into an event channel. If no object is given, a new one is being created.
 * @exports Channel
 * @constructor
 */
Channel = function (target) {

    'use strict';

    var addEvent,
        channel,
        emit,
        events,
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
     * The `events` variable saves the names of registered events and associates those names with arrays of callback functions to be called, when the event is triggered.
     *
     * @member
     */
    events = {};

    if (typeof target === 'object') {
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
            return channel;
        }

        if (type === '*') {
            list = (Object.keys(events).reduce(
                function (callbacks, event) {
                    if (events[event] && events[event].silenced) {
                        return callbacks;
                    } else {
                        return callbacks.concat(events[event].callbacks);
                    }
                },
                [])
            ) || [];
        } else {
            list = (events[type] && events[type].callbacks) || [];
            list = list.concat(events['*'] && events['*'].callbacks || []);
        }
        
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

                            this.func.apply(null,
                                this.data.concat([ this ])
                            );

                        }.bind({
                            "func": callback.callbackFunction,
                            "name": type,
                            "channel": channel,
                            "async": true,
                            "data": data
                        }),

                        0
                    );

                } else if (asyncScore < 0 || asyncEvt === -1) {
                    list[index].callbackFunction.apply(null,
                        data.concat([ {
                            "func": callback.callbackFunction,
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

    Object.assign(channel, /** @lends Channel# */{

        /**
         * With this method you can register callbacks to be executed when a certain event is triggered. You have to pass in the event name and the callback function, but you can optionally provide a third argument. This third argument should be an object which is then used as the callback function's `this` (context injection). The fourth parameter of the `on` function is a boolean that gives a preference on whether the callback function shall be executed asynchronously. Note, however, that asynchronous execution is not guarenteed.
         *
         * @param {String} type The name of the event is specified by a string. It doesn't matter,
         *                 whether this event name already exists or not.
         * @param {Function} func The function to be called, when the event is triggered.
         * @param {boolean} [async] A preference regarding whether this callback shall the executed asynchronously. (Not a guarantee!)
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "on": function on (type, func, async) { // eslint-disable-line id-length

            if (locked || (events[type] && events[type].locked)) {
                return this;
            }

            if (typeof type !== 'string' || typeof type === 'string' && (!type.match(/^[a-zA-Z_#][a-zA-Z0-9_-]*$/) && type !== '*')) {
                return this;
            }

            addEvent(type).callbacks.push({
                "callbackFunction": func,
                "silenced": false,
                "async": async === false ? -1 : async || 0
            });

            return this;

        },

        /**
         * This method does the same as `on` but it registers a callback that will only be executed once.
         *
         * @param {String} type The name of the event is specified by a string. It doesn't matter,  whether this event name already exists or not.
         * @param {Function} func The function to be called, when the event is triggered.
         * @param {boolean} [async] A preference regarding whether this callback shall the executed asynchronously. (Not a guarantee!)
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "once": function once (type, func, async) {

            var callbackFunction,
                called;

            called = false;

            callbackFunction = function () {
                if (!called) {
                    // I explicitly want to say, that disabling this rule is fine here, because I am sure, that the correct binding of 'this' gets taken care of!
                    func.apply(this, [].slice.call(arguments)); // eslint-disable-line no-invalid-this
                    channel.off(type, callbackFunction);
                    called = true;
                }
            };

            this.on(type, callbackFunction, async);

            return this;

        },

        /**
         * Removes event listeners. Functions will no longer be invoked when the specified event is triggered. You can pass in the event name and a function reference to remove a specific function. If you just provide the first parameter, all callbacks for the given event type are removed. You can remove all event handlers from all events on this channel, by calling `off` without any arguments.
         *
         * @param {String} [type] The event name of the callbacks to be removed.
         * @param {Function} [func] The callback function to be removed.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "off": function off (type, func) {

            var index,
                typeIndex;

            if (locked === true || type === '*') {
                return this;
            }

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
                        if (events[type].callbacks[index].callbackFunction === func) {
                            events[type].callbacks.splice(index, 1);
                            index = index - 1;
                        }
                    }
                }
            }

            return this;

        },

        /**
         * Calling this method triggers the specified event and will result in all registered callbacks being executed. All arguments that get passed to `emit` after the event name are provided as arguments to each callback function.
         * You should not rely on the order in which the callbacks are being invoked.
         *
         * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "emit": function (type) {
            return emit.call(this, type, Array.prototype.slice.call(arguments, 1));
        },

        /**
         * This method works like `emit` but guarantees synchronous execution of all callbacks for this event.
         *
         * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "emitSync": function (type) {
            return emit.call(this, type, Array.prototype.slice.call(arguments, 1), false);
        },

        /**
         * This method works like `emit` but guarantees asynchronous execution of all callbacks for this event.
         *
         * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "emitAsync": function (type) {
            return emit.call(this, type, Array.prototype.slice.call(arguments, 1), true);
        },

        /**
         * The `silence` method prevents any new messages from being sent over the message channel. Affects the entire channel or specific events or even specific callbacks.
         *
         * @method
         * @param {String} [type] The name of the event that is meant to be silenced. If no event type is specified, the whole channel will be silenced.
         * @param {Function} [func] The function that is no longer to be executed when the event is triggered. If no function is specified, the whole event type will be silenced.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "silence": function silence (type, func) {

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

        },

        /**
         * With this method you can enable message sending after it was disable using `silence`.
         * If you unsilence a single event, but the entire channel is still silenced, triggering the event will still have no effect.
         * Unsilencing a channel that was not silenced does not throw but instead just does nothing.
         *
         * @param {String} [type] The name of the event that is meant to be unsilenced. If no event type is given, the whole channel well be unlocked.
         * @param {Function} [func] The function that shall be executed again, after being silenced. If no function is given, the whole event type will be unsilenced.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
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
         * `Lock` prevents new callbacks from being registered. Similar to silencing, you can either lock an entire channel by calling `lock` with no arguments or lock a single event type by providing `lock` with that event's type.
         *
         * @method
         * @param {String} [type] The name of the event to which no new callbacks shall be registerd. If no event name is specified, the whole channel will be locked.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "lock": function lock (type) {

            if (typeof type === "undefined") {
                locked = true;
            } else {
                addEvent(type).locked = true;
            }

            return this;

        },

        /**
         * `Unlock` allows callbacks from being added to a channel after it was locked. You can unlock a locked channel or just a single event type by using the optional parameter.
         * Unlocking a channel that was already unlocked does not throw but instead just does nothing.
         *
         * @param {String} [type] The name of the event that shall accept new callbacks again. If no event type is given, the whole channel will be unlocked.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
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
         * @param {String} [type] Optional: The name of the event whose callbacks shall be removed. If no event type is given, the whole channel will be reset.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "reset": function reset (type) {
                    
            if (events !== null) {
                if (typeof type === "undefined") {
                    events = { };
                } else {
                    addEvent(type, true);
                }
            }

            return this;
            
        },

        /**
         * Returns whether the channel or an event type or a specific callback is silenced.
         *
         * @param {String} [type] Optional: The name of the event whose status is being requested.
         *                 If no event type is specified, the whole channel's status will be returned.
         * @param {Function} [func] Optional: The function whose status is being requested.
         *                   If no function is specified the whole event type's status will be returned.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "isSilenced": function isSilenced (type, func) {

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

        },

        /**
         * Returns whether the channel or a specifc event type on this channel is locked.
         *
         * @param {String} [type] Optional: The name of the event whose status is being requested. If no event type is specified, the whole channel's status will be returned.
         * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
         */
        "isLocked": function isLocked (type) {

            var channelLocked;

            if (typeof type === "undefined" || locked) {
                channelLocked = locked;
            } else {
                channelLocked = (events[type] || false) && events[type].locked;
            }

            return channelLocked;

        }

    });

    return channel;

};
