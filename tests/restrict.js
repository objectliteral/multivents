var assert = require('assert'),
    Channel = require('../multivents.js');

describe('`restrict` function', function () {

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'emit\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emit']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'fire\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['fire']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'trigger\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['trigger']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

it('should create an object with the `emit`, `emitSync`, `emitAsync`, `fire`, `fireSync`, `fireAsync`, `trigger`, `triggerSync`, `triggerAsync`, `publish`, `publishSync`, `publishAsync` methods when called with `\'publish\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['publish']);

    assert.equal('function', typeof channel2.emit);
    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fire);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.trigger);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publish);
    assert.equal('function', typeof channel2.publishSync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'emitSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'fireSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['fireSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'triggerSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['triggerSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitSync`, `fireSync`, `triggerSync`, `publishSync` methods when called with `\'publishSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['publishSync']);

    assert.equal('function', typeof channel2.emitSync);
    assert.equal('function', typeof channel2.fireSync);
    assert.equal('function', typeof channel2.triggerSync);
    assert.equal('function', typeof channel2.publishSync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'emitAsync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);
    assert.equal('function', typeof channel2.publishAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'fireAsync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['fireAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'triggerAsync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['triggerAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should create an object with the `emitAsync`, `fireAsync`, `triggerAsync`, `publishAsync` methods when called with `\'publishAsync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['publishAsync']);

    assert.equal('function', typeof channel2.emitAsync);
    assert.equal('function', typeof channel2.fireAsync);
    assert.equal('function', typeof channel2.triggerAsync);

  });

  it('should not have methods for asynchronous event dispatching when called with `\'emitSync\’`, `\'fireSync\’`,`\'triggerSync\’`, or `\'publishSync\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitSync']),
        channel3 = channel.restrict(['fireSync']),
        channel4 = channel.restrict(['triggerSync']),
        channel5 = channel.restrict(['publishSync']);

    assert.equal(undefined, channel2.emit);
    assert.equal(undefined, channel2.fire);
    assert.equal(undefined, channel2.trigger);
    assert.equal(undefined, channel2.publish);

    assert.equal(undefined, channel2.emitAsync);
    assert.equal(undefined, channel2.fireAsync);
    assert.equal(undefined, channel2.triggerAsync);
    assert.equal(undefined, channel2.publishAsync);

    assert.equal(undefined, channel3.emit);
    assert.equal(undefined, channel3.fire);
    assert.equal(undefined, channel3.trigger);
    assert.equal(undefined, channel3.publish);

    assert.equal(undefined, channel3.emitAsync);
    assert.equal(undefined, channel3.fireAsync);
    assert.equal(undefined, channel3.triggerAsync);
    assert.equal(undefined, channel3.publishAsync);

    assert.equal(undefined, channel4.emit);
    assert.equal(undefined, channel4.fire);
    assert.equal(undefined, channel4.trigger);
    assert.equal(undefined, channel4.publish);

    assert.equal(undefined, channel4.emitAsync);
    assert.equal(undefined, channel4.fireAsync);
    assert.equal(undefined, channel4.triggerAsync);
    assert.equal(undefined, channel4.publishAsync);

    assert.equal(undefined, channel5.emit);
    assert.equal(undefined, channel5.fire);
    assert.equal(undefined, channel5.trigger);
    assert.equal(undefined, channel5.publish);

    assert.equal(undefined, channel5.emitAsync);
    assert.equal(undefined, channel5.fireAsync);
    assert.equal(undefined, channel5.triggerAsync);
    assert.equal(undefined, channel5.publishAsync);

  });

  it('should not have methods for synchronous event dispatching when called with `\'emitAsync\’`, `\'fireAsync\’` or `\'triggerAsync\’`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emitAsync']),
        channel3 = channel.restrict(['fireAsync']),
        channel4 = channel.restrict(['triggerAsync']);

    assert.equal(undefined, channel2.emit);
    assert.equal(undefined, channel2.fire);
    assert.equal(undefined, channel2.trigger);

    assert.equal(undefined, channel2.emitSync);
    assert.equal(undefined, channel2.fireSync);
    assert.equal(undefined, channel2.triggerSync);

    assert.equal(undefined, channel3.emit);
    assert.equal(undefined, channel3.fire);
    assert.equal(undefined, channel3.trigger);

    assert.equal(undefined, channel3.emitSync);
    assert.equal(undefined, channel3.fireSync);
    assert.equal(undefined, channel3.triggerSync);

    assert.equal(undefined, channel4.emit);
    assert.equal(undefined, channel4.fire);
    assert.equal(undefined, channel4.trigger);

    assert.equal(undefined, channel4.emitSync);
    assert.equal(undefined, channel4.fireSync);
    assert.equal(undefined, channel4.triggerSync);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'on\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['on']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'attach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['attach']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `on`, `attach`, `subscribe` methods when called with `\'subscribe\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['subscribe']);

    assert.equal('function', typeof channel2.on);
    assert.equal('function', typeof channel2.attach);
    assert.equal('function', typeof channel2.subscribe);

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'off\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['off']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe)

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'detach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['detach']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'unsubscribe\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsubscribe']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });

  it('should create an object with the `off`, `detach`, `unsubscribe` methods when called with `\'detach\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['detach']);

    assert.equal('function', typeof channel2.off);
    assert.equal('function', typeof channel2.detach);
    assert.equal('function', typeof channel2.unsubscribe);

  });

  it('should create an object with the `silence` and `unsilence` method when called with `\'silence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['silence']);

    assert.equal('function', typeof channel2.silence);
    assert.equal('function', typeof channel2.unsilence);

  });

  it('should create an object with the `unsilence` and `silence` method when called with `\'unsilence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsilence']);

    assert.equal('function', typeof channel2.unsilence);
    assert.equal('function', typeof channel2.silence);

  });

  it('should create an object with only the `silence` method when called with `\'silence\'` and `\'unsilence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['silence'], ['unsilence']);

    assert.equal('function', typeof channel2.silence);
    assert.equal('undefined', typeof channel2.unsilence);

  });

  it('should create an object with only the `unsilence` method when called with `\'unsilence\'` and `\'silence\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unsilence'], ['silence']);

    assert.equal('function', typeof channel2.unsilence);
    assert.equal('undefined', typeof channel2.silence);

  });

  it('should create an object with the `lock` and `unlock` method when called with `\'lock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['lock']);

    assert.equal('function', typeof channel2.lock);

  });

  it('should create an object with the `unlock` and `lock` method when called with `\'unlock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unlock']);

    assert.equal('function', typeof channel2.unlock);

  });

  it('should create an object with only the `lock` method when called with `\'lock\'` and `\'unlock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['lock'], ['unlock']);

    assert.equal('function', typeof channel2.lock);
    assert.equal('undefined', typeof channel2.unlock);

  });

  it('should create an object with only the `unlock` method when called with `\'unlock\'` and `\'lock\'`', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['unlock'], ['lock']);

    assert.equal('function', typeof channel2.unlock);
    assert.equal('undefined', typeof channel2.lock);

  });

  it('should have the `isSilenced`, `isLocked` and `restrict` methods by default, when no prohibitions are specified', function () {

    var channel = new Channel(),
        channel2 = channel.restrict();

    assert.equal('function', typeof channel2.isSilenced);
    assert.equal('function', typeof channel2.isLocked);
    assert.equal('function', typeof channel2.restrict);

  });

  it('should prevent giving permissions to the wrapper that the target itself does not have', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(),
        channel3 = channel2.restrict(['emit']);

    assert.equal(undefined, channel3.emit);

  });

  it('should fire events on the original channel', function () {

    var channel = new Channel(),
        channel2 = channel.restrict(['emit'], ['silence', 'lock']),
        foo = false;

    channel.on('foo', function () {
      foo = 'bar';
    });

    channel2.emitSync('foo');

    assert.equal(foo, 'bar');

  });

});
