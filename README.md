# FAB/KanBan JavaScript API

[![Join the chat at https://gitter.im/blockchaingate/kanbanlib.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/blockchaingate/kanbanlib.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is derived and largely modified from the Ethereum Web3 API and not fully compatible with Web3 [JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/blockchaingate/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for Bower and component as embeddable scripts, and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/ethereum/ethereum.js.png)](https://ci.testling.com/ethereum/ethereum.js) -->

You need to run a local FAB/KanBan node to use this library.

[Documentation](https://github.com/blockchaingate/wiki/wiki/JavaScript-API)

## Table of Contents

- [Installation](#installation)
  - [Node.js](#nodejs)
  - [Yarn](#yarn)
  - [Meteor.js](#meteorjs)
  - [As a Browser module](#as-a-browser-module)
- [Usage](#usage)
  - [Migration from 0.13.0 to 0.14.0](#migration-from-0130-to-0140)
- [Contribute!](#contribute)
  - [Requirements](#requirements)
  - [Building (gulp)](#building-gulp)
  - [Testing (mocha)](#testing-mocha)
  - [Community](#community)
  - [Other implementations](#other-implementations)
- [License](#license)

## Installation

### Node.js

```bash
npm install kanbanlib
```

### Yarn

```bash
yarn add kanbanlib
```

### Meteor.js

```bash
meteor add fab:kanbanlib
```

### As a Browser module

CDN

```html
<script src="https://cdn.jsdelivr.net/gh/blockchaingate/kanbanlib.js@0.0.1/dist/kanbanlib.min.js" integrity="sha256-0xd06695ada9478bfc934cf30924211c80ced5c0" crossorigin="anonymous"></script>
```

Bower

```bash
bower install kanbanlib
```

Component

```bash
component install fab/kanbanlib.js
```

* Include `kanbanlib.min.js` in your html file. (not required for the meteor package)

## Usage

Use the `kanbanlib` object directly from the global namespace:

```js
console.log(kanbanlib); // {kanban: .., shh: ...} // It's here!
```

Set a provider (`HttpProvider`):

```js
if (typeof kanbanlib !== 'undefined') {
  kanbanlib = new Kblib(kanbanlib.currentProvider);
} else {
  // Set the provider you want from Kblib.providers
  kanbanlib = new Kblib(new Kblib.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (`HttpProvider` using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)):

```js
kanbanlib.setProvider(new web3.providers.HttpProvider('http://' + BasicAuthUsername + ':' + BasicAuthPassword + '@localhost:8545'));
```

There you go, now you can use it:

```js
var coinbase = web3.kanban.coinbase;
var balance = web3.kanban.getBalance(coinbase);
```

You can find more examples in the [`example`](https://github.com/ethereum/web3.js/tree/master/example) directory.

### Migration from 0.13.0 to 0.14.0

web3.js version 0.14.0 supports [multiple instances of the web3](https://github.com/ethereum/web3.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
+var Kblib = require('kanbanlib');
+var kanbanlib = new Kblib();
```
## Contribute!

### Requirements

* Node.js
* npm

```bash
# On Linux:
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/ethereum/web3.js?source=orgpage)
 - [Forum](https://forum.ethereum.org/categories/ethereum-js)


### Other implementations
 - Python [Web3.py](https://github.com/ethereum/web3.py)
 - Haskell [hs-web3](https://github.com/airalab/hs-web3)
 - Java [web3j](https://github.com/web3j/web3j)
 - Scala [web3j-scala](https://github.com/mslinn/web3j-scala)
 - Purescript [purescript-web3](https://github.com/f-o-a-m/purescript-web3)
 - PHP [web3.php](https://github.com/sc0Vu/web3.php)
 - PHP [ethereum-php](https://github.com/digitaldonkey/ethereum-php)
 - Rust [rust-web3](https://github.com/tomusdrw/rust-web3)
 - Swift [web3swift](https://github.com/BANKEX/web3swift)

## License

[LGPL-3.0+](LICENSE.md) © 2015 Contributors


[npm-image]: https://badge.fury.io/js/web3.svg
[npm-url]: https://npmjs.org/package/web3
[travis-image]: https://travis-ci.org/ethereum/web3.js.svg
[travis-url]: https://travis-ci.org/ethereum/web3.js
[dep-image]: https://david-dm.org/ethereum/web3.js.svg
[dep-url]: https://david-dm.org/ethereum/web3.js
[dep-dev-image]: https://david-dm.org/ethereum/web3.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/ethereum/web3.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/ethereum/web3.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ethereum/web3.js?branch=master
[waffle-image]: https://badge.waffle.io/ethereum/web3.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/ethereum/web3.js
