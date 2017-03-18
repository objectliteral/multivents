
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