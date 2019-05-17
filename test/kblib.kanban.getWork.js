var chai = require('chai');
var kblib = require('../index');
var testMethod = require('./helpers/test.method.js');

var method = 'getWork';

var tests = [{
    args: [],
    formattedArgs: [],
    result: true,
    formattedResult: true,
    call: 'kanban_'+ method
}];

testMethod.runTests('kanban', method, tests);

