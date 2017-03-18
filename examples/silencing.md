
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