var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var FakeHttpProvider2 = require('./helpers/FakeHttpProvider2');
var utils = require('../lib/utils/utils');
var errors = require('../lib/kblib/errors');
var BigNumber = require('bignumber.js');
var sha3 = require('../lib/utils/sha3');


var desc = [{
    "name": "balance(address)",
    "type": "function",
    "inputs": [{
        "name": "who",
        "type": "address"
    }],
    "constant": true,
    "outputs": [{
        "name": "value",
        "type": "uint256"
    }]
}, {
    "name": "send(address,uint256)",
    "type": "function",
    "inputs": [{
        "name": "to",
        "type": "address"
    }, {
        "name": "value",
        "type": "uint256"
    }],
    "outputs": [],
    "payable": true
}, {
    "name": "testArr(int[])",
    "type": "function",
    "inputs": [{
        "name": "value",
        "type": "int[]"
    }],
    "constant": true,
    "outputs": [{
        "name": "d",
        "type": "int"
    }]
}, {
    "name":"Changed",
    "type":"event",
    "inputs": [
        {"name":"from","type":"address","indexed":true},
        {"name":"amount","type":"uint256","indexed":true},
        {"name":"t1","type":"uint256","indexed":false},
        {"name":"t2","type":"uint256","indexed":false}
    ],
}];

var address = '0x1234567890123456789012345678901234567891';

