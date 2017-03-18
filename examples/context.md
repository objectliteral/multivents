
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