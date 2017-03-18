<h1 align="center">
    <br />
    <img src="./media/logo.PNG" width="300" />
    <br />
    <br />
</h1>

[![Build Status](https://img.shields.io/travis/objectliteral/multivents/master.svg?style=flat-square)](https://travis-ci.org/objectliteral/multivents) [![Coverage](https://img.shields.io/coveralls/objectliteral/multivents/master.svg?style=flat-square)](https://coveralls.io/github/objectliteral/multivents) [![Dependencies](https://david-dm.org/objectliteral/multivents/status.svg?style=flat-square)](https://david-dm.org/objectliteral/multivents) [![DevDependencies](https://david-dm.org/objectliteral/multivents/dev-status.svg?style=flat-square)](https://david-dm.org/objectliteral/multivents?type=dev)

 **multivents** is a small yet flexible, multifunctional pub-sub library. It allows you to create event channels, send (asynchronous) events over those channels and subscribe to events.

## Quick Start

If you want to get started quickly, here is a basic example of how to use **multivents**:

```javascript
var Channel = require('multivents');

var myChannel = new Channel();

myChannel.on('greet', function (who) {
    console.log('hello ' + who);
});

myChannel.emit('greet', 'world'); // 'hello world'
```

If that's all you wanted to know, great! If not, you may read on to find out more.

## Navigation

1. [Features](#features)
1. [Installation](#installation)
1. [Examples](#examples)
1. [Concepts](#concepts)
1. [Contributing](#contributing)
1. [Acknowledgments](#acknowledgments)
1. [License](#license)

## Features

- Synchronous & asynchronous callback execution
- No Dependencies
- [Thoroughly tested](https://coveralls.io/github/objectliteral/multivents)
- [Multifunctional™](#concepts)

## Installation

As **multivents** has no dependencies you can simply grab the [latest release](https://github.com/objectliteral/multivents/releases/latest) and include it in your project. **multivents** uses [UMD](https://github.com/umdjs/umd), meaning it supports both CommonJS-style environments as well as AMD. 

You can also install it via `npm`:

```
npm install multivents
```

If you want to extend **multivents** to your needs, you might want to run tests. In order to do this, you can clone this repository and run `npm install` and `npm test`. Tests are written with [assert](https://github.com/defunctzombie/commonjs-assert) and run with [mocha](https://mochajs.org/).

## Examples

Check out the [examples](https://objectliteral.github.io/multivents/tutorial-basics.html) and [API docs](https://objectliteral.github.io/multivents/Channel.html).

## Concepts

**Multivents** aims to be a highly flexible, multifunctional library that can be used in projects of all sizes. It tries to be as small and fast as possible while offering you all the semantics for event systems that you could wish for. **multivents** mainly wants to get out of your way and attempts that by providing a straightforward API that includes a lot of optional parameters. The goal is for you to use **multivents** the way you want to, and not to be limited by the library's opinions.

### Terminology

This README and all the documentation use a couple of terms synonymously: "event" and "message" are the same as well as event "name" and event "type". "Listening for an event", "adding a callback" and "subscribing to an event" all refer to the process of registering a function to be executed when an event is "emitted" / "triggered" / "fired".

## Contributing

Contributions are welcome! Whether you want suggest or implement changes, check out the [issues](https://github.com/objectliteral/multivents/issues) first and have a look at my [more detailed notes on contributing](https://github.com/objectliteral/multivents/blob/master/CONTRIBUTING.md).

## Acknowledgments

This library started out as a fork of [Fabien O'Carroll's](https://github.com/allouis) [minivents](https://github.com/allouis/minivents).

## License

[MIT License (MIT) © 2014-2017 Peter Steinberg](https://github.com/objectliteral/multivents/blob/master/LICENSE)
