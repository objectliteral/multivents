
When you call the `Channel` constructor and pass it a string value, you create a *named channel* or *public channel* (which are two terms for the same thing). Because it has a name, such an event channel is "public" and can be retrieved via its name. **multivents** contains a closure that keeps track of all named channels and allows you to retrieve them using the `Channel` constructor's `get` method.

```javascript
Channel('myEventchannel');
var b = Channel.get('myEventchannel'); // [b now contains an event channel]
```

Why? Well, unnamed channels have to be passed around in order to connect separate parts of an application. If you don't want to do that, you can use public channels.

Because every part of your application will have access to public channels, they and their events can not be silenced or locked.