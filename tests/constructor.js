var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

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

  it('should modify original object that was passed to it', function () {
    var obj = { foo : 'bar' }; 
    eventedObj = Channel(obj);
    assert.equal(obj, eventedObj);
  });

});