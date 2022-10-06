# Kanban Javascript API (Kblib)

Kblib is a library designed to help with development on the kanban network, whether it is to interface with a kanban node, or to perform some common offline tasks such as signing transactions.

Kblib is made up of two main parts:

1. Kblib.kanban - Involves interfacing with a kanban network. Requires a kanban node to connect to.
2. Kblib._extend - Offline tools common for wallet and dapp development (not requiring a kanban node). Subdivided into sections called offline/utils/coders.


Set-up and Transaction Signing Example

```
const Kblib = require('./kblib');

const kblib = new Kblib();

// Offline methods - ready to go out of the box. Example creates a sendtocontract transaction.
const derivedKeys = kblib._extend.offline.deriveFromMnemonic('<12_word_seed_phrase_goes_here>');

const transactionObject = {
  nonce: <account>,
  gasPrice: '0x2FAF080',
  gasLimit: '0x1E8480',
  data: '<bytecode_goes_here>',
  value: '0x0'
}
const signedTransaction = kblib._extend.offline.signTransaction(transactionObject, derivedKeys.privateKey, 'MAINNET');

// Kanban methods - requires setting up a provider to access kanban node - IPC or HTTP provider

// IPC provider
const provider = new Kblib.providers.IpcProvider(<path to geth.ipc file on kanban node>, net);
kblib.setProvider(provider, null, { defaultBlock: 'latest' });

// OR

// HTTP Provider
const provider = new Kblib.providers.HttpProvider('http://localhost:8545', net);
kblib.setProvider(provider, null, { defaultBlock: 'latest' });


// Using the now-connected node to submit a transaction to the network

kblib.kanban.sendRawTransaction(signedTransaction, callbackFunction);

```


# kblib documentation

## Table of Contents

