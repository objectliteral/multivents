var assert = require('assert'),
    Channel = require('../multivents.js');

describe('Channel Constructor', function () {
  it('should return an object containing the methods used by minivents if called with new', function () {
      var channel = new Channel();
      assert.equal('object', typeof channel);
  });

  it('should return an object containing the methods used by minivents if called with an empty object', function () {
      var channel = Channel({});
      assert.equal('object', typeof channel);
  });

  it('should return an object if called with a string', function () {
      var channel = Channel('test');
      assert.equal('object', typeof channel);
  });

  it('should contain a `get` function', function () {
    assert.equal(true, typeof Channel.get === 'function');
  });

  it('should make named channels available via a `get` method', function () {
      var channel = Channel('test');
      assert.equal(channel, Channel.get('test'));
  });

  it('should modify original object that was passed to it', function () {
    var obj = { foo : 'bar' }; 
    eventedObj = Channel(obj);
    assert.equal(obj, eventedObj);
  });

});