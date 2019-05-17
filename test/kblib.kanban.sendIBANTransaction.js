var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index');
var kblib = new Kblib();
var FakeHttpProvider2 = require('./helpers/FakeHttpProvider2');

describe('kblib.kanban.sendIBANTransaction', function () {
    it('should send transaction', function () {

        var iban = 'XE81ETHXREGGAVOFYORK';
        var address =   '0x1234567890123456789012345678901234500000';
        var exAddress = '0x1234567890123456789012345678901234567890'

        var provider = new FakeHttpProvider2();
        kblib.setProvider(provider);
        kblib.reset();

        provider.injectResultList([{
            result: exAddress
        }, {
            result: ''
        }]);

        var step = 0;
        provider.injectValidation(function (payload) {
            if (step === 0) {
                step++;
                assert.equal(payload.method, 'kanban_call');
                assert.deepEqual(payload.params, [{
                   data: "0x3b3b57de5852454700000000000000000000000000000000000000000000000000000000",
                   to: kblib.kanban.icapNamereg().address
                }, "latest"]);

                return;
            } 
            assert.equal(payload.method, 'kanban_sendTransaction');
            assert.deepEqual(payload.params, [{
                data: '0xb214faa54741564f46594f524b0000000000000000000000000000000000000000000000',
                from: address,
                to: exAddress,
                value: payload.params[0].value // don't check this
            }]);
        });

        kblib.kanban.sendIBANTransaction(address, iban, 10000);

    });
});