- [Kblib](#kblib)
   * [sha3](#sha3)
- [Kblib.kanban](#kblibkanban)
   * [Properties](#properties)
   * [kanban.getBlock](#kanbangetblock)
   * [kanban.getTransaction](#kanbangettransaction)
   * [kanban.getTransactionFromBlock](#kanbangettransactionfromblock)
   * [kanban.getTransactionReceipt](#kanbangettransactionreceipt)
   * [kanban.pendingTransactions](#kanbanpendingtransactions)
   * [kanban.getTransactionCount](#kanbangettransactioncount)
   * [kanban.getBlockTransactionCount](#kanbangetblocktransactioncount)
   * [kanban.getUncle](#kanbangetuncle)
   * [kanban.getUncleCount](#kanbangetunclecount)
   * [kanban.getBalance](#kanbangetbalance)
   * [kanban.sendRawTransaction](#kanbansendrawtransaction)
   * [kanban.getStorageAt](#kanbangetstorageat)
   * [kanban.getCode](#kanbangetcode)
   * [kanban.call](#kanbancall)
   * [kanban.estimateGas](#kanbanestimategas)
   * [kanban.getWork](#kanbangetwork)
   * [kanban.submitWork](#kanbansubmitwork)
   * [kanban.getLogs](#kanbangetlogs)
- [Kblib._extend.offline](#kblib_extendoffline)
   * [utils.deriveFromMnemonic](#offlinederivefrommnemonic)
   * [utils.signTransaction](#offlinesigntransaction)
- [Kblib._extend.utils](#kblib_extendutils)
   * [utils.padLeft](#utilspadleft)
   * [utils.padRight](#utilspadright)
   * [utils.toHex](#utilstohex)
   * [utils.toDecimal](#utilstodecimal)
   * [utils.fromDecimal](#utilsfromdecimal)
   * [utils.toUtf8](#utilstoutf8)
   * [utils.toAscii](#utilstoascii)
   * [utils.fromUtf8](#utilsfromutf8)
   * [utils.fromAscii](#utilsfromascii)
   * [utils.toWei](#utilstowei)
   * [utils.fromWei](#utilsfromwei)
   * [utils.toBigNumber](#utilstobignumber)
   * [utils.toTwosComplement](#utilstotwoscomplement)
   * [utils.isBigNumber](#utilsisbignumber)
   * [utils.isStrictAddress](#utilsisstrictaddress)
   * [utils.isAddress](#utilsisaddress)
   * [utils.isChecksumAddress](#utilsischecksumaddress)
   * [utils.toChecksumAddress](#utilstochecksumaddress)
   * [utils.isFunction](#utilsisfunction)
   * [utils.isString](#utilsisstring)
   * [utils.isObject](#utilsisobject)
   * [utils.isBoolean](#utilsisboolean)
   * [utils.isArray](#utilsisarray)
   * [utils.isJson](#utilsisjson)
- [Kblib._extend.coders](#kblib_extendcoders)
   * [coders.encodeParam](#codersencodeparam)
   * [coders.encodeParams](#codersencodeparams)
   * [coders.decodeParam](#codersdecodeparam)
   * [coders.decodeParams](#codersdecodeparams)
   * [coders.encodeFunctionSignature](#codersencodefunctionsignature)
   * [coders.encodeFunctionCall](#codersencodefunctioncall)

## Kblib

### sha3
```
kblib.sha3(stringToHash)
```
Will calculate the keccak256 of the input.
#### Parameters
 - <b>stringToHash</b> - String - The string to be hashed

#### Return Type
 - String - sha3/keccak256 hashed version of stringToHash

[Back to top](#table-of-contents)

## Kblib.kanban

### Properties

| Property                     | Return-type               | Description                                                      |
|------------------------------|---------------------------|------------------------------------------------------------------|
| settings                     | Object                    | contains properties set for this instance of the module          |
| kanban.coinbase              | String                    | the coinbase address to which mining rewards will go             |
| kanban.mining                | Boolean                   | checks whether the node is mining or not                         |
| kanban.hashrate              | Number                    | number of hashes per second that the node is mining with         |
| kanban.syncing               | syncing object or boolean | if node is syncing, returns syncing object, otherwise false      |
| kanban.gasPrice              | BigNumber                 | current gas price oracle determined by median of last few blocks |
| kanban.accounts              | array of String           | array of addresses controlled by node                            |
| kanban.blockNumber           | Object                    | object containing "blockNumber" and "blockNumberHex"             |
| kanban.protocolVersion       | String                    | protocol version of the node in hexadecimal format               |confirm if kanban version
| version.network              | String                    | which kanban network the node is a part of                       |eg. 1 = mainnet,  2 = testnet1,
| net.peerCount                | Number                    | Returns number of peers currently connected to the client        |
| net.listening                | Boolean                   | Returns true if client is listening for network connections.     |

[Back to top](#table-of-contents)

### kanban.getBlock
```
kblib.kanban.getBlock(blockHashOrBlockNumber [, returnTransactionObjects])
```
Returns a block matching the block number or block hash.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
 - <b>returnTransactionObjects</b> - Boolean - (optional, default false) If true, the returned block will contain all transactions as objects, if false it will only contains the transaction hashes.

#### Return Type
 - block object:
    * <b>number</b> - Number: The block number. null when its pending block.
    * <b>hash</b> 32 Bytes - String: Hash of the block. null when its pending block.
    * <b>parentHash</b> 32 Bytes - String: Hash of the parent block.
    * <b>nonce</b> 8 Bytes - String: Hash of the generated proof-of-work. null when its pending block.
    * <b>sha3Uncles</b> 32 Bytes - String: SHA3 of the uncles data in the block.
    * <b>logsBloom</b> 256 Bytes - String: The bloom filter for the logs of the block. null when its pending block.
    * <b>transactionsRoot</b> 32 Bytes - String: The root of the transaction trie of the block
    * <b>stateRoot</b> 32 Bytes - String: The root of the final state trie of the block.
    * <b>receiptsRoot</b> 32 Bytes - String: Transaction receipts are used to store the state after a transaction has been executed and are kept in an index-keyed trie. The hash of its root is placed in the block header as the receipts root.
    * <b>miner</b> - String: The address of the beneficiary to whom the mining rewards were given.
    * <b>difficulty</b> - String: Integer of the difficulty for this block.
    * <b>totalDifficulty</b> - String: Integer of the total difficulty of the chain until this block.
    * <b>extraData</b> - String: The “extra data” field of this block.
    * <b>size</b> - Number: Integer the size of this block in bytes.
    * <b>gasLimit</b> - Number: The maximum gas allowed in this block.
    * <b>gasUsed</b> - Number: The total used gas by all transactions in this block.
    * <b>timestamp</b> - Number: The unix timestamp for when the block was collated.
    * <b>transactions</b> - Array: Array of transaction objects, or 32 Bytes transaction hashes depending on the returnTransactionObjects parameter.

[Back to top](#table-of-contents)

### kanban.getTransaction
```
kblib.kanban.getTransaction(transactionHash)
```
Returns a transaction matching the given transaction hash.
#### Parameters
 - <b>transactionHash</b> - String - The hash of the transaction to be looked up

#### Return Type
 - transaction Object:
   * <b>hash</b> 32 Bytes - String: Hash of the transaction.
   * <b>nonce</b> - Number: The number of transactions made by the sender prior to this one.
   * <b>blockHash</b> 32 Bytes - String: Hash of the block where this transaction was in. null when its pending.
   * <b>blockNumber</b> - Number: Block number where this transaction was in. null when its pending.
   * <b>transactionIndex</b> - Number: Integer of the transactions index position in the block. null when its pending.
   * <b>from</b> - String: Address of the sender.
   * <b>to</b> - String: Address of the receiver. null when its a contract creation transaction.
   * <b>value</b> - String: Value transferred in wei.
   * <b>gasPrice</b> - String: The wei per unit of gas provided by the sender in wei.
   * <b>gas</b> - Number: Gas provided by the sender.
   * <b>input</b> - String: The data sent along with the transaction.


### kanban.getTransactionFromBlock
```
kblib.kanban.getTransactionFromBlock(blockHashOrBlockNumber, indexNumber)
```
Returns a transaction based on a block hash or number and the transactions index position.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The hash or block number of the block containing the transaction
 - <b>indexNumber</b> - Number - The index of the transaction within the block

#### Return Type
 - transaction Object:
   * <b>hash</b> 32 Bytes - String: Hash of the transaction.
   * <b>nonce</b> - Number: The number of transactions made by the sender prior to this one.
   * <b>blockHash</b> 32 Bytes - String: Hash of the block where this transaction was in. null when its pending.
   * <b>blockNumber</b> - Number: Block number where this transaction was in. null when its pending.
   * <b>transactionIndex</b> - Number: Integer of the transactions index position in the block. null when its pending.
   * <b>from</b> - String: Address of the sender.
   * <b>to</b> - String: Address of the receiver. null when its a contract creation transaction.
   * <b>value</b> - String: Value transferred in wei.
   * <b>gasPrice</b> - String: The wei per unit of gas provided by the sender in wei.
   * <b>gas</b> - Number: Gas provided by the sender.
   * <b>input</b> - String: The data sent along with the transaction.

[Back to top](#table-of-contents)

### kanban.getTransactionReceipt
```
kblib.kanban.getTransactionReceipt(transactionHash)
```
Returns the receipt of a transaction by transaction hash.
#### Parameters
 - <b>transactionHash</b> - String - The hash of the transaction to be looked up

#### Return Type
 - transaction receipt Object | null:
      * <b>status</b> - Boolean: TRUE if the transaction was successful, FALSE, if the EVM reverted the transaction.
      * <b>blockHash</b> 32 Bytes - String: Hash of the block where this transaction was in.
      * <b>blockNumber</b> - Number: Block number where this transaction was in.
      * <b>transactionHash</b> 32 Bytes - String: Hash of the transaction.
      * <b>transactionIndex</b>- Number: Integer of the transactions index position in the block.
      * <b>from</b> - String: Address of the sender.
      * <b>to</b> - String: Address of the receiver. null when its a contract creation transaction.
      * <b>contractAddress</b> - String: The contract address created, if the transaction was a contract creation, otherwise null.
      * <b>cumulativeGasUsed</b> - Number: The total amount of gas used when this transaction was executed in the block.
      * <b>gasUsed</b> - Number: The amount of gas used by this specific transaction alone.
      * <b>logs</b> - Array: Array of log objects, which this transaction generated.

[Back to top](#table-of-contents)

### kanban.pendingTransactions
```
kblib.kanban.pendingTransactions()
```
Returns a list of pending transactions.
#### Parameters
 - *none*
#### Return Type
 - Array of transaction objects:
   * <b>hash</b> 32 Bytes - String: Hash of the transaction.
   * <b>nonce</b> - Number: The number of transactions made by the sender prior to this one.
   * <b>blockHash</b> 32 Bytes - String: Hash of the block where this transaction was in. null when its pending.
   * <b>blockNumber</b> - Number: Block number where this transaction was in. null when its pending.
   * <b>transactionIndex</b> - Number: Integer of the transactions index position in the block. null when its pending.
   * <b>from</b> - String: Address of the sender.
   * <b>to</b> - String: Address of the receiver. null when its a contract creation transaction.
   * <b>value</b> - String: Value transferred in wei.
   * <b>gasPrice</b> - String: The wei per unit of gas provided by the sender in wei.
   * <b>gas</b> - Number: Gas provided by the sender.
   * <b>input</b> - String: The data sent along with the transaction.

[Back to top](#table-of-contents)

### kanban.getTransactionCount
```
kblib.kanban.getTransactionCount(address [, defaultBlock])
```
Get the numbers of transactions sent from this address.
#### Parameters
 - <b>address</b> - String - The address that you want to see the transaction count of
 - <b>blockNumber</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - Number - The number of transactions sent from the address in the given (or latest) block

[Back to top](#table-of-contents)

### kanban.getBlockTransactionCount
```
kblib.kanban.getBlockTransactionCount(blockHashOrBlockNumber)
```
Returns the number of transaction in a given block.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.

#### Return Type
 - Number - The number of transactions in the given block

[Back to top](#table-of-contents)

### kanban.getUncle
```
kblib.kanban.getUncle(blockHashOrBlockNumber, uncleIndex)
```
Returns a blocks uncle by a given uncle index position.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The hash or block number. Or the string "genesis", "latest" or "pending" as in the default block parameter.
 - <b>uncleIndex</b> - Number - The index position of the uncle

#### Return Type
 - block object:
    * <b>number</b> - Number: The block number. null when its pending block.
    * <b>hash</b> 32 Bytes - String: Hash of the block. null when its pending block.
    * <b>parentHash</b> 32 Bytes - String: Hash of the parent block.
    * <b>nonce</b> 8 Bytes - String: Hash of the generated proof-of-work. null when its pending block.
    * <b>sha3Uncles</b> 32 Bytes - String: SHA3 of the uncles data in the block.
    * <b>logsBloom</b> 256 Bytes - String: The bloom filter for the logs of the block. null when its pending block.
    * <b>transactionsRoot</b> 32 Bytes - String: The root of the transaction trie of the block
    * <b>stateRoot</b> 32 Bytes - String: The root of the final state trie of the block.
    * <b>receiptsRoot</b> 32 Bytes - String: Transaction receipts are used to store the state after a transaction has been executed and are kept in an index-keyed trie. The hash of its root is placed in the block header as the receipts root.
    * <b>miner</b> - String: The address of the beneficiary to whom the mining rewards were given.
    * <b>difficulty</b> - String: Integer of the difficulty for this block.
    * <b>totalDifficulty</b> - String: Integer of the total difficulty of the chain until this block.
    * <b>extraData</b> - String: The “extra data” field of this block.
    * <b>size</b> - Number: Integer the size of this block in bytes.
    * <b>gasLimit</b> - Number: The maximum gas allowed in this block.
    * <b>gasUsed</b> - Number: The total used gas by all transactions in this block.
    * <b>timestamp</b> - Number: The unix timestamp for when the block was collated.
    * <b>transactions</b> - Array: Array of transaction objects, or 32 Bytes transaction hashes depending on the returnTransactionObjects parameter.

[Back to top](#table-of-contents)

### kanban.getUncleCount
```
kblib.kanban.getUncleCount(blockHashOrBlockNumber)
```
Returns then number of uncles for a given block.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The hash or block number. Or the string "genesis", "latest" or "pending" as in the default block parameter. If left blank, this method will not default to anything.

#### Return Type
 - Number : The chosen block's uncle count

[Back to top](#table-of-contents)

### kanban.getBalance
```
kblib.kanban.getBalance(address [, defaultBlock])
```
Get the balance of an address at a given block.
#### Parameters
 - <b>address</b> - String - The address to get the balance of
 - <b>defaultBlock</b>  - Number|String - (optional) - if you pass this parameter it will not use the default block set with kblib.kanban.defaultBlock.

#### Return Type
 - balance object:
    * <b>BTC</b> - String - The Bitcoin balance in hexadecimal format
    * <b>ETH</b> - String - The Ether balance in hexadecimal format
    * <b>FAB</b> - String - The FABcoin balance in hexadecimal format

[Back to top](#table-of-contents)

### kanban.sendRawTransaction
```
kblib.kanban.sendRawTransaction(signedTransactionData)
```
Sends an already signed transaction, generated for example using kblib.kanban.accounts.signTransaction
#### Parameters
 - <b>signedTransactionData</b> - String - signed transaction data in hex format

#### Return Type
 - String - 32 byte hash of the transaction

[Back to top](#table-of-contents)

### kanban.getStorageAt
```
kblib.kanban.getStorageAt(address, position [, defaultBlock])
```
Get the storage at a specific position of an address.
#### Parameters
 - <b>address</b> - String - The address to get the storage from.
 - <b>position</b> - Number - The index position of the storage.
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The value in storage at the given position, as a hex string

[Back to top](#table-of-contents)

### kanban.getCode
```
kblib.kanban.getCode(address [, defaultBlock])
```
Get the code at a specific address.
#### Parameters
 - <b>address</b> - String - The address of the smart contract
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The code at the given address, as a hex string

[Back to top](#table-of-contents)

### kanban.call
```
kblib.kanban.call(callObject [, defaultBlock])
```
Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
#### Parameters
 - <b>callObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: (optional) The address for the sending account. Uses the kblib.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kblib.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kblib.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The returned data of the call, e.g. a smart contract functions return value.

[Back to top](#table-of-contents)

### kanban.estimateGas
```
kblib.kanban.estimateGas(callObject)
```
Executes a message call or transaction and returns the amount of the gas used.
#### Parameters
 - <b>callObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: (optional) The address for the sending account. Uses the kblib.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kblib.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kblib.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

#### Return Type
 - Number - The amount of gas used in the simulated execution of the call

[Back to top](#table-of-contents)

### kanban.getWork
```
kblib.kanban.getWork()
```
Executes a message call or transaction and returns the amount of the gas used.
#### Parameters
 - *none*
#### Return Type
 - Array (3 elements) :
   * String (32 Bytes) at index 0: current block header pow-hash
   * String (32 Bytes) at index 1: the seed hash used for the DAG.
   * String (32 Bytes) at index 2: the boundary condition (“target”), 2^256 / difficulty.

[Back to top](#table-of-contents)

### kanban.submitWork
```
kblib.kanban.submitWork(callObject)
```
Executes a message call or transaction and returns the amount of the gas used.
#### Parameters
   - <b>nonce</b> - String (8 Bytes) - The nonce found (64 bits)
   - <b>powHash</b> - String (32 Bytes) - The header’s pow-hash (256 bits)
   - <b>digest</b> - String (32 Bytes) - The mix digest (256 bits)

#### Return Type
 - Boolean - Returns true if the provided solution is valid, otherwise false.

[Back to top](#table-of-contents)

### kanban.getLogs
```
kblib.kanban.getLogs(options)
```
Returns an array of all logs matching a given filter object.
#### Parameters
   - filter object::
      * fromBlock - Number|String - (optional, default 'latest') integer block number or 'latest', 'pending', or 'earliest'
      * toBlock - Number|String - (optional, default 'latest') integer block number or 'latest', 'pending', or 'earliest'
      * address - String|Array - (optional) Contract address or a list of addresses from which logs should originate.
      * topics - Array of String- (optional) array of 32 Byte topic strings. Topics are order-dependent. Each topic can also be an array of String with "or" options 
      * blockhash - String (32 Byte hex) - (optional) Restricts the logs returned to the single block with the 32-byte hash blochHash. using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. In order to use blockHash, fromBlock and toBlock must not be specified.

#### Return Type
   - Array of log objects:
      * for filters created with kanban_newBlockFilter, the returned are block hashes (32 Byte hex string)
      * for filters created with kanban_newPendingTransactionFilter, the returned are transaction hashes (32 Byte hex string) 
      * for filters created with kanban_newFilter logs are objects with the following parameters:
         + type - String - 'pending' when the log is pending, 'mined' if log is already mined
         + logIndex - Number - integer of the transactions index position log was created from. null when its pending log. 
         + transactionHash - String - (32 Byte hex string) - hash of the transactions this log was created from. null when its pending log.
         + blockHash - String (32 Byte hex string ) - hash of the block this log was in. null when its pending. null when its pending log.
         + blockNumber - Number - the block number this log was in. null when its pending. null when its pending log.
         + address - String (20 Byte hex string) - address from which this log originated
         + data - String - contains one or more 32 Byte non-indexed arguments of the log.
         + topics - Array of String - Array of 0 to 4 32 Byte strings of indexed log arguments.

[Back to top](#table-of-contents)

## Kblib._extend.offline

### offline.deriveFromMnemonic
```
kblib._extend.offline.deriveFromMnemonic(mnemonic [, network])
```
Takes a mnemonic string and derives a set of keys and addresses.
#### Parameters
 - <b>mnemonic</b> - String - 12+ word space-separated mnemonic string used to seed the private key and other data.
 - <b>network</b> - String - (optional, default 'MAINNET') Can be 'MAINNET' or 'TESTNET'.

#### Return Type
 - Object:
   * <b>privateKey</b> - hex string - Private key generated from the mnemonic, in hexadecimal format. 
   * <b>privateKeyWIF</b> - Private key generated from the mnemonic, in Wallet Import Format (WIF).
   * <b>publicKey</b> - Compressed public key derived from this private key.
   * <b>address</b> - The ethereum-style kanban address in hex, derived from this public key.

[Back to top](#table-of-contents)

### offline.signTransaction
```
kblib._extend.offline.signTransaction(transactionObject, privateKey [, network])
```
RECOMMENDED

Takes a supplied transaction object and returns a signed transaction using the supplied private key. This signing is done locally, and is more secure than kanban.signTransaction. 
#### Parameters
 - <b>transactionObject:</b> - String - 12+ word space-separated mnemonic string used to seed the private key and other data.
   * <b>nonce</b> - number or hex string - Desired nonce for the transaction. Typically this will be equal to the value returne by [kanban.getTransactionCount](#kanbangettransactioncount), but can be higher. Transactions of an account are mined in order of increasing nonce..
   * <b>gasPrice</b> - number or hex string - Desired gas price for the transaction.  
   * <b>gasLimit</b> - number or hex string - Desired gas limit for the transaction. If this is too low the transaction may fail, depending on the contract.
   * <b>to</b> - hex string - (semi-optional, default - none) Recipient Address. Omit for contract creation. Otherwise required. 
   * <b>data</b> - hex string - (semi-optional, default '0x0') Omit if "send" transaction. Otherwise recommended to include.
   * <b>value</b> - hex string - (semi-optional, default '0x0') Required if "send" transaction. Otherwise only include if calling a payable function in contract, or it can be used by the constructor if deploying smart contract. 
 - <b>privateKey</b> - String - Private key in hexadecimal format. Can be generated via [offline.deriveFromMnemonic](#offlinederivefrommnemonic).
 - <b>network</b> - String - (optional, default 'MAINNET') Can be 'MAINNET' or 'TESTNET'.

#### Return Type
 - String - The signed transaction, a hex string. Can be submitted via [kanban.sendRawTransaction](#kanbansendrawtransaction).

[Back to top](#table-of-contents)

## Kblib._extend.utils

### utils.padLeft
```
kblib._extend.utils.padLeft(string, characterAmount [, sign])
```
Adds a padding on the left of a string, Useful for adding paddings to HEX strings.
#### Parameters
 - <b>string</b> - String - The string to add padding on the left
 - <b>characterAmount</b> - Number - The number of characters the total string should have
 - <b>sign</b> - String - (optional, default '0') The character sign to use

#### Return Type
 - String - The padded string

[Back to top](#table-of-contents)

### utils.padRight
```
kblib._extend.utils.padRight(string, characterAmount [, sign])
```
Adds a padding on the right of a string, Useful for adding paddings to HEX strings.
#### Parameters
 - <b>string</b> - String - The string to add padding on the left
 - <b>characterAmount</b> - Number - The number of characters the total string should have
 - <b>sign</b> - String - (optional, default '0') The character sign to use

#### Return Type
 - String - The padded string

[Back to top](#table-of-contents)

### utils.toHex
```
kblib._extend.utils.toHex(mixed)
```
Will auto convert any given value to HEX. Number strings will interpreted as numbers. Text strings will be interpreted as UTF-8 strings.
#### Parameters
 - <b>mixed</b> - String|Number|BN|BigNumber - The input to convert to hex.

#### Return Type
 - String - The resulting hex string

[Back to top](#table-of-contents)

### utils.toDecimal
```
kblib._extend.utils.toDecimal(hex)
```
Returns the number representation of a given HEX value. This is not useful for big numbers
#### Parameters
 - <b>hexString</b> - String|HEX - A string to convert to decimal representation

#### Return Type
 - Number - The decimal representation of the hex string

[Back to top](#table-of-contents)

### utils.fromDecimal
```
kblib._extend.utils.fromDecimal(number)
```
Returns the HEX representation of a given number value.
#### Parameters
 - <b>number</b> - String|Number|BN|BigNumber - A number as a string or number

#### Return Type
 - String - A hex string representation of the number

[Back to top](#table-of-contents)

### utils.toUtf8
```
kblib._extend.utils.toUtf8(hex)
```
Returns the UTF-8 string representation of a given HEX value.
#### Parameters
 - <b>hex</b> - String - A hex string to convert to a UTF-8 string

#### Return Type
 - String - The UTF-8 string

[Back to top](#table-of-contents)

### utils.toAscii
```
kblib._extend.utils.toAscii(hex)
```
Returns the ASCII string representation of a given HEX value.
#### Parameters
 - <b>hex</b> - String - A hex string to convert to an ASCII string

#### Return Type
 - String - The ASCII string

[Back to top](#table-of-contents)

### utils.fromUtf8
```
kblib._extend.utils.fromUtf8(string)
```
Returns the HEX representation of a given UTF-8 string.
#### Parameters
 - <b>string</b> - String - A UTF-8 string to convert to as hex string.

#### Return Type
 - String - The hex string

[Back to top](#table-of-contents)

### utils.fromAscii
```
kblib._extend.utils.fromAscii(string [, length])
```
Returns the HEX representation of a given ASCII string. If you would like to transform an ASCII string into a valid bytes4, bytes8 etc. value then please pass the correct length as the second parameter
#### Parameters
 - <b>string</b> - String - The ASCII string to convert to a hex string
 - <b>length</b> - Number - (optional, default 32) The length of the returned hex string.

#### Return Type
 - String - The hex string

[Back to top](#table-of-contents)

### utils.toWei
```
kblib._extend.utils.toWei(number [, unit])
```
Converts any ether value into wei // TO DO: change this?
#### Parameters
 - <b>number</b> - String|BN - The value in the unit provided
 - <b>unit</b> - String - (optional, default 'ether') The ether value to convert from. Possible values omitted.

#### Return Type
 - String | BN - If a string is given, it returns a number string, otherwise returns a BN.js instance

[Back to top](#table-of-contents)

### utils.fromWei
```
kblib._extend.utils.fromWei(number [, unit])
```
Converts any wei value into an ether value.
#### Parameters
 - <b>number</b> - String|BN - The value in wei
 - <b>unit</b> - String - (optional, default 'ether') The ether value to convert to. Possible values omitted.

#### Return Type
 - String - It always returns a string number.

[Back to top](#table-of-contents)

### utils.toBigNumber
```
kblib._extend.utils.toBigNumber(number)
```
Convert a number from various forms to to a BigNumber
#### Parameters
 - <b>number</b> - String|Number|Hex - Parameter Description

#### Return Type
 - BigNumber - BigNumber format of the number

[Back to top](#table-of-contents)

### utils.toTwosComplement
```
kblib._extend.utils.toTwosComplement()
```
Converts a negative number into a two’s complement.
#### Parameters
 - <b>number</b> - Number|String|BigNumber - The number to convert.

#### Return Type
 - String - The converted hex string

[Back to top](#table-of-contents)

### utils.isBigNumber
```
kblib._extend.utils.isBigNumber(bigNumber)
```
Description goes here
#### Parameters
 - <b>bigNumber</b> - BigNumber Object - A BigNumber.js instance

#### Return Type
 - Boolean - true if bigNumber is a an instance of BigNumber

[Back to top](#table-of-contents)

### utils.isStrictAddress
```
kblib._extend.utils.isStrictAddress(address [, chainId])
```
Checks if a given string is a valid Kanban address, including the requirement that begin wit '0x'. It will also check the checksum, if the address has both upper and lowercase letters.
#### Parameters
 - <b>address</b> - String - An address string
 - <b>chainId</b> - Number - Chain id where checksummed address should be valid, defaults to null.

#### Return Type
 - Boolean - true if the address is valid and prefixed with '0x'

[Back to top](#table-of-contents)

### utils.isAddress
```
kblib._extend.utils.isAddress(address [, chainId])
```
Checks if a given string is a valid Kanban address. It will also check the checksum, if the address has both upper and lowercase letters.
#### Parameters
 - <b>address</b> - String - An address string
 - <b>chainId</b> - Number - Chain id where checksummed address should be valid, defaults to null.

#### Return Type
 - Boolean - true if the address is valid

[Back to top](#table-of-contents)

### utils.isChecksumAddress
```
kblib._extend.utils.isChecksumAddress(address)
```
Checks if a given string is a valid Kanban address and ikf the address has both upper and lowercase letters.
#### Parameters
 - <b>address</b> - String - An address string

#### Return Type
 - Boolean - true if the address is valid and contains mixed case

[Back to top](#table-of-contents)

### utils.toChecksumAddress
```
kblib._extend.utils.toChecksumAddress(address [, chainId])
```
Will convert an upper or lowercase Kanban address to a checksum address.
#### Parameters
 - <b>address</b> - String - An address string
 - <b>chainId</b> - Number - Chain id where checksummed address should be valid, defaults to null.

#### Return Type
 - String - The checksum address

[Back to top](#table-of-contents)

### utils.isFunction
```
kblib._extend.utils.isFunction(function)
```
Checks if the passed parameter is a function
#### Parameters
 - <b>function</b> - Object|other - The object you wish to verify is a function

#### Return Type
 - Boolean - true if the passed parameter is a function

[Back to top](#table-of-contents)

### utils.isString
```
kblib._extend.utils.isString(string)
```
Checks if the passed parameter is a string
#### Parameters
 - <b>string</b> - String|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is a String

[Back to top](#table-of-contents)

### utils.isObject
```
kblib._extend.utils.isObject(object)
```
Checks if the passed parameter is an object
#### Parameters
 - <b>object</b> - Object|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is an Object

[Back to top](#table-of-contents)

### utils.isBoolean
```
kblib._extend.utils.isBoolean(boolean)
```
Checks if the passed parameter is a boolean
#### Parameters
 - <b>boolean</b> - Boolean|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is a Boolean

[Back to top](#table-of-contents)

### utils.isArray
```
kblib._extend.utils.isArray(array)
```
Checks if the passed parameter is an array
#### Parameters
 - <b>array</b> - Array|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is an Array

[Back to top](#table-of-contents)

### utils.isJson
```
kblib._extend.utils.isString(string)
```
Checks if the passed parameter is a valid JSON string
#### Parameters
 - <b>string</b> - String|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is valid JSON string

[Back to top](#table-of-contents)

## Kblib.coders

### coders.encodeParam
```
kblib._extend.coders.encodeParam(type, param)
```

Encodes one parameter for use in a smart contract ABI
#### Parameters
 - <b>type</b> - String - The type of the parameter to be encoded for the ABI
 - <b>param</b> - String - The parameter to be encoded

#### Return Type
 - String - The ABI-encoded parameter

[Back to top](#table-of-contents)

### coders.encodeParams
```
kblib._extend.coders.encodeParams(types, params)
```
Encodes an array of parameters for use in a smart contract ABI
#### Parameters
 - <b>types</b> - Array of String - The types of the parameters to be encoded for the ABI
 - <b>params</b> - Array of String - The parameters to be encoded, in order

#### Return Type
 - String - The ABI-encoded parameters

[Back to top](#table-of-contents)

### coders.decodeParam
```
kblib._extend.coders.decodeParam(type, bytes)
```
Decodes an ABI encoded parameter to its JavaScript type.
#### Parameters
 - <b>type</b> - String - The JavaScript type of the parameter
 - <b>bytes</b> - String - The encoded parameter to be decoded

#### Return Type
 - various types - The ABI-decoded parameter. Type depends on the one supplied

[Back to top](#table-of-contents)

### coders.decodeParams
```
kblib._extend.coders.decodeParams(types, bytes)
```
Decodes ABI encoded parameters to their JavaScript types.
#### Parameters
 - <b>types</b> - Array of String - The JavaScript type of the parameters
 - <b>bytes</b> - String - A string of the encoded parameters to be decoded

#### Return Type
 - Array of various types - The ABI-decoded parameters. Types depend on the ones supplied.

[Back to top](#table-of-contents)

### coders.encodeFunctionSignature
```
kblib._extend.coders.encodeFunctionSignature(functionName, types)
```
Encodes the function name to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including types.
#### Parameters
 - <b>functionName</b> - String - the name of the function
 - <b>types</b> - Array of String | String - The solidity types of the parameters in the function signature

#### Return Type
 - String - The ABI-encoded function signature (pre-pended with '0x')

[Back to top](#table-of-contents)

### coders.encodeFunctionCall
```
kblib._extend.coders.encodeFunctionCall(functionName, types, params)
```
Encodes the function call for use with a contract ABI. which are the first 4 bytes of the sha3 hash of the function name including parameters.
#### Parameters
 - <b>functionName</b> - String - the name of the Function
 - <b>types</b> - Array of String | String - The solidity types of the parameters in the function signature
 - <b>params</b> - Array of String | String - The parameters to be used in the function call

#### Return Type
 - String - The ABI-encoded function call (pre-pended with '0x')

[Back to top](#table-of-contents)

