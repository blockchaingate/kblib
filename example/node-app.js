#!/usr/bin/env node

var Kblib = require('../index.js');
var kblib = new Kblib();

kblib.setProvider(new kblib.providers.HttpProvider('http://localhost:8545'));

var coinbase = kblib.kanban.coinbase;
console.log(coinbase);

var balance = kblib.kanban.getBalance(coinbase);
console.log(balance.toString(10));
