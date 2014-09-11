# *multivents*

*multivents* is a small library that allows you to create message channels, send messages over those channels and subscribe to messages.

## Quick Start

If you want to get started quickly, here is a basic example of how to use *multivents*:

```javascript
var Channel = require('multivents');

var channel = new Channel();

channel.on('greet', function (who) {
    console.log('hello ' + who);
});

channel.emit('greet', 'world'); // 'hello world'
```

If that's all you wanted to know, great! If not, you may read on to find out more.

## Installation

There's not really anything to install. If you want to use *multivents* in your project, include `multivents.js` or `multivents.min.js` and use it like described below.

If you want to extend *multivents* to your needs you might want to run tests. In order to do this, you can clone this repository and run `npm install` and `gulp test`. Tests are written with [assert](https://github.com/defunctzombie/commonjs-assert) and run with [mocha](http://visionmedia.github.io/mocha/) ([gulp-mocha](https://github.com/sindresorhus/gulp-mocha)).

## Terminology and Concept

This library has the concept of so called *message channels* or *event channels*. A channel is a communication device that has events associated with it. When a message is sent over a message channel, all callback functions registered for that specific message will be executed.

The following documentation uses the terms *event* and *message* synonymously as well as event *name* and event *type*. *Listening for an event* or *adding a callback* is the process that registers a function to be executed when an event is *emitted* / *triggered* / *fired* i.e. a message is being *sent*.

## How to use / API

`Channel` : This constructor function creates a new message channel. You can invoke the constructor without passing any arguments (using the `new` keyword if you want to) and a new channel object is created for you. You can also call `Channel` as a function and pass in an object, that you want to transform into a message channel. A third option would be to pass the constructor a string, which creates a named channel. You can read more on the semantics of named channels [down below](#named-event-channels). A channel provides a handful of methods that are discussed below.

`on`: With this method you can register callbacks to be executed when a certain event is triggered. You have to pass in the event name and the callback function, but you can optionally provide a third argument. This third argument should be an object which is then used as the callback function's `this` (context injection). The fourth parameter of the `on` function is a boolean that gives a preference on whether the callback function shall be executed asynchronously. Note, however, that asynchronous execution is not guarenteed; read why [in this paragraph](#asynchronous-callback-execution).

`function on ( /* String */ type, /* Function */ callback, /* Object */ context ?, /* boolean*/ async? )`

`attach`: Alias for `on`.
    
`off` : Removes event listeners. Functions will no longer be invoked when the specified event is triggered. You can pass in the event name and a function reference to remove a specific function. If you just provide the first parameter, all callbacks for the given event type are removed. You can remove all event handlers from all events on this channel, by calling `off` without any arguments.

`function off ( /* String */ type ?, /* Function */ callback ? )`

`detach`: Alias for `off`.

`emit`: Calling this method triggers the specified event and will result in all registered callbacks being executed. All arguments that get passed to the `emit` are provided to the callback function as arguments.

`function emit ( /* String */ type, ... )`

`trigger`, `fire`: Aliases for `emit`

Those are the most important functions provided by *multivents*. If you want to get started now, skip on to the [example code](#example-code).

---

`silence`: This method prevents callbacks from being executed. You can use `silence` on different things depending on the arguments you provide. If you call it without any arguments, the whole message channel is silenced and emitting events on this channel won't work. If you call `silence` with one argument, you can specify an event that should no longer be emittable, while all other events on this channel will still work fine. If you call `silence` with two arguments, you can silence one specific callback function from executing. When the according event is triggered, all of its other callbacks are still being invoked, except the one you silenced.

`function silence ( /* String */ type ?, /* Function */ funct ? )`

`unsilence`: After having silenced an event channel or an event or a single callback function, you can unsilence it with `unsilence`. If you unsilence a single event, but the entire channel is still silenced, triggering the event will still have no effect.

`function unsilence ( /* String */ type ?, /* Function */ funct ? )`

> Silencing and locking have similar semantics. They give you the flexibility to target an entire channel or a specific event. Their effects work top-down meaning that, if a channel is silenced but an event is not, you cannot trigger this event. Here, the channel' silencing/locking state is more important than the one of single events.

`lock`: Locking means preventing new callbacks from being registered. Similar to silencing, you can lock an entire channel and prohibiting any callbacks from being registered to it, you can also lock a single event. You can call `lock` with no arguments (locking the entire channel) or with a string argument, specifying the event you want to lock.

`function lock ( /* String */ type ? )`

`unlock`: Unlocking a channel or an event allows new callbacks to be attached to it. You can unlock a locked channel or just a single event by using the optional paramter.

`function unlock ( /* String */ type ? )`

`reset`: This method lets you remove all callbacks from an event or even all callbacks of all events on an entire channel. If you call this function without any arguments, you reset the whole channel. Note, that `reset` also unsilences and unlocks an event.

`function reset ( /* String */ type ? )`

## Example Code

### Basic usage

First, you want to include *multivents* in your project. If you are writing for nodejs, you would `npm install multivents` and then in your project:

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

You can trigger an event using the channel' `emit` method and optionally provide additional arguments that will be passed on to the callback.

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
channel.emit('greet');
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

When a channel is silenced, none of its events can be triggered. Notice though, that *multivents* will not throw any exceptions.

```javascript
channel.silence();
channel.emit('ping'); [nothing happens]
channel.emit('pong'); [nothing happens]
```

Let's now unsilence the channel and silence just the `pong` event.

```javascript
channel.unsilence();
channel.silence('pong');
channel.emit('pong'); // [nothing happens]
channel.emit('ping'); 'ping event fired'
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

By default, *multivents* calls event handler functions asynchronously.

In some rare cases, you might want to declare a callback that should explicitly be called synchronously. You can do that with a fourth argument in  the `on` function.

```javascript
channel.on('ping', f, null, false);
```

Above you can see a callback registration that declares the callback's preference to be executed synchronously.

You can also emit an event, specifying its preference to call its callbacks synchronously.

```javascript
channel.emitSync('ping');
```

As said before, if neither the callback registration code nor the event emitter make any statement on how callback execution should be handled, *multivents* does it asynchronously. If one party states a preference and the other one doesn't, the one who aired his opinion gets his will. If both have the same preference, well, that's what we're doing. If there is a conflict, the emitter wins. So basically, if you use the `emitSync` or `emitAsync` method the according execution style is guaranteed. E.g. in the following case:

```javascript
channel.on('ping', f, null, false); // [`f` wants to be called asynchronously]
channel.emitAsync('ping'); [`emitAsync` guarantees asynchronous execution]
```

the callback would be executed asynchronously, because the `emitAsync` method was used and is stronger than the async flag in the `on` call.

## Named Event channels

When you call the `Channel` constructor and pass it a string value, you create a *named channel* or *public channel* (which are two terms for the same thing). Because it has a name, such an event channel is "public" and can be retrieved via its name. The library contains a closure that keeps track of all named channels and allows you to retrieve them using the `Channel` constructor's `get` method.

```javascript
Channel('myEventchannel');
var b = Channel.get('myEventchannel'); // [b now contains an event channel]
```

Why? Well, unnamed channels have to be passed around in order to connect seperate parts of an application. If you don't want to do that, you can use public channels.

Because every part of your application will have access to public channels, they and their events can not be silenced or locked.

## Compatibility

There have been no tests so far, determining this library's compatibility with JavaScript execution environments.

## License

The MIT License (MIT)

Copyright © 2014 Peter Steinberg

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
