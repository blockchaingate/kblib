# kanbanwebapi documentation

## Table of Contents

- [Kanbanwebapi](#Kanbanwebapi)
   * [sha3](#sha3)
- [Kanbanwebapi.kanban](#Kanbanwebapi.kanban)
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
- [Kanbanwebapi.kanban.personal](#Kanbanwebapi.kanban.personal)
   * [personal.newAccount](#personal.newAccount)
   * [personal.unlockAccount](#personal.unlockAccount)
   * [personal.lockAccount](#personal.lockAccount)
   * [](#)


## Kanbanwebapi

### sha3
```
kanbanwebapi.sha3(stringToHash)
```
Will calculate the keccak256 of the input.
#### Parameters
 - <b>stringToHash</b> - String - The string to be hashed

#### Return Type
 - String - sha3/keccak256 hashed version of stringToHash


## Kanbanwebapi.kanban

### Properties

| Property                   | Return-type               | Description                                                      |
|----------------------------|---------------------------|------------------------------------------------------------------|
| kanban.coinbase            | String                    | the coinbase address to which mining rewards will go             |
| kanban.mining              | Boolean                   | checks whether the node is mining or not                         |
| kanban.hashrate            | Number                    | number of hashes per second that the node is mining with         |
| kanban.syncing             | syncing object or boolean | if node is syncing, returns syncing object, otherwise false      |
| kanban.gasPrice            | BigNumber                 | current gas price oracle determined by median of last few blocks |
| kanban.accounts            | array of String           | array of addresses controlled by node                            |
| kanban.blockNumber         | Object                    | object containing "blockNumber" and "blockNumberHex"             |
| kanban.protocolVersion     | String                    | protocol version of the node in hexadecimal format               |confirm if kanban version
| version.network            | String                    | which kanban network the node is a part of                       |eg. 1 = mainnet,  2 = testnet1,
| net.peerCount              | Number                    | Returns number of peers currently connected to the client        |
| net.listening              | Boolean                   | Returns true if client is listening for network connections.     |

[Back to top](#Table-of-Contents)

### kanban.getBlock
```
kanbanwebapi.kanban.getBlock(blockHashOrBlockNumber [, returnTransactionObjects])
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
kanbanwebapi.kanban.getTransaction(transactionHash)
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
kanbanwebapi.kanban.getTransactionFromBlock(blockHashOrNumber, indexNumber)
```
Returns a transaction based on a block hash or number and the transactions index position.
#### Parameters
 - <b>blockHashOrNumber</b> - String|Number - The hash or block number of the block containing the transaction
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
kanbanwebapi.kanban.getTransactionReceipt(transactionHash)
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
kanbanwebapi.kanban.pendingTransactions()
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
kanbanwebapi.kanban.getTransactionCount(address [, defaultBlock])
```
Get the numbers of transactions sent from this address.
#### Parameters
 - <b>address</b> - String - The address that you want to see the transaction count of
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - Number - The number of transactions sent from the address in the given (or latest) block

[Back to top](#Table-of-Contents)

### kanban.getBlockTransactionCount
```
kanbanwebapi.kanban.getBlockTransactionCount(blockHashOrBlockNumber)
```
Returns the number of transaction in a given block.
#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.

#### Return Type
 - Number - The number of transactions in the given block

[Back to top](#Table-of-Contents)

### kanban.getUncle
```
kanbanwebapi.kanban.getUncle(blockHashOrNumber, uncleIndex)
```
Returns a blocks uncle by a given uncle index position.
#### Parameters
 - <b>blockHashOrNumber</b> - String|Number - The hash or block number. Or the string "genesis", "latest" or "pending" as in the default block parameter.
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
kanbanwebapi.kanban.getUncleCount(blockHashOrNumber)
```
Returns then number of uncles for a given block.
#### Parameters
 - <b>blockHashOrNumber</b> - String|Number - The hash or block number. Or the string "genesis", "latest" or "pending" as in the default block parameter. If left blank, this method will not default to anything.

#### Return Type
 - Number : The chosen block's uncle count

[Back to top](#Table-of-Contents)

### kanban.getBalance
```
kanbanwebapi.kanban.getBalance(address [, defaultBlock])
```
Get the balance of an address at a given block.
#### Parameters
 - <b>address</b>  - String - The address to get the balance of
 - <b>defaultBlock</b>  - Number|String - (optional) - if you pass this parameter it will not use the default block set with kanbanwebapi.kanban.defaultBlock.

#### Return Type
 - balance object:
    * <b>BTC</b> - String - The Bitcoin balance in hexadecimal format
    * <b>ETH</b> - String - The Ether balance in hexadecimal format
    * <b>FAB</b> - String - The FABcoin balacne in hexadecimal format

[Back to top](#Table-of-Contents)

### kanban.sendTransaction
```
kanbanwebapi.kanban.sendTransaction(transactionObject)
```
Sends a transaction to the network.
#### Parameters
 - <b>transactionObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: The address for the sending account. Uses the kanbanwebapi.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kanbanwebapi.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kanbanwebapi.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

#### Return Type
 - "transactionHash" - String - 32 byte hash of the transaction

[Back to top](#Table-of-Contents)

### kanban.sign
```
kanbanwebapi.kanban.sign(address, dataToSign)
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
kanbanwebapi.kanban.signTransaction(transactionOptions)
```
Signs a transaction with the private key of the given address. If the given address is a local unlocked account, the transaction will be signed locally.
#### Parameters
 - <b>transactionOptions</b> - transaction Object - The transaction object to send:
      * <b>from</b> - String|Number: The address for the sending account. Uses the kanbanwebapi.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kanbanwebapi.kanban.accounts.wallet
      * <b>nonce</b> - String: (optional) The nonce to use when signing this transaction. Default will use kanbanwebapi.kanban.getTransactionCount().
      * <b>chainId</b> - String: (optional) The chain id to use when signing this transaction. Default will use kanbanwebapi.kanban.net.getId().
      * <b>to</b> - String: (optional) The receiver of the transaction, can be empty when deploying a contract.
      * <b>data</b> - String: (optional) The call data of the transaction, can be empty for simple value transfers.
      * <b>value</b> - String: (optional) The value of the transaction in wei.
      * <b>gasPrice</b> - String: (optional) The gas price set by this transaction, if empty, it will use kanbanwebapi.kanban.gasPrice()
      * <b>gas</b> - String: The gas provided by the transaction.
 - <b>address</b>  - String - (optional) The account address

#### Return Type
 - Object :
   * <b>raw</b> - String - The RLP encoded transaction, ready to be sent using kanbanwebapi.kanban.sendSignedTransaction
   * <b>tx</b> - Object :
      + <b>nonce</b> - String - The nonce to used when signing this transaction as a hexidecimal string
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
kanbanwebapi.kanban.sendRawTransaction(signedTransactionData)
```
Sends an already signed transaction, generated for example using kanbanwebapi.kanban.accounts.signTransaction
#### Parameters
 - <b>signedTransactionData</b> - String - signed transaction data in hex format

#### Return Type
 - String - 32 byte hash of the transaction

[Back to top](#Table-of-Contents)

### kanban.getStorageAt
```
kanbanwebapi.kanban.getStorageAt(address, position [, defaultBlock])
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
kanbanwebapi.kanban.getCode(address [, defaultBlock])
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
kanbanwebapi.kanban.call(callObject [, defaultBlock])
```
Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
#### Parameters
 - <b>callObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: (optional) The address for the sending account. Uses the kanbanwebapi.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kanbanwebapi.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kanbanwebapi.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The returned data of the call, e.g. a smart contract functions return value.

[Back to top](#Table-of-Contents)

### kanban.estimateGas
```
kanbanwebapi.kanban.estimateGas(callObject)
```
Executes a message call or transaction and returns the amount of the gas used.
#### Parameters
 - <b>callObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: (optional) The address for the sending account. Uses the kanbanwebapi.kanban.defaultAccount property, if not specified. Or an address or index of a local wallet in kanbanwebapi.kanban.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to kanbanwebapi.kanban.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

#### Return Type
 - Number - The amount of gas used in the simulated execution of the call

[Back to top](#Table-of-Contents)

### kanban.getWork
```
kanbanwebapi.kanban.getWork()
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
kanbanwebapi.kanban.submitWork(callObject)
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
kanbanwebapi.kanban.getLogs(options)
```
Returns an array of all logs matching a given filter object.
#### Parameters
   - filter object::
      * fromBlock - Number|String - (optional, default 'latest') integer block number or 'latest', 'pending', or 'earliest'
      * toBlock - Number|String - (optional, default 'latest') integer block number or 'latest', 'pending', or 'earliest'
      * address - String|Array - (optional) Contract address or a list of addresses from which logs should originate.
      * topics - Array of String- (optional) array of 32 Byte topic strings. Topis are order-dependent. Each topic can also be an array of String with "or" options 
      * blockhash - String (32 Byte hex) - (optional) Restricts the logs returned to the single block with the 32-byte hash blochHash. using blockHash is equivalent to fromBlock = toBlock = the block number with hash blockHash. In order to use blockHash, fromBlock and toBlock must not be specified.

#### Return Type
   - Array of log objects:
      * for filters created with kanban_newBlockFilter, the returned are block hashes (32 Byte hex string)
      * for filters created with kanban_newPendingTransactonFilter, the returned are transaction hashes (32 Byte hex string) 
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

## Kanbanwebapi.kanban.personal

### personal.newAccount
```
kanbanwebapi.personal.newAccount(password)
```
Create a new account on the node that kanbanwebapi is connected to with its provider. The RPC method used is personal_newAccount. 
#### Parameters
 - <b> password</b>  - String - the password you wish to use to secure the account

#### Return Type
 - String - Address of the newly created account

[Back to top](#Table-of-Contents)

### personal.unlockAccount
```
kanbanwebapi.personal.unlockAccount(address, password, unlockDuration)
```
Unlocks the given account.
#### Parameters
 - <b> address</b>  - String - The account address to unlock
 - <b> password</b>  - String - The account password
 - <b> unlockDuration</b>  - Number - The duration for the account to remain unlocked.

#### Return Type
 - Boolean - True if the account was unlocked successfully otherwise false

[Back to top](#Table-of-Contents)

### personal.lockAccount
```
kanbanwebapi.kanban.lockAccount(address)
```
Locks the given account.
#### Parameters
 - <b>address</b>  - String - The account address to lock

#### Return Type
 - Boolean - True if the account was locked successfully otherwise false

[Back to top](#Table-of-Contents)

## Kanbanwebapi.net