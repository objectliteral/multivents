
When registering a callback, `multivents` does not set a context for the callback execution. That means, `this` will fall back on the global object. If you want to explicitly want a callback to be executed in a given context, you can specify that context by providing `on` with a bound function. This will forever determine the context in which the callback function will be executed.

```javascript
var channel = new Channel();
var bob = { name : 'Bob' };
channel.on('greet', function () {
    console.log('Hello, I\'m ' + this.name + '!');
}.bind(bob));
channel.emit('greet'); // 'Hello, I'm Bob!'
```

The `bob` object is used as the callback's `this` as the callback was bound to it.

There is no way to inject the context any other way.