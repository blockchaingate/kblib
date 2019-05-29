# kblib documentation

## Table of Contents

- [Kblib](#Kblib)
   * [sha3](#sha3)
- [Kblib.kanban](#Kblib.kanban)
   * [Properties](#Properties)
   * [kanban.getBlock](#kanban.getBlock)
   * [kanban.getTransaction](#kanban.getTransaction)
   * [kanban.getTransactionFromBlock](#kanban.getTransactionFromBlock)
   * [kanban.getTransactionReceipt](#kanban.getTransactionReceipt)
   * [kanban.pendingTransactions](#kanban.pendingTransactions)
   * [kanban.getTransactionCount](#kanban.getTransactionCount)
   * [kanban.getBlockTransactionCount](#kanban.getBlockTransactionCount)
   * [kanban.getUncle](#kanban.getUncle)
   * [kanban.getUncleCount](#kanban.getUncleCount)
   * [kanban.getBalance](#kanban.getBalance)
   * [kanban.sendTransaction](#kanban.sendTransaction)
   * [kanban.sign](#kanban.sign)
   * [kanban.signTransaction](#kanban.signTransaction)
   * [kanban.sendRawTransaction](#kanban.sendRawTransaction)
   * [kanban.getStorageAt](#kanban.getStorageAt)
   * [kanban.getCode](#kanban.getCode)
   * [kanban.call](#kanban.call)
   * [kanban.estimateGas](#kanban.estimateGas)
   * [kanban.getWork](#kanban.getWork)
   * [kanban.submitWork](#kanban.submitWork)
   * [kanban.getLogs](#kanban.getLogs)
- [Kblib.kanban.personal](#Kblib.kanban.personal)
   * [personal.newAccount](#personal.newAccount)
   * [personal.unlockAccount](#personal.unlockAccount)
   * [personal.lockAccount](#personal.lockAccount)
   * [personal.importRawKey](#personal.importRawKey)
   * [personal.ecRecover](#personal.ecRecover)
   * [personal.sendTransaction](#personal.sendTransaction)
- [Kblib._extend.utils](#Kblib._extend.utils)
   * [utils.padLeft](#utils.padLeft)
   * [utils.padRight](#utils.padRight)
   * [utils.toHex](#utils.toHex)
   * [utils.toDecimal](#utils.toDecimal)
   * [utils.fromDecimal](#utils.fromDecimal)
   * [utils.toUtf8](#utils.toUtf8)
   * [utils.toAscii](#utils.toAscii)
   * [utils.fromUtf8](#utils.fromUtf8)
   * [utils.fromAscii](#utils.fromAscii)
   * [utils.toWei](#utils.toWei)
   * [utils.fromWei](#utils.fromWei)
   * [utils.toBigNumber](#utils.toBigNumber)
   * [utils.toTwosComplement](#utils.toTwosComplement)
   * [utils.isBigNumber](#utils.isBigNumber)
   * [utils.isStrictAddress](#utils.isStrictAddress)
   * [utils.isAddress](#utils.isAddress)
   * [utils.isChecksumAddress](#utils.isChecksumAddress)
   * [utils.toChecksumAddress](#utils.toChecksumAddress)
   * [utils.isFunction](#utils.isFunction)
   * [utils.isString](#utils.isString)
   * [utils.isObject](#utils.isObject)
   * [utils.isBoolean](#utils.isBoolean)
   * [utils.isArray](#utils.isArray)
   * [utils.isJson](#utils.isJson)
- [Kblib._extend.coders](#Kblib._extend.coders)
   * [coders.encodeParam](#coders.encodeParam)
   * [coders.encodeParams](#coders.encodeParams)
   * [coders.decodeParam](#coders.decodeParam)
   * [coders.decodeParams](#coders.decodeParams)
   * [coders.encodeFunctionSignature](#coders.encodeFunctionSignature)
   * [coders.encodeFunctionCall](#coders.encodeFunctionCall)
- [Kblib.iban](#Kblib.iban)
   * [iban.fromAddress](#iban.fromAddress)
   * [iban.fromBban](#iban.fromBban)
   * [iban.createIndirect](#iban.createIndirect)
   * [iban.isValid](#iban.isValid)

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

[Back to top](#Table-of-Contents)

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
| kanban.personal.listAccounts | Array of Strings          | Returns an array of addresses controlled by the node             |


[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### kanban.getBlockTransactionCount
```
kblib.kanban.getBlockTransactionCount(blockHashOrBlockNumber)
```
Returns the number of transaction in a given block.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.

#### Return Type
 - Number - The number of transactions in the given block

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### kanban.getUncleCount
```
kblib.kanban.getUncleCount(blockHashOrBlockNumber)
```
Returns then number of uncles for a given block.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The hash or block number. Or the string "genesis", "latest" or "pending" as in the default block parameter. If left blank, this method will not default to anything.

#### Return Type
 - Number : The chosen block's uncle count

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### kanban.sendTransaction
```
kblib.kanban.sendTransaction(transactionObject)
```
Sends a transaction to the network.
#### Parameters
 - <b>transactionObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: The address for the sending account. Uses the kblib.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kblib.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kblib.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

#### Return Type
 - "transactionHash" - String - 32 byte hash of the transaction

[Back to top](#Table-of-Contents)

### kanban.sign
```
kblib.kanban.sign(address, dataToSign)
```
Signs a transaction with the private key of the given address. If the given address is a local unlocked account, the transaction will be signed locally.
#### Parameters
 - <b>address</b>  - String|Number - Address to sign data with. Or an address or index of a local wallet in kanban.accounts.wallet
 - <b>dataToSign</b> - String - Data to sign. If String it will be converted using utils.utf8ToHex.

#### Return Type
 - Object :
   * <b>signature</b> - String - The signature

[Back to top](#Table-of-Contents)

### kanban.signTransaction
```
kblib.kanban.signTransaction(transactionOptions)
```
Signs a transaction with the private key of the given address. If the given address is a local unlocked account, the transaction will be signed locally.
#### Parameters
 - <b>transactionOptions</b> - transaction Object - The transaction object to send:
      * <b>from</b> - String|Number: The address for the sending account.
      * <b>nonce</b> - String: The nonce to use when signing this transaction. Default will use kblib.kanban.getTransactionCount().
      * <b>chainId</b> - String: (optional) The chain id to use when signing this transaction. Default will use kblib.kanban.net.getId().
      * <b>to</b> - String: (optional) The receiver of the transaction, can be empty when deploying a contract.
      * <b>data</b> - String: (optional) The call data of the transaction, can be empty for simple value transfers.
      * <b>value</b> - String: (optional) The value of the transaction in wei.
      * <b>gasPrice</b> - String: (optional) The gas price set by this transaction, if empty, it will use kblib.kanban.gasPrice()
      * <b>gas</b> - String: The gas provided by the transaction.
 - <b>address</b>  - String - (optional) The account address

#### Return Type
 - Object :
   * <b>raw</b> - String - The RLP encoded transaction, ready to be sent using kblib.kanban.sendSignedTransaction
   * <b>tx</b> - Object :
      + <b>nonce</b> - String - The nonce to used when signing this transaction as a hexadecimal string
      + <b>gasPrice</b> - String - The gas price set by this transaction in hexadecimal format
      + <b>gas</b> - The gas provided by the transaction in hexadecimal format
      + <b>to</b> - String - The receiver address of the transaction, can be empty when deploying a contract.
      + <b>value</b> - String - The hexadecimal value of the transaction in wei.
      + <b>input</b> - String - hexadecimal data/input field supplied for the transaction
      + <b>v</b> - String - Recovery value + 27
      + <b>r</b> - String - First 32 bytes of the signature
      + <b>s</b> - String - Next 32 bytes of the signature
      + <b>hash</b> - String - Hash of the transaction

[Back to top](#Table-of-Contents)

### kanban.sendRawTransaction
```
kblib.kanban.sendRawTransaction(signedTransactionData)
```
Sends an already signed transaction, generated for example using kblib.kanban.accounts.signTransaction
#### Parameters
 - <b>signedTransactionData</b> - String - signed transaction data in hex format

#### Return Type
 - String - 32 byte hash of the transaction

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

## Kblib.kanban.personal

### personal.newAccount
```
kblib.personal.newAccount(password)
```
Create a new account on the node that kblib is connected to with its provider. The RPC method used is personal_newAccount. 
#### Parameters
 - <b> password</b> - String - the password you wish to use to secure the account

#### Return Type
 - String - Address of the newly created account

[Back to top](#Table-of-Contents)

### personal.unlockAccount
```
kblib.personal.unlockAccount(address, password, unlockDuration)
```
Unlocks the given account.
#### Parameters
 - <b> address</b> - String - The account address to unlock
 - <b> password</b> - String - The account password
 - <b> unlockDuration</b> - Number - The duration for the account to remain unlocked.

#### Return Type
 - Boolean - True if the account was unlocked successfully otherwise false

[Back to top](#Table-of-Contents)

### personal.lockAccount
```
kblib.personal.lockAccount(address)
```
Locks the given account.
#### Parameters
 - <b>address</b> - String - The account address to lock

#### Return Type
 - Boolean - True if the account was locked successfully otherwise false

[Back to top](#Table-of-Contents)

### personal.importRawKey
```
kblib.personal.importRawKey(privateKey, password)
```
Imports the given private key into the key store, encrypting it with the passphrase. Returns the address of the new account.
#### Parameters
 - <b>privateKey</b> - String - An unencrypted private key (hex string).
 - <b>password</b> - String - The password of the account. Warning: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

#### Return Type
 - String - The address of the new account.

[Back to top](#Table-of-Contents)

### personal.ecRecover
```
kblib.personal.ecRecover(dataThatWasSigned, signature)
```
Recovers the account that signed the data.
#### Parameters
 - <b>dataThatWasSigned</b> - String - Data that was signed. If String it will be converted using kblib.utils.utf8ToHex.
 - <b>signature</b> - String - The signature.

#### Return Type
 - String - The address of the original signer of the data

[Back to top](#Table-of-Contents)

### personal.sendTransaction
```
kblib.personal.sendTransaction(transactionObject, password)
```
This method sends a transaction over the management API.
#### Parameters
 - <b>transactionObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: The address for the sending account. Uses the kblib.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kblib.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kblib.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
 - <b>password</b> - the passphrase for the account.  Warning: Sending your account password over an unsecured HTTP RPC connection is highly unsecure.

#### Return Type
 - "transactionHash" - String - 32 byte hash of the transaction

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### utils.toHex
```
kblib._extend.utils.toHex(mixed)
```
Will auto convert any given value to HEX. Number strings will interpreted as numbers. Text strings will be interpreted as UTF-8 strings.
#### Parameters
 - <b>mixed</b> - String|Number|BN|BigNumber - The input to convert to hex.

#### Return Type
 - String - The resulting hex string

[Back to top](#Table-of-Contents)

### utils.toDecimal
```
kblib._extend.utils.toDecimal(hex)
```
Returns the number representation of a given HEX value. This is not useful for big numbers
#### Parameters
 - <b>hexString</b> - String|HEX - A string to convert to decimal representation

#### Return Type
 - Number - The decimal representation of the hex string

[Back to top](#Table-of-Contents)

### utils.fromDecimal
```
kblib._extend.utils.fromDecimal(number)
```
Returns the HEX representation of a given number value.
#### Parameters
 - <b>number</b> - String|Number|BN|BigNumber - A number as a string or number

#### Return Type
 - String - A hex string representation of the number

[Back to top](#Table-of-Contents)

### utils.toUtf8
```
kblib._extend.utils.toUtf8(hex)
```
Returns the UTF-8 string representation of a given HEX value.
#### Parameters
 - <b>hex</b> - String - A hex string to convert to a UTF-8 string

#### Return Type
 - String - The UTF-8 string

[Back to top](#Table-of-Contents)

### utils.toAscii
```
kblib._extend.utils.toAscii(hex)
```
Returns the ASCII string representation of a given HEX value.
#### Parameters
 - <b>hex</b> - String - A hex string to convert to an ASCII string

#### Return Type
 - String - The ASCII string

[Back to top](#Table-of-Contents)

### utils.fromUtf8
```
kblib._extend.utils.fromUtf8(string)
```
Returns the HEX representation of a given UTF-8 string.
#### Parameters
 - <b>string</b> - String - A UTF-8 string to convert to as hex string.

#### Return Type
 - String - The hex string

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### utils.toBigNumber
```
kblib._extend.utils.toBigNumber(number)
```
Convert a number from various forms to to a BigNumber
#### Parameters
 - <b>number</b> - String|Number|Hex - Parameter Description

#### Return Type
 - BigNumber - BigNumber format of the number

[Back to top](#Table-of-Contents)

### utils.toTwosComplement
```
kblib._extend.utils.toTwosComplement()
```
Converts a negative number into a two’s complement.
#### Parameters
 - <b>number</b> - Number|String|BigNumber - The number to convert.

#### Return Type
 - String - The converted hex string

[Back to top](#Table-of-Contents)

### utils.isBigNumber
```
kblib._extend.utils.isBigNumber(bigNumber)
```
Description goes here
#### Parameters
 - <b>bigNumber</b> - BigNumber Object - A BigNumber.js instance

#### Return Type
 - Boolean - true if bigNumber is a an instance of BigNumber

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### utils.isChecksumAddress
```
kblib._extend.utils.isChecksumAddress(address)
```
Checks if a given string is a valid Kanban address and ikf the address has both upper and lowercase letters.
#### Parameters
 - <b>address</b> - String - An address string

#### Return Type
 - Boolean - true if the address is valid and contains mixed case

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### utils.isFunction
```
kblib._extend.utils.isFunction(function)
```
Checks if the passed parameter is a function
#### Parameters
 - <b>function</b> - Object|other - The object you wish to verify is a function

#### Return Type
 - Boolean - true if the passed parameter is a function

[Back to top](#Table-of-Contents)

### utils.isString
```
kblib._extend.utils.isString(string)
```
Checks if the passed parameter is a string
#### Parameters
 - <b>string</b> - String|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is a String

[Back to top](#Table-of-Contents)

### utils.isObject
```
kblib._extend.utils.isObject(object)
```
Checks if the passed parameter is an object
#### Parameters
 - <b>object</b> - Object|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is an Object

[Back to top](#Table-of-Contents)

### utils.isBoolean
```
kblib._extend.utils.isBoolean(boolean)
```
Checks if the passed parameter is a boolean
#### Parameters
 - <b>boolean</b> - Boolean|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is a Boolean

[Back to top](#Table-of-Contents)

### utils.isArray
```
kblib._extend.utils.isArray(array)
```
Checks if the passed parameter is an array
#### Parameters
 - <b>array</b> - Array|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is an Array

[Back to top](#Table-of-Contents)

### utils.isJson
```
kblib._extend.utils.isString(string)
```
Checks if the passed parameter is a valid JSON string
#### Parameters
 - <b>string</b> - String|other - some passed parameter

#### Return Type
 - Boolean - true if the passed parameter is valid JSON string

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

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

[Back to top](#Table-of-Contents)

### coders.encodeFunctionSignature
```
kblib._extend.coders.encodeFunctionSignature(functionName, types)
```
Encodes the function name to its ABI signature, which are the first 4 bytes of the sha3 hash of the function name including types.
#### Parameters
 - <b>functionName</b> - String - the name of the function
 - <b>types</b> - String - The types of the parameters in the function signature

#### Return Type
 - String - The ABI-encoded function signature

[Back to top](#Table-of-Contents)

### coders.encodeFunctionCall
```
kblib._extend.coders.encodeFunctionCall(functionName, types, params)
```
Encodes the function call for use with a contract ABI. which are the first 4 bytes of the sha3 hash of the function name including parameters.
#### Parameters
 - <b>functionName</b> - String - the name of the Function
 - <b>types</b> - String - The types of the parameters in the function signature
 - <b>params</b> - String - The parameters to be used in the function call

#### Return Type
 - String - The ABI-encoded function call

[Back to top](#Table-of-Contents)

## Kblib.iban

### iban.fromAddress
```
kblib.iban.fromAddress(address)
```
Singleton: Converts an Kanban address to a direct IBAN instance.
#### Parameters
 - <b>address</b> - String - The Kanban address to convert

#### Return Type
 - Object - The IBAN instance

[Back to top](#Table-of-Contents)

### iban.fromBban
```
kblib.iban.fromBban(bbanAddress)
```
Singleton: Converts an BBAN address to a direct IBAN instance.
#### Parameters
 - <b>address</b> - String - The BBAN address to convert

#### Return Type
 - Object - The IBAN instance

[Back to top](#Table-of-Contents)

### iban.createIndirect
```
kblib.iban.createIndirect(options)
```
Singleton: Creates an indirect IBAN address from a institution and identifier.
#### Parameters
 - <b>options</b> - Object:
   * <b>institution</b> - the institution to be assigned 
   * <b>identifier</b> - the identifier to be assigned

#### Return Type
 - Object - The IBAN instance

[Back to top](#Table-of-Contents)

### iban.isValid
```
kblib.iban.isValid(ibanAddress)
```
Singleton: Checks if an IBAN address is valid.
#### Parameters
 - <b>ibanAddress</b> - String - the IBAN address to check.

#### Return Type
 - Boolean - true if ibanAddress is a valid IBAN address.

[Back to top](#Table-of-Contents)
