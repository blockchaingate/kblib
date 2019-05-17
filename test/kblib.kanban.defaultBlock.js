var chai = require('chai');
var assert = chai.assert;
var Kblib = require('../index');
var kblib = new Kblib();

describe('kblib.kanban', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(kblib.kanban.defaultBlock, 'latest');
        });
    });
});

