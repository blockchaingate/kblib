var chai = require('chai');
var assert = chai.assert;
var Web3 = require('../index.js');
var web3 = new Web3();
var u = require('./helpers/test.utils.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

describe('web3.kanban', function() {
    describe('methods', function() {
        // set dummy providor, to prevent error
        web3.setProvider(new FakeHttpProvider());

        u.methodExists(web3.kanban, 'getBalance');
        u.methodExists(web3.kanban, 'getStorageAt');
        u.methodExists(web3.kanban, 'getTransactionCount');
        u.methodExists(web3.kanban, 'getCode');
        u.methodExists(web3.kanban, 'sendTransaction');
        u.methodExists(web3.kanban, 'call');
        u.methodExists(web3.kanban, 'getBlock');
        u.methodExists(web3.kanban, 'getTransaction');
        u.methodExists(web3.kanban, 'getUncle');
        u.methodExists(web3.kanban, 'getBlockTransactionCount');
        u.methodExists(web3.kanban, 'getBlockUncleCount');
        u.methodExists(web3.kanban, 'filter');
        u.methodExists(web3.kanban, 'contract');

        u.propertyExists(web3.kanban, 'coinbase');
        u.propertyExists(web3.kanban, 'mining');
        u.propertyExists(web3.kanban, 'gasPrice');
        u.propertyExists(web3.kanban, 'accounts');
        u.propertyExists(web3.kanban, 'defaultBlock');
        u.propertyExists(web3.kanban, 'blockNumber');
        u.propertyExists(web3.kanban, 'protocolVersion');
    });
});

