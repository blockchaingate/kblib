var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index.js');
var kblib = new Kblib();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('kblib.kanban', function() {
    describe('methods', function() {
        // set dummy providor, to prevent error
        kblib.setProvider(new FakeHttpProvider());

        u.methodExists(kblib.kanban, 'getBalance');
        u.methodExists(kblib.kanban, 'getStorageAt');
        u.methodExists(kblib.kanban, 'getTransactionCount');
        u.methodExists(kblib.kanban, 'getCode');
        u.methodExists(kblib.kanban, 'sendTransaction');
        u.methodExists(kblib.kanban, 'call');
        u.methodExists(kblib.kanban, 'getBlock');
        u.methodExists(kblib.kanban, 'getTransaction');
        u.methodExists(kblib.kanban, 'getUncle');
        u.methodExists(kblib.kanban, 'getBlockTransactionCount');
        u.methodExists(kblib.kanban, 'getBlockUncleCount');
        u.methodExists(kblib.kanban, 'filter');
        u.methodExists(kblib.kanban, 'contract');

        u.propertyExists(kblib.kanban, 'coinbase');
        u.propertyExists(kblib.kanban, 'mining');
        u.propertyExists(kblib.kanban, 'gasPrice');
        u.propertyExists(kblib.kanban, 'accounts');
        u.propertyExists(kblib.kanban, 'defaultBlock');
        u.propertyExists(kblib.kanban, 'blockNumber');
        u.propertyExists(kblib.kanban, 'protocolVersion');
    });
});

