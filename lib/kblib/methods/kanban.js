/*
    This file is part of kblib.js.

    kblib.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    kblib.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with kblib.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file kanban.js
 * @author Marek Kotewicz <marek@ethdev.com>
 * @author Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

"use strict";

var formatters = require('../formatters');
var utils = require('../../utils/utils');
var Method = require('../method');
var Property = require('../property');
var c = require('../../utils/config');
var Contract = require('../contract');
var watches = require('./watches');
var Filter = require('../filter');
var IsSyncing = require('../syncing');
var namereg = require('../namereg');
var Iban = require('../iban');
var transfer = require('../transfer');

var blockCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? "kanban_getBlockByHash" : "kanban_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'kanban_getTransactionByBlockHashAndIndex' : 'kanban_getTransactionByBlockNumberAndIndex';
};

var uncleCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'kanban_getUncleByBlockHashAndIndex' : 'kanban_getUncleByBlockNumberAndIndex';
};

var getBlockTransactionCountCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'kanban_getBlockTransactionCountByHash' : 'kanban_getBlockTransactionCountByNumber';
};

var uncleCountCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'kanban_getUncleCountByBlockHash' : 'kanban_getUncleCountByBlockNumber';
};

function Kanban(kblib) {
    this._requestManager = kblib._requestManager;

    var self = this;

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });


    this.iban = Iban;
    this.sendIBANTransaction = transfer.bind(null, this);
}

Object.defineProperty(Kanban.prototype, 'defaultBlock', {
    get: function () {
        return c.defaultBlock;
    },
    set: function (val) {
        c.defaultBlock = val;
        return val;
    }
});

Object.defineProperty(Kanban.prototype, 'defaultAccount', {
    get: function () {
        return c.defaultAccount;
    },
    set: function (val) {
        c.defaultAccount = val;
        return val;
    }
});

var methods = function () {
    var getTradesByBlock = new Method ({
        name: 'getTradesByBlock',
        call: 'kanban_getTradeHistoryByBlockNumber',
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter]
    });

    var getFailedTradeOrderHashes = new Method({
	name: 'getFailedTradeOrderHashes',
	call: 'kanban_getTxHashOfFailedTrade',
	params: 1,
	inputFormatter: [formatters.inputAddressFormatter]
    });


    var getBalance = new Method({
        name: 'getBalance',
        call: 'kanban_getBalance',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    var getStorageAt = new Method({
        name: 'getStorageAt',
        call: 'kanban_getStorageAt',
        params: 3,
        inputFormatter: [null, utils.toHex, formatters.inputDefaultBlockNumberFormatter]
    });

    var getCode = new Method({
        name: 'getCode',
        call: 'kanban_getCode',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    var getBlock = new Method({
        name: 'getBlock',
        call: blockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, function (val) { return !!val; }],
        outputFormatter: formatters.outputBlockFormatter
    });

    var getUncle = new Method({
        name: 'getUncle',
        call: uncleCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputBlockFormatter,

    });

    var getBlockTransactionCount = new Method({
        name: 'getBlockTransactionCount',
        call: getBlockTransactionCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var getBlockUncleCount = new Method({
        name: 'getBlockUncleCount',
        call: uncleCountCall,
        params: 1,
        inputFormatter: [formatters.inputBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var getTransaction = new Method({
        name: 'getTransaction',
        call: 'kanban_getTransactionByHash',
        params: 1,
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'kanban_getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    var getTransactionCount = new Method({
        name: 'getTransactionCount',
        call: 'kanban_getTransactionCount',
        params: 2,
        inputFormatter: [null, formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: utils.toDecimal
    });

    var sendRawTransaction = new Method({
        name: 'sendRawTransaction',
        call: 'kanban_sendRawTransaction',
        params: 1,
        inputFormatter: [null]
    });

    var sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'kanban_sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var signTransaction = new Method({
        name: 'signTransaction',
        call: 'kanban_signTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var sign = new Method({
        name: 'sign',
        call: 'kanban_sign',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.utf8ToHexFormatter]
    });

    var call = new Method({
        name: 'call',
        call: 'kanban_call',
        params: 2,
        inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter]
    });

    var estimateGas = new Method({
        name: 'estimateGas',
        call: 'kanban_estimateGas',
        params: 1,
        inputFormatter: [formatters.inputCallFormatter],
        outputFormatter: utils.toDecimal
    });

    var getLogs = new Method({
        name: 'getLogs',
        call: 'kanban_getLogs',
        params: 1,
        inputFormatter: [formatters.inputGetLogsFormatter],
        outputFormatter: formatters.outputLogFormatter
    });

    var submitWork = new Method({
        name: 'submitWork',
        call: 'kanban_submitWork',
        params: 3
    });

    var getWork = new Method({
        name: 'getWork',
        call: 'kanban_getWork',
        params: 0
    });

    var getPendingTransactions = new Method({
        name: 'getPendingTransactions',
        call: 'kanban_pendingTransactions',
        params: 0
    });

    return [
        getBalance,
        getStorageAt,
        getCode,
        getBlock,
        getUncle,
        getBlockTransactionCount,
        getBlockUncleCount,
	getFailedTradeOrderHashes,
        getTradesByBlock,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        getTransactionCount,
        call,
        estimateGas,
        sendRawTransaction,
        signTransaction,
        sendTransaction,
        sign,
        submitWork,
        getLogs,
        getWork,
        getPendingTransactions
    ];
};


var properties = function () {
    return [
        new Property({
            name: 'coinbase',
            getter: 'kanban_coinbase'
        }),
        new Property({
            name: 'mining',
            getter: 'kanban_mining'
        }),
        new Property({
            name: 'hashrate',
            getter: 'kanban_hashrate',
            outputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'syncing',
            getter: 'kanban_syncing',
            outputFormatter: formatters.outputSyncingFormatter
        }),
        new Property({
            name: 'gasPrice',
            getter: 'kanban_gasPrice',
            outputFormatter: formatters.outputBigNumberFormatter
        }),
        new Property({
            name: 'accounts',
            getter: 'kanban_accounts'
        }),
        new Property({
            name: 'blockNumber',
            getter: 'kanban_blockNumber'
        }),
        new Property({
            name: 'protocolVersion',
            getter: 'kanban_protocolVersion'
        })
    ];
};

Kanban.prototype.contract = function (abi) {
    var factory = new Contract(this, abi);
    return factory;
};

Kanban.prototype.filter = function (options, callback, filterCreationErrorCallback) {
    return new Filter(options, 'kanban', this._requestManager, watches.kanban(), formatters.outputLogFormatter, callback, filterCreationErrorCallback);
};

Kanban.prototype.namereg = function () {
    return this.contract(namereg.global.abi).at(namereg.global.address);
};

Kanban.prototype.icapNamereg = function () {
    return this.contract(namereg.icap.abi).at(namereg.icap.address);
};

Kanban.prototype.isSyncing = function (callback) {
    return new IsSyncing(this._requestManager, callback);
};

module.exports = Kanban;
