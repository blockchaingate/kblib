var chai = require('chai');
var assert = chai.assert; 
var Kblib = require('../index.js');
var kblib = new Kblib();
var u = require('./helpers/test.utils.js');

describe('kblib.db', function() {
    describe('methods', function() {
        u.methodExists(kblib.db, 'putHex');
        u.methodExists(kblib.db, 'getHex');
        u.methodExists(kblib.db, 'putString');
        u.methodExists(kblib.db, 'getString');
    });
});

