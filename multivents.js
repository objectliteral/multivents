var Events = (function () {

    'use strict';

    var channels = { },

        isPublic = function (channel) {
            var b;
            for (b in channels) {
                if (channels[b] === channel) {
                    return true;
                }
            }
            return false;
        },

        emit,

    /**
     * Calling the `Events` function creates a new message channel over which messages can be sent.
     * The function adds methods to an object that allow for listening to and triggering events.
     * You can pass in an object to transform it into a message channel or a string to create a public named channel.
     */
        f = function Events (target) {

            var events,
                addEvent = function (name, override) {
                    if (events[name] === undefined || override) {
                        events[name] = {
                            callbacks : [],
                            silenced : false,
                            locked : false
                        };
                    }
                    return events[name];
                },
                locked = false,
                silenced = false;

            /**
             * The `events` variable saves the names of registered events and associates those names with arrays of callback functions to be called, when the event is triggered.
             */
            events = {};

            if (typeof target === 'string') {
                channels[target] = {};
                target = channels[target];
            } else if (typeof target === 'object') {
                target = target;
            } else {
                target = this || {};
            }
            
            /**
             * With this method you can register callbacks to be executed when a certain event is triggered.
             * 
             * @param {String} The name of the event is specified by a string. It doesn't matter, whether this event name already exists or not.
             * @param {Function} The function to be called, when the event is triggered.
             * @param {Object} Optionally, you can provide a context for the callback function.
             * @param {boolen} A preference regarding whether this callback shall the executed asynchronously. (Not a guarantee!)
             */
            target.on = function on (type, func, ctx, async) {

                if (locked || (events[type] && events[type].locked)) {
                    return;
                }

                addEvent(type).callbacks.push({
                    f : func,
                    context : ctx,
                    silenced : false,
                    async : async === false ? -1 : async|0
                });

            };

            target.attach = target.on;

            /**
             * This method allows it to remove event listeners. If a reference to a function is given, only that function is removed. If only the type is given, all callbacks are removed from that event. If no arguments are passed, all callbacks on all events are removed. On public channels, only the first option (with both a type and a function reference) is permitted.
             *
             * @param {String} Optional: The event name of the callbacks to be removed.
             * @param {Function} Optional: The callback function to be removed.
             */
            target.off = function off (type, func) {

                var _type,
                    i;

                if (locked === false) {
                    if (!isPublic(target)) {
                        if (type === undefined) {
                            for (_type in events) {
                                events[_type].callbacks = [];
                            }
                        } else if (events[type] && events[type].locked === false) {
                            if (func === undefined) {
                                events[type].callbacks = [];
                            } else {
                                for (i = 0; i < events[type].callbacks.length; i = i + 1) {
                                    events[type].callbacks.splice(i, 1);
                                }
                            }
                        }
                    } else {
                        if (type !== undefined) {
                            if (events[type]) {
                                if (func !== undefined) {
                                    for (i = 0; i < events[type].callbacks.length; i = i + 1) {
                                        events[type].callbacks.splice(i, 1);
                                    }
                                }
                            }
                        }
                    }
                }

            };

            target.detach = target.off;

            emit = function emit (type, data, async) {

                var args,
                    asyncScore,
                    callback,
                    list,
                    len,
                    j;

                if (silenced || (events[type] && events[type].silenced)) {
                    return;
                }

                list = (events[type] && events[type].callbacks) || [];
                len = list.length;
                j = 0;

                async = async === false ? -1 : async|0;

                for (; j < len; j = j + 1) {
                    callback = list[j];
                    if (!callback.silenced) {
                        asyncScore = callback.async + async;
                        if ( (callback.async === 0 && async === 0) || asyncScore > 0 || async === 1 ) {

                            setTimeout( 

                              (function () {

                                this.func.apply(this.context,
                                  // [ this ].concat(this.data)
                                  this.data.concat([ this ])
                                );

                              }).bind({
                                func : callback.f,
                                context : callback.context,
                                name : type,
                                channel : target,
                                async : true,
                                data : data
                              }), 

                            0);

                        } else if (asyncScore < 0 || async === -1) {
                            list[j].f.apply(list[j].context,
                              data.concat([ {
                                func : callback.f,
                                context : callback.context,
                                name : type,
                                channel : target,
                                async : false,
                                data : data
                              } ])
                            );
                        }
                    }
                }

            };

            /** 
             * Calling this method triggers the specified event and will result in all registered callbacks being executed. You should no rely on the order in which the callbacks are being invoked.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             */
            target.emit = function (type) {
                return emit(type, Array.prototype.slice.call(arguments, 1));
            };

            /** 
             * This method works like `emit` but guarantees synchronous execution of all callbacks for this event.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             */
            target.emitSync = function (type) {
                return emit(type, Array.prototype.slice.call(arguments, 1), false);
            };

            /** 
             * This method works like `emit` but guarantees asynchronous execution of all callbacks for this event.
             *
             * @param {String} The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             */
            target.emitAsync = function (type) {
                return emit(type, Array.prototype.slice.call(arguments, 1), true);
            };

            target.fire = target.trigger = target.emit;
            target.fireSync = target.triggerSync = target.emitSync;
            target.fireAsync = target.triggerAsync = target.emitAsync;

            /**
             * The `silence` method prevents any new messages from being sent over the message channel.
             *
             * @param {String} Optional: The name of the event that is meant to be silenced.
             * @param {Function} Optional: The function that shall not be executed when the event is triggered in the future.
             */
            target.silence = function silence (type, func) { 
                
                var e, i, l;

                if (isPublic(target)) {
                    return false;
                }

                if (type === undefined) {
                    silenced = true;
                    return;
                }
                
                if (func === undefined) {
                    addEvent(type).silenced = true;
                    return;
                }

                e = events[type];

                if (e !== undefined) {
                    l = e.callbacks.length;
                    for (i = 0; i < l; i = i + 1) {
                        if (e.callbacks[i].f === func) {
                            e.callbacks[i].silenced = true;
                        }
                    }
                }

            };

            /**
             * With this method you can enable message sending after it was disable using `silence`.
             *
             * @param {String} Optional: The name of the event that is meant to be unsilenced.
             * @param {Function} Optional: The function that shall be executed again, after being silenced.
             */
            target.unsilence = function unsilence (type, func) {

                var e, i, l;

                if (isPublic(target)) {
                    return false;
                }

                if (type === undefined) {
                    silenced = false;
                }

                if (func === undefined) {
                    addEvent(type).silenced = false;
                }
                
                e = events[type];

                if (e !== undefined) {
                    l = e.callbacks.length;
                    for (i = 0; i < l; i = i + 1) {
                        if (e.callbacks[i].f === func) {
                            e.callbacks[i].silenced = false;
                        }
                    }
                }
                

            };

            /**
             * `Lock` prevents new callbacks from being added. Affects the entire channel or specific events.
             *
             * @param {String} Optional: The name of the event to which no new callbacks shall be registerd.
             */
            target.lock = function lock (type) {
                if (!isPublic(target)) {
                    if (type === undefined) {
                        locked = true;
                    } else {
                        addEvent(type).locked = true;
                    }
                }
            };

            /**
             * Unlock allows callbacks from being added to a channel after it was locked.
             *
             * @param {String} Optional: The name of the event that shall accept new callbacks again.
             */
            target.unlock = function unlock (type) {
                if (!isPublic(target)) {
                    if (type === undefined) {
                        locked = false;
                    } else {
                        addEvent(type).locked = false;
                    }
                }
            };

            /**
             * This lets you remove all event listeners from the message channel or from a specified event type. (Also sets `silenced` and `locked` to `false`).
             *
             * @param {String} Optional: The name of the event whose callbacks shall be removed. If no event type is given, the whole channel will be reset.
             */
            target.reset =  function reset (type) {
                if (!isPublic(target)) {
                    if (events !== null) {
                        if (type === undefined) {
                           events = { };
                        } else {
                            addEvent(type, true);
                        }
                    }
                }
            };

            return target;

        };

    /**
     * This method returns a named channel.
     *
     * @param {String} The name of the public channel you want to retrieve.
     * @return The public channel with the specified name
     */
    f.get = function (name) {
        return channels[name];
    };

    return f;

}());

// see UMD pattern at https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(this, function () {
    return Events;
}));