export default function (channel) {

    return function once (type, func, ctx, async) {

        var callbackFunction,
            called;

        called = false;

        callbackFunction = function () {
            if (!called) {
                // I explicitly want to say, that disabling this rule is fine here, because I am sure, that the correct binding of 'this' gets taken care of!
                func.apply(this, [].slice.call(arguments)); // eslint-disable-line no-invalid-this
                channel.off(type, callbackFunction);
                called = true;
            }
        };

        this.on(type, callbackFunction, ctx, async);

        return channel;

    };

};
