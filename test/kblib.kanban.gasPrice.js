var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index');
var kblib = new Kblib();
var BigNumber = require('bignumber.js');
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'gasPrice';

var tests = [{
    result: '0x15f90',
    formattedResult: new BigNumber(90000),
    call: 'kanban_'+ method
}];

describe('kblib.kanban', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {
                
                // given
                var provider = new FakeHttpProvider();
                kblib.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when 
                var result = kblib.kanban[method];
                
                // then
                assert.deepEqual(test.formattedResult, result);
            });
        });
    });
});