describe('contract', function () {
    describe('event', function () {
        it('should create event filter', function (done) {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'Changed(address,uint256,uint256,uint256)';
            var step = 0;
            provider.injectValidation(function (payload) {
                if (step === 0) {
                    step = 1;
                    provider.injectResult('0x3');
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_newFilter');
                    assert.deepEqual(payload.params[0], {
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x000000000000000000000000000000000000000000000000000000000000000a'
                        ],
                        address: '0x1234567890123456789012345678901234567891'
                    });
                } else if (step === 1) {
                    step = 2;
                    provider.injectResult([{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]);
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_getFilterLogs');
                } else if (step === 2 && utils.isArray(payload)) {
                    step++;
                    provider.injectBatchResults([[{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]]);
                    var r = payload.filter(function (p) {
                        return p.jsonrpc === '2.0' && p.method === 'kanban_getFilterChanges' && p.params[0] === '0x3';
                    });
                    assert.equal(r.length > 0, true);
                }
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var res = 0;
            var event = contract.Changed({from: address, amount: 10});
            event.watch(function(err, result) {
                assert.equal(result.args.from, address);
                assert.equal(result.args.amount, 1);
                assert.equal(result.args.t1, 1);
                assert.equal(result.args.t2, 8);
                res++;
                if (res === 2) {
                    event.stopWatching();
                    done();
                }
            });
        });

        it('should create event filter and watch immediately', function (done) {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'Changed(address,uint256,uint256,uint256)';
            var step = 0;
            provider.injectValidation(function (payload) {
                if (step === 0) {
                    step = 1;
                    provider.injectResult('0x3');
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_newFilter');
                    assert.deepEqual(payload.params[0], {
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            null
                        ],
                        address: '0x1234567890123456789012345678901234567891'
                    });
                } else if (step === 1) {
                    step = 2;
                    provider.injectResult([{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]);
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_getFilterLogs');
                } else if (step === 2 && utils.isArray(payload)) {
                    step++;
                    provider.injectBatchResults([[{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]]);
                    var r = payload.filter(function (p) {
                        return p.jsonrpc === '2.0' && p.method === 'kanban_getFilterChanges' && p.params[0] === '0x3';
                    });
                    assert.equal(r.length > 0, true);
                }
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var res = 0;
            var event = contract.Changed({from: address}, function(err, result) {
                assert.equal(result.args.from, address);
                assert.equal(result.args.amount, 1);
                assert.equal(result.args.t1, 1);
                assert.equal(result.args.t2, 8);
                res++;
                if (res === 2) {
                    event.stopWatching();
                    done();
                }
            });
        });

        it('should create all event filter', function (done) {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'Changed(address,uint256,uint256,uint256)';
            var step = 0;
            provider.injectValidation(function (payload) {
                if (step === 0) {
                    step = 1;
                    provider.injectResult('0x3');
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_newFilter');
                    assert.deepEqual(payload.params[0], {
                        topics: [],
                        address: '0x1234567890123456789012345678901234567891'
                    });
                } else if (step === 1) {
                    step = 2;
                    provider.injectResult([{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]);
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, 'kanban_getFilterLogs');
                } else if (step === 2 && utils.isArray(payload)) {
                    step++;
                    provider.injectBatchResults([[{
                        address: address,
                        topics: [
                            '0x' + sha3(signature),
                            '0x0000000000000000000000001234567890123456789012345678901234567891',
                            '0x0000000000000000000000000000000000000000000000000000000000000001'
                        ],
                        number: 2,
                        data: '0x0000000000000000000000000000000000000000000000000000000000000001' +
                                '0000000000000000000000000000000000000000000000000000000000000008'
                    }]]);
                    var r = payload.filter(function (p) {
                        return p.jsonrpc === '2.0' && p.method === 'kanban_getFilterChanges' && p.params[0] === '0x3';
                    });
                    assert.equal(r.length > 0, true);
                }
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var res = 0;
            var event = contract.allEvents();
            event.watch(function(err, result) {
                assert.equal(result.args.from, address);
                assert.equal(result.args.amount, 1);
                assert.equal(result.args.t1, 1);
                assert.equal(result.args.t2, 8);
                res++;
                if (res === 2) {
                    event.stopWatching();
                    done();
                }
            });
        });

        it('should call constant function', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)'
            var address = '0x1234567890123456789012345678901234567891';

            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address
                }, 'latest']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var r = contract.balance(address);
            assert.deepEqual(new BigNumber(0x32), r);
        });

        it('should call constant function with default block', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)'
            var address = '0x1234567890123456789012345678901234567891';

            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address
                }, '0xb']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var r = contract.balance(address, 11);
            assert.deepEqual(new BigNumber(0x32), r);
        });

        it('should sendTransaction to contract function', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                    '0000000000000000000000001234567890123456789012345678901234567891' +
                    '0000000000000000000000000000000000000000000000000000000000000011' ,
                    from: address,
                    to: address
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send(address, 17, {from: address});
        });

        it('should make a call with optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address,
                    from: address,
                    gas: '0xc350'
                }, 'latest']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var r = contract.balance(address, {from: address, gas: 50000});
            assert.deepEqual(new BigNumber(0x32), r);

        });

        it('should throw if called with optional params without all args', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address,
                    from: address,
                    gas: '0xc350'
                }, 'latest']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var test = function() {
              var r = contract.balance({from: address, gas: 50000});
            }
            assert.throws(test, errors.InvalidNumberOfSolidityArgs(signature).message);

        });

        it('should explicitly make a call with optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address,
                    from: address,
                    gas: '0xc350'
                }, 'latest']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var r = contract.balance.call(address, {from: address, gas: 50000});
            assert.deepEqual(new BigNumber(0x32), r);

        });

        it('should explicitly make a call with optional params and defaultBlock', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            provider.injectResult('0x0000000000000000000000000000000000000000000000000000000000000032');
            var signature = 'balance(address)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) + '0000000000000000000000001234567890123456789012345678901234567891',
                    to: address,
                    from: address,
                    gas: '0xc350'
                }, '0xb']);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var r = contract.balance.call(address, {from: address, gas: 50000}, 11);
            assert.deepEqual(new BigNumber(0x32), r);

        });

        it('it should throw if sendTransaction with optional params without all args', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            var test = function() {
              contract.send(address, {from: address, gas: 50000, gasPrice: 3000, value: 10000});
            }

            assert.throws(test, errors.InvalidNumberOfSolidityArgs(signature).message);

        });

        it('should sendTransaction with optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send(address, 17, {from: address, gas: 50000, gasPrice: 3000, value: 10000});
        });

        it('should sendTransaction with bigNum param and optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send(address, new BigNumber(17), {from: address, gas: 50000, gasPrice: 3000, value: 10000});
        });

        it('should explicitly sendTransaction with optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send.sendTransaction(address, 17, {from: address, gas: 50000, gasPrice: 3000, value: 10000});
        });

        it('should explicitly sendTransaction with optional params and call callback without error', function (done) {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var address = '0x1234567890123456789012345678901234567891';
            var signature = 'send(address,uint256)';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_sendTransaction');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send.sendTransaction(address, 17, {from: address, gas: 50000, gasPrice: 3000, value: 10000}, function (err) {
                assert.equal(err, null);
                done();
            });
        });

        it('should explicitly estimateGas with optional params', function () {
            var provider = new FakeHttpProvider();
            var kblib = new Kblib(provider);
            var signature = 'send(address,uint256)';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_estimateGas');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000001234567890123456789012345678901234567891' +
                        '0000000000000000000000000000000000000000000000000000000000000011' ,
                    to: address,
                    from: address,
                    gas: '0xc350',
                    gasPrice: '0xbb8',
                    value: '0x2710'
                }]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.send.estimateGas(address, 17, {from: address, gas: 50000, gasPrice: 3000, value: 10000});
        });

        it('should call testArr method and properly parse result', function () {
            var provider = new FakeHttpProvider2();
            var kblib = new Kblib(provider);
            var signature = 'testArr(int[])';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectResultList([{
                result: '0x0000000000000000000000000000000000000000000000000000000000000005'
            }]);

            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000000000000000000000000000000000000000000020' +
                        '0000000000000000000000000000000000000000000000000000000000000001' +
                        '0000000000000000000000000000000000000000000000000000000000000003',
                    to: address
                },
                    'latest'
                    ]);
            });

            var contract = kblib.kanban.contract(desc).at(address);
            var result = contract.testArr([3]);

            assert.deepEqual(new BigNumber(5), result);
        });

        it('should call testArr method, properly parse result and return the result async', function (done) {
            var provider = new FakeHttpProvider2();
            var kblib = new Kblib(provider);
            var signature = 'testArr(int[])';
            var address = '0x1234567890123456789012345678901234567891';
            provider.injectResultList([{
                result: '0x0000000000000000000000000000000000000000000000000000000000000005'
            }]);
            provider.injectValidation(function (payload) {
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                    data: '0x' + sha3(signature).slice(0, 8) +
                        '0000000000000000000000000000000000000000000000000000000000000020' +
                        '0000000000000000000000000000000000000000000000000000000000000001' +
                        '0000000000000000000000000000000000000000000000000000000000000003',
                    to: address
                },
                    'latest'
                ]);
            });

            var contract = kblib.kanban.contract(desc).at(address);

            contract.testArr([3], function (err, result) {
                assert.deepEqual(new BigNumber(5), result);
                done();
            });

        });
    });
});
