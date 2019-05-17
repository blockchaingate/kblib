var chai = require('chai');
var Kblib = require('../index');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'isSyncing';

var tests = [{
    args: [],
    formattedArgs: [],
    result: [{
        startingBlock: '0xb',
        currentBlock: '0xb',
        highestBlock: '0xb'
    }],
    formattedResult: {
        startingBlock: 11,
        currentBlock: 11,
        highestBlock: 11
    },
    call: 'kanban_syncing'
}, {
    args: [],
    formattedArgs: [],
    result: [{
        startingBlock: '0xb',
        currentBlock: '0xb',
        highestBlock: '0xb',
        knownStates: '0xb',
        pulledStates: '0xb'
    }],
    formattedResult: {
        startingBlock: 11,
        currentBlock: 11,
        highestBlock: 11,
        knownStates: 11,
        pulledStates: 11
    },
    call: 'kanban_syncing'
}];

describe('kanban', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function (done) {
                // given
                var provider = new FakeHttpProvider();
                var kblib = new Kblib(provider);
                provider.injectBatchResults(test.result);
                provider.injectValidation(function(payload) {
                    assert.equal(payload[0].jsonrpc, '2.0', 'failed');
                    assert.equal(payload[0].method, test.call);
                    assert.deepEqual(payload[0].params, test.formattedArgs);
                });

                var count = 1;

                // TODO results seem to be overwritten


                // call
                var syncing = kblib.kanban[method](function(e, res){
                    if(count === 1) {
                        assert.isTrue(res);
                        count++;
                    } else {
                        assert.deepEqual(res, test.formattedResult);
                        syncing.stopWatching();
                        done();
                    }
                });

            });
        });
    });
});

