# minivents

Minivents is a small library that allows you to create message busses, send messages over those busses and subscribe to messages.

The goal of this library is to provide a Pub-Sub-System that is as easy to use as possible.

## Terminology and Concept

This library understands the concept of so called *message busses* or *event busses*. A bus is a communication device that has events associated with it. When a message is sent over a message bus, all callback functions registered for that specific message are being called.

The following documentation makes use of a certain terminilogy which probably should be explained briefly.

*Events* and *messages* are used synonymously and describe quite virtual things. There is no event object in this library and events are only represented by their *name* or *type* (which are also different terms for the same thing).

*Listening* or *adding a callback* is the process that registers a function to be executed when a event is *emitted* or *triggered* or *fired* i.e. a message is being *sent*.

## Installation

There's not really anything to install. If you want to use minivents in your project, include `minivents.js` or `minivents.min.js` and use it like described below. 

If you want to extend minivents to your needs you might want to run tests. In order to do this, you can clone this repository and run `npm install` and `gulp test`. Tests are written with assert and run with mocha (gulp-mocha).

## How to use / API

`Events` : This constructor function creates a new message bus. You can invoke the constructor using the `new` keyword and a new bus object is created for you. You can also call `Events` as a function and pass in an object, that you want to transform to a message bus. A third option would be to pass the constructor a string, which creates a named bus. You can read more on the semantics of named busses in the [extra paragraph I dedicated them](#named-event-busses). A bus provides a handful of messages that are discussed below.

`on`: With this method you can register callbacks to be executed when a certain event is triggered. You have to pass in the event name and the callback function, but you can optionally provide a third argument. This third argument should be an object which is then used as the callback function's `this` (context injection). Params: `String type`, `Function callback`, `Object context`
`function on ( /* String */ type, /* Function */ callback, /* Object */ context ? )`
    
`off` : Removes an event listener. The function will no longer be invoked when the specified event is triggered. The event name as well as a reference to the function to be removed are required. Params: `String type`, `Function callback`
`function off ( /* String */ type, /* Function */ callback )`
    
`emit`: Calling this method triggers the specified event and will result in all registered callbacks being executed. All arguments that are being passed to to `emit` are provided to the callback function as arguments. Params: `String type`, `Object data`
`function emit ( /* String */ type, ... )`

Those are the most important functions provided by minivents. If you want to get started quickly, skip on to the [example code](#example).

---

`silence`: This method prevents callbacks from being executed. You can use `silence` on different things depending on the arguments you provide. If you call it without any arguments, the whole message bus is silenced and emitting events on this bus won't work (if you have multiple message bus objects, those are not silenced). If you call `silence` with one argument, you can specify an event that should no longer be emittable, while all other events on this bus will still work fine. If you call `silence` with two arguments, you can silence one specific callback function from executing. When the according event is triggered, all of its other callbacks are still being invoked, except the one you silenced.

`function silence ( /* String */ type ?, /* Function */ funct ? )`

`unsilence`: After having silenced an event bus or an event or a single callback function, you can unsilence it with `unsilence`. If you unsilence a single event, but the entire bus is still silenced, triggering the event will still have no effect.

`function unsilence ( /* String */ type ?, /* Function */ funct ? )`

`lock`: Locking means preventing new callbacks from being registered. Similar to silencing, you can lock an entire bus and prohibiting any callbacks from being registered to it, you can also lock a single event. You can call `lock` with no arguments (locking the entire bus) or with a string argument, specifying the event you want to lock.

`function lock ( /* String */ type ? )`

`unlock`: Unlocking a bus or an event allows new callbacks to be attached to it. You can unlock a locked bus or just a single event by using the optional paramter.

`function unlock ( /* String */ type ? )`

`reset`: This method lets you remove all callbacks from an event or even all callbacks of all events on an entire bus. If you call this function without any arguments, you reset the whole bus.

`function reset ( /* String */ type ? )`

## Example

Create a message bus using the `Events` constructor (here in conjunction with the `new` keyword).

```javascript
var bus = new Events();
```

The new bus provides the `on` method that allows you to specify an event name and a function that is meant to be executed in case the given event is triggered.

```javascript
bus.on('ping', function () {
    console.log('ping event fired!');
});
```

Your function can also have parameters.

```javascript
var greet = function (who){
    console.log('hello' + who);
};
bus.on('ping', greet);
```

You can trigger an event using the bus' `emit` method and optionally providing additional arguments that will be passed on to the constructor.

```javascript
bus.emit('ping', 'world');
 // 'ping event fired!'
 // 'hello world'
```

When you want to remove a callback function, you can detach it from the event by using the `off` message and specifying the event and the function you want to detach.

```javascript
bus.off('ping', greet);
```

Now, when you fire the event again, the `greet` function will no longer be invoked.

```javascript
bus.emit('event'); // 'ping event fired!'
```

## Named Event Busses

When you call the `Events` constructor pass it a string value, you create a *named bus* or *public bus* (which are two terms for the same thing). Because it has a name, such an event bus is public because it can be retrieved be anyone with access to the minivents library. The library contains a closure that keeps track of all named busses and allows you to retrieve them via their name. You can do that, using the `Events` constructors `get` method.

```javascript
Events('myEventBus');
var b = Events.get('myEventBus'); // [b now contains an event bus]
```

Why? Well, unnamed busses have to be passed around in order to connect seperate parts of an application. If your application consists of isolated modules, you have to take care of passing event busses around or the communication between your modules won't work. You then have to think about which module is created when and what other constructors it calls and all this kind of stuff. That is all very well because it gives you maximum control over what your modules can do. But sometimes you maybe don't want all that fuzz and want to simply access a message bus by including the minivents library.

Because named busses are public, you don't want to rely on the good intentions of any module you load in your application. That is why public busses (and also single events on public busses) can not be silenced or locked.