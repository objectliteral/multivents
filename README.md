<h1 align="center">
    <br />
    <img src="./logo.PNG" width="300" />
    <br />
    <br />
</h1>

[![Build Status](https://img.shields.io/travis/objectliteral/multivents/master.svg?style=flat-square)](https://travis-ci.org/objectliteral/multivents) [![Coverage](https://img.shields.io/coveralls/objectliteral/multivents/master.svg?style=flat-square)](https://coveralls.io/github/objectliteral/multivents) [![Dependencies](https://david-dm.org/objectliteral/multivents/status.svg?style=flat-square)](https://david-dm.org/objectliteral/multivents) [![DevDependencies](https://david-dm.org/objectliteral/multivents/dev-status.svg?style=flat-square)](https://david-dm.org/objectliteral/multivents?type=dev)

 **multivents** is a small pub-sub library. It allows you to create event channels, send (asynchronous) events over those channels and subscribe to events.

## Quick Start

If you want to get started quickly, here is a basic example of how to use **multivents**:

```javascript
var Channel = require('multivents');

var myChannel = new Channel();

myChannel.on('greet', function (who) {
    console.log('hello ' + who);
});

myChannel.emit('greet', 'world'); // 'hello world'
```

If that's all you wanted to know, great! It's probably more than 90% of what you need this library for. If not, you may read on to find out more.

## Installation

There's not really anything to install. If you want to use **multivents** in your project, include [multivents.js](https://raw.githubusercontent.com/objectliteral/multivents/master/multivents.js) and use it like described below.

**multivents** supports both CommonJS-style environments as well as AMD. You can install it via npm:

```
npm install --save multivents
```

If you want to extend **multivents** to your needs you might want to run tests. In order to do this, you can clone this repository and run `npm install` and `npm test`. Tests are written with [assert](https://github.com/defunctzombie/commonjs-assert) and run with [mocha](https://mochajs.org/) ([gulp-mocha](https://github.com/sindresorhus/gulp-mocha)).

## Terminology and Concept

This library implements so called *message channels* or *event channels*. A channel is a communication device that has events associated with it. When a message is sent over a message channel, all callback functions registered for that specific message will be executed.

The following documentation uses the terms *event* and *message* synonymously as well as event *name* and event *type*. *Listening for an event* or *adding a callback* is the process that registers a function to be executed when an event is *emitted* / *triggered* / *fired* i.e. a message is being *sent*.

## Example Code

### Basic usage

First, you want to include **multivents** in your project. If you are writing for nodejs, you would `npm install multivents` and then in your project:

```javascript
var Channel = require('multivents');
```

Now we can use *multivents*, to create a message channel using the `Channel` constructor (here in conjunction with the `new` keyword).

```javascript
var channel = new Channel();
```

The new channel provides the `on` method that allows you to specify an event name and a function that is meant to be executed in case the given event is triggered.

```javascript
channel.on('ping', function () {
    console.log('ping event fired!');
});
```

Your function can also have parameters.

```javascript
var greet = function (who) {
    console.log('hello' + who);
};
channel.on('ping', greet);
```

You can trigger an event using the channel's `emit` method and optionally provide additional arguments that will be passed on to the callback.

```javascript
channel.emit('ping', 'world');
 // 'ping event fired!'
 // 'hello world'
```

When you want to remove a callback function, you can detach it from the event by using the `off` message and specifying the event and the function you want to detach.

```javascript
channel.off('ping', greet);
```

Now, when you fire the event again, the `greet` function will no longer be invoked.

```javascript
channel.emit('event'); // 'ping event fired!'
```

### Context injection

When registering a callback, you can specify the context in which the callback function will be executed.

```javascript
var channel = new Channel();
var bob = { name : 'Bob' };
channel.on('greet', function () {
    console.log('Hello, I\'m ' + this.name + '!');
}, bob);
channel.emit('greet'); // 'Hello, I'm Bob!'
```

The `bob` object is used as the callback's `this` as it was provided to the `on` call as the third argument.

### Silencing and locking

Let's start again by creating a new event channel.

```javascript
var channel = Channel({});
```

Remember that the `Channel` constructor can be passed an object to be transformed into a message channel. We now create two events and register callback functions to them.

```javascript
channel.on('ping', function () {
    console.log('ping event fired');
});
channel.on('pong', function () {
    console.log('pong event fired');
});
```

When a channel is silenced, none of its events can be triggered. Notice though, that **multivents** will not throw any exceptions.

```javascript
channel.silence();
channel.emit('ping'); // [nothing happens]
channel.emit('pong'); // [nothing happens]
```

Let's now unsilence the channel and silence just the `pong` event.

```javascript
channel.unsilence();
channel.silence('pong');
channel.emit('pong'); // [nothing happens]
channel.emit('ping'); // 'ping event fired'
```

When a channel is silenced, you can still attach new event listeners. That's not the case, when the channel is locked.

```javascript
channel.silence();
channel.on('peng', function () {
    console.log('peng event fired');
});
channel.unsilence();
channel.emit('peng'); // 'peng event fired'
channel.lock();
channel.on('pung', function () {
    console.log('pung event fire');
});
channel.emit('pung'); // [nothing happens]
channel.emit('peng'); // 'peng event fired'
```

You can see, that attaching a new event listener when the channel was locked had no effect. You can also lock a single event.

## Asynchronous Callback Execution

By default, **multivents** calls event handler functions asynchronously.

In some cases you might want to declare a callback that is explicitly meant to be invoked synchronously. You can do that with a fourth argument in  the `on` function.

```javascript
channel.on('ping', f, null, false);
```

Above you can see a callback registration that declares the callback's preference to be executed synchronously.

You can also emit an event with a preference to have its callbacks be executed synchronously.

```javascript
channel.emitSync('ping');
```

If neither the callback registration code nor the event emitter make any statement on how callback execution should be handled, **multivents** does it asynchronously. If one part (`emit` or `on`) states a preference and the other one doesn't, the preference will be respected. If both have the same preference, well, that's what we're doing. If there is a conflict, the emitter wins. So basically, if you use the `emitSync` or `emitAsync` method, the according execution style is guaranteed. E.g. in the following case:

```javascript
channel.on('ping', f, null, false); // [`f` wants to be called synchronously]
channel.emitAsync('ping'); // [`emitAsync` guarantees asynchronous execution]
```

the callback will be executed asynchronously, because the `emitAsync` method was used and is stronger than the async flag in the `on` call.

## Named Event channels

When you call the `Channel` constructor and pass it a string value, you create a *named channel* or *public channel* (which are two terms for the same thing). Because it has a name, such an event channel is "public" and can be retrieved via its name. **multivents** contains a closure that keeps track of all named channels and allows you to retrieve them using the `Channel` constructor's `get` method.

```javascript
Channel('myEventchannel');
var b = Channel.get('myEventchannel'); // [b now contains an event channel]
```

Why? Well, unnamed channels have to be passed around in order to connect separate parts of an application. If you don't want to do that, you can use public channels.

Because every part of your application will have access to public channels, they and their events can not be silenced or locked.

## License

The MIT License (MIT)

Copyright © 2014-2017 Peter Steinberg

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
