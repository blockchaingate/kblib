var chai = require('chai');
var assert = chai.assert;
var Method = require('../lib/kblib/method');

describe('lib/kblib/method', function () {
    describe('formatOutput', function () {
        it('should format plain output', function () {
            
            // given
            var formatter = function (args) {
                return args.map(function (arg) {
                    return arg + '*';
                });
            };
            
            var method = new Method({
                outputFormatter: formatter
            });
            var args = ['1','2','3'];
            var expectedArgs = ['1*', '2*', '3*'];

            // when
            var result = method.formatOutput(args);

            // then
            assert.deepEqual(result, expectedArgs);
        });
        
        it('should do nothing if there is no formatter', function () {

            // given
            var method = new Method({});
            var args = [1,2,3];

            // when
            var result = method.formatOutput(args);
            
            // then
            assert.deepEqual(result, args);
        });
    });
});

