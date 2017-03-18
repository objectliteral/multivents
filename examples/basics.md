
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
