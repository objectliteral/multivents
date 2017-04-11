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
import { silence, unsilence, isSilenced } from './plugins/silencing/index.js';
import { lock, unlock, isLocked } from './plugins/locking/index.js';
import reset from './reset.js';

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
        CoreChannelConstructor,
        channels;

    channels = { };

    CoreChannelConstructor = function (target) { // eslint-disable-line no-shadow

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
            }

        });

        /*
         * These aliases get added to give you the best expressability.
         * You can currently only delete them by creating a new channel and `delete channel.subscribe` etc.
         */
        /*channel.subscribe = channel.attach = channel.on;
        channel.unsubscribe = channel.detach = channel.off;
        channel.publish = channel.fire = channel.trigger = channel.emit;
        channel.publishSync = channel.fireSync = channel.triggerSync = channel.emitSync;
        channel.publishAsync = channel.fireAsync = channel.triggerAsync = channel.emitAsync;*/

        return channel;

    };

    ChannelConstructor = function (target) {

        var channel = { };
        var core = new CoreChannelConstructor(target);
        var meta = new CoreChannelConstructor();

        meta.on('emit', function () {
            core.emit.apply(this, Array.prototype.slice.call(arguments, 0, -1));
        });

        meta.on('emitAsync', function () {
            core.emitAsync.apply(this, Array.prototype.slice.call(arguments));
        });

        meta.on('emitSync', function () {
            core.emitSync.apply(this, Array.prototype.slice.call(arguments));
        });

        channel.emit = function (type) {
            return meta.emitSync.apply(this, [ 'emit', type ].concat(Array.prototype.slice.call(arguments, 1)));
        };

        channel.emitAsync = function (type) {
            return meta.emitSync.apply(this, [ 'emitAsync', type ].concat(Array.prototype.slice.call(arguments, 1)));
        };

        channel.emitSync = function (type) {
            return meta.emitSync.apply(this, [ 'emitSync', type ].concat(Array.prototype.slice.call(arguments, 1)));
        };

        channel.on = core.on;
        channel.once = core.once;
        channel.off = core.off;

        /*channel.silence = silence(scope).bind(channel);
        channel.unsilence = unsilence(scope).bind(channel);
        channel.isSilenced = isSilenced(scope).bind(channel);

        channel.lock = lock(scope).bind(channel);
        channel.unlock = unlock(scope).bind(channel);
        channel.isLocked = isLocked(scope).bind(channel);

        channel.reset = reset(scope).bind(channel);*/

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
