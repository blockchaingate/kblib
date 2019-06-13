var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index');
var kblib = new Kblib();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'mining';

var tests = [{
    result: true,
    formattedResult: true,
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

