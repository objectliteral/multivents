You can use the catchall-event `*` to listen for all events or to trigger all callbacks respectively.

```javascript
channel.on('*', function () {
	// this function will get called whenever *any* event is emitted
});
```

Registering a callback for the special event type `*` will cause it to get executed everytime *any* event is emitted. This might be useful for stuff like logging events.

```javascript
channel.emit('*');
```

Emitting the special event type `*` will trigger all callbacks for all events on the channel.