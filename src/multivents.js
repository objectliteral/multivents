/* global module,setTimeout */

/**
 * @author Peter Steinberg <objectliteral@outlook.com>
 * @summary Multifunctional Event System
 * @fileOverview This is the only source file of multivents. It includes all the functionality and API.
 */

import emit from './emit.js';
import on from './on.js';
import once from './once.js';
import off from './off.js';
import silence from './silence.js';
import unsilence from './unsilence.js';
import lock from './lock.js';
import unlock from './unlock.js';

var Channel;

/**
 * This constructor function creates a new message channel. You can invoke the constructor without passing any arguments (using the `new` keyword if you want to) and a new channel object is created for you. You can also call `Channel` as a function and pass in an object, that you want to transform into a message channel. A third option would be to pass the constructor a string, which creates a named channel.
 *
 * @param {Object} [target] An object that is to be transormed into an event channel. If no object is given, a new one is being created.
 * @exports Channel
 * @constructor
 */
Channel = (function () {

    'use strict';

    var ChannelConstructor,
        channels;

    channels = { };

    /**
     * @alias Channel
     */
    ChannelConstructor = function ChannelConstructor (target) { // eslint-disable-line no-shadow

        var addEvent,
            channel,
            _emit,
            events,
            isPublic,
            locked,
            scope,
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

        isPublic = typeof target === 'string';

        if (isPublic) {
            channels[target] = {};
            channel = channels[target];
        } else if (typeof target === 'object') {
            channel = target;
        } else {
            channel = this || {};
        }

        scope = { channel, events, isPublic, silenced, locked, addEvent };

        _emit = emit(scope);

        Object.assign(channel, /** @lends Channel# */{

             /**
             * With this method you can register callbacks to be executed when a certain event is triggered. You have to pass in the event name and the callback function, but you can optionally provide a third argument. This third argument should be an object which is then used as the callback function's `this` (context injection). The fourth parameter of the `on` function is a boolean that gives a preference on whether the callback function shall be executed asynchronously. Note, however, that asynchronous execution is not guarenteed.
             *
             * @param {String} type The name of the event is specified by a string. It doesn't matter,
             *                 whether this event name already exists or not.
             * @param {Function} func The function to be called, when the event is triggered.
             * @param {Object} [ctx] The context for the callback function execution. If you pass in an object it will be used as the callback's `this`.
             * @param {boolean} [async] A preference regarding whether this callback shall the executed asynchronously. (Not a guarantee!)
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "on": on(scope),

            /**
             * This method does the same as `on` but it registers a callback that will only be executed once.
             *
             * @param {String} type The name of the event is specified by a string. It doesn't matter,  whether this event name already exists or not.
             * @param {Function} func The function to be called, when the event is triggered.
             * @param {Object} [ctx] The context for the callback function execution. If you pass in an object it will be used as the callback's `this`.
             * @param {boolean} [async] A preference regarding whether this callback shall the executed asynchronously. (Not a guarantee!)
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "once": once(scope),

            /**
             * Removes event listeners. Functions will no longer be invoked when the specified event is triggered. You can pass in the event name and a function reference to remove a specific function. If you just provide the first parameter, all callbacks for the given event type are removed. You can remove all event handlers from all events on this channel, by calling `off` without any arguments.
             * On public channels, only the first option (with both a type and a function reference) is permitted.
             *
             * @param {String} [type] The event name of the callbacks to be removed.
             * @param {Function} [func] The callback function to be removed.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "off": off(scope),

            /**
             * Calling this method triggers the specified event and will result in all registered callbacks being executed. All arguments that get passed to `emit` after the event name are provided as arguments to each callback function.
             * You should not rely on the order in which the callbacks are being invoked.
             *
             * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "emit": function (type) {
                return _emit.call(this, type, Array.prototype.slice.call(arguments, 1));
            },

            /**
             * This method works like `emit` but guarantees synchronous execution of all callbacks for this event.
             *
             * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "emitSync": function (type) {
                return _emit.call(this, type, Array.prototype.slice.call(arguments, 1), false);
            },

            /**
             * This method works like `emit` but guarantees asynchronous execution of all callbacks for this event.
             *
             * @param {String} type The name of the event to be triggered. Any additional arguments will be passed to the callback function.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "emitAsync": function (type) {
                return _emit.call(this, type, Array.prototype.slice.call(arguments, 1), true);
            },

            /**
             * The `silence` method prevents any new messages from being sent over the message channel. Affects the entire channel or specific events or even specific callbacks.
             * Does not affect public channels at all.
             *
             * @method
             * @param {String} [type] The name of the event that is meant to be silenced. If no event type is specified, the whole channel will be silenced.
             * @param {Function} [func] The function that is no longer to be executed when the event is triggered. If no function is specified, the whole event type will be silenced.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "silence": silence(scope),

            /**
             * With this method you can enable message sending after it was disable using `silence`.
             * If you unsilence a single event, but the entire channel is still silenced, triggering the event will still have no effect.
             * This method does not check if the channel is public, because if it were, it could not have been silenced in the first place.
             * Unsilencing a channel that was not silenced does not throw but instead just does nothing.
             *
             * @param {String} [type] The name of the event that is meant to be unsilenced. If no event type is given, the whole channel well be unlocked.
             * @param {Function} [func] The function that shall be executed again, after being silenced. If no function is given, the whole event type will be unsilenced.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "unsilence": unsilence(scope),

            /**
             * `Lock` prevents new callbacks from being registered. Similar to silencing, you can either lock an entire channel by calling `lock` with no arguments or lock a single event type by providing `lock` with that event's type.
             * Does not affect public channels at all.
             *
             * @method
             * @param {String} [type] The name of the event to which no new callbacks shall be registerd. If no event name is specified, the whole channel will be locked.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "lock": lock(scope),

            /**
             * `Unlock` allows callbacks from being added to a channel after it was locked. You can unlock a locked channel or just a single event type by using the optional parameter.
             * This method does not check if the channel is public, because if it were, it could not have been locked in the first place.
             * Unlocking a channel that was already unlocked does not throw but instead just does nothing.
             *
             * @param {String} [type] The name of the event that shall accept new callbacks again. If no event type is given, the whole channel will be unlocked.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "unlock": unlock(scope),

            /**
             * This lets you remove all event listeners from the message channel or from a specified event type.
             * (Also sets `silenced` and `locked` to `false`).
             *
             * @param {String} [type] Optional: The name of the event whose callbacks shall be removed. If no event type is given, the whole channel will be reset.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
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
             * @param {String} [type] Optional: The name of the event whose status is being requested.
             *                 If no event type is specified, the whole channel's status will be returned.
             * @param {Function} [func] Optional: The function whose status is being requested.
             *                   If no function is specified the whole event type's status will be returned.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "isSilenced": function isSilenced (type, func) {
                
                return isPublic === false && (function () {

                    var callbackCount,
                        channelSilenced,
                        evt,
                        index;

                    channelSilenced = false;

                    if (typeof type === "undefined" || scope.silenced) {
                        channelSilenced = scope.silenced;
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
             * Returns whether the channel or a specifc event type on this channel is locked.
             *
             * @param {String} [type] Optional: The name of the event whose status is being requested. If no event type is specified, the whole channel's status will be returned.
             * @returns {Object} The channel object. Or rather: 'this'. So be careful with rebinding 'this'.
             */
            "isLocked": function isLocked (type) {
                
                return isPublic === false && (function () {
                    
                    var channelLocked;

                    if (typeof type === "undefined" || scope.locked) {
                        channelLocked = scope.locked;
                    } else {
                        channelLocked = (events[type] || false) && events[type].locked;
                    }

                    return channelLocked;

                }());

            }

        });

        /*
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
     * @returns The public channel with the specified name
     */
    ChannelConstructor.get = function (name) {
        return channels[name];
    };

    return ChannelConstructor;

}());

export default Channel;
