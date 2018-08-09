var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('catchall type',  function () {

	it('should result in all callbacks for all types being invoked when emitting *',  function () {
        var channel = Channel(),
        	check = 0,
            f = function () { check++; };
        channel.on('ping', f);
        channel.on('pong', f);
        channel.on('peng', f);
        channel.emitSync('*');
        assert.equal(check, 3)
    });

    it('should result in a callback being called for all types when being registered for *', function () {
    	var channel = Channel(),
        	check = 0,
            f = function () { check++; };
        channel.on('*', f);
        channel.emitSync('ping');
        channel.emitSync('pong');
        channel.emitSync('peng');
        assert.equal(check, 3)
    });

    it('should not execute silenced event types when emitting *', function () {
    	var channel = Channel({}),
            f = function () { assert.fail(); };
        channel.on('ping', f);
        channel.silence('ping');
        channel.emitSync('*');
    });

    it('should not execute silenced callbacks when emitting *', function () {
    	var channel = Channel(),
            f = function () { assert.fail(); };
        channel.on('ping', f);
        channel.silence('ping', f);
        channel.emitSync('*');
    });

    it('should not execute callbacks on silenced channels when emitting *', function () {
    	var channel = Channel(),
            f = function () { assert.fail(); };
        channel.on('ping', f);
        channel.silence();
        channel.emitSync('*');
    });

    it('should not register callbacks on locked channels when registering for *', function () {
    	var channel = Channel();
    	channel.lock();
    	channel.on('*', function () {
    		assert.fail();
    	});
    	channel.emit('ping');
    });

    it('should not execute callbacks on silenced channels when registering for *', function () {
    	var channel = Channel();
    	channel.on('*', function () {
    		assert.fail();
    	});
    	channel.silence();
    	channel.emit('ping');
    });

});