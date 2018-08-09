var assert = require('assert'),
    Channel = require('../dist/multivents.umd.js');

describe('catchall type',  function () {

	it('should result in all callbacks for all types being invoked when emitting *',  function () {
        var channel = Channel({}),
        	check = 0,
            f = function () { check++; };
        channel.on('ping', f);
        channel.on('pong', f);
        channel.on('peng', f);
        channel.emitSync('*');
        assert.equal(check, 3)
    });

    it('should result in a callback being called for all types when being registered for *', function () {
    	var channel = Channel({}),
        	check = 0,
            f = function () { check++; };
        channel.on('*', f);
        channel.emitSync('ping');
        channel.emitSync('pong');
        channel.emitSync('peng');
        assert.equal(check, 3)
    })

});