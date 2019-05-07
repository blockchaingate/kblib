# kanbanwebapi documentation


## Web3.eth

### Properties

| Property                   | Return-type               | Description                                                      |
|----------------------------|---------------------------|------------------------------------------------------------------|
| kanban.coinbase            | String                    | the coinbase address to which mining rewards will go             |
| kanban.mining              | Boolean                   | checks whether the node is mining or not                         |
| kanban.hashrate            | Number                    | number of hashes per second that the node is mining with         |
| kanban.syncing             | syncing object or boolean | if node is syncing, returns syncing object, otherwise false      |
| kanban.gasPrice            | BigNumber                 | current gas price oracle determined by median of last few blocks |// confirm if should exist
| kanban.accounts            | array of accounts         | array of addresses controlled by node                            |// confirm return type & if works
| kanban.blockNumber         | Object                    | object containing "blockNumber" and "blockNumberHex"             |
| kanban.protocolVersion     | String                    | protocol version of the node in hexadecimal format               |// confirm if kanban version


### Methods

### kanban.getBlock
```
kanbanwebapi.kanban.getBlock(blockHashOrBlockNumber [, returnTransactionObjects])
```

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


### kanban.getTransaction
```
kanbanwebapi.kanban.getTransaction(transactionHash)
```

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




### kanban.getTransactionReceipt
```
kanbanwebapi.kanban.getTransactionReceipt(transactionHash)
```

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


### kanban.getTransactionCount
```
kanbanwebapi.kanban.getTransactionCount(address [, defaultBlock])
```

#### Parameters
 - <b>address</b> - String - The address that you want to see the transaction count of
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - Number - The number of transactions sent from the address in the given (or latest) block


### kanban.getBlockTransactionCount
```
kanbanwebapi.kanban.getBlockTransactionCount(blockHashOrBlockNumber)
```

#### Parameters
 - <b>blockHashOrBlockNumber</b> - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.

#### Return Type
 - Number - The number of transactions in the given block



### kanban.getUncle
```
kanbanwebapi.kanban.getUncle(blockHashOrNumber, uncleIndex)
```

#### Parameters
 - <b>blockHashOrNumber</b> - String|Number - The hash or block number of the block containing the transaction
 - <b>uncleIndex</b> - Number - The index of the uncle for the chosen block

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


### kanban.getBalance
```
kanbanwebapi.kanban.getBalance(address [, defaultBlock])
```

#### Parameters
 - <b>address</b>  - String - The address to get the balance of
 - <b>defaultBlock</b>  - Number|String - (optional) - if you pass this parameter it will not use the default block set with kanbanwebapi.kanban.defaultBlock.

#### Return Type
 - balance object:
    * <b>BTC</b> - String - The Bitcoin balance in hexadecimal format
    * <b>ETH</b> - String - The Ether balance in hexadecimal format
    * <b>FAB</b> - String - The FABcoin balacne in hexadecimal format


### personal.newAccount
```
kanbanwebapi.personal.newAccount(password)
```

#### Parameters
 - <b> password</b>  - String - the password you wish to use to secure the account

#### Return Type
 - String - Address of the newly created account


### personal.unlockAccount
```
kanbanwebapi.personal.unlockAccount(address, password, unlockDuration)
```

#### Parameters
 - <b> address</b>  - String - The account address to unlock
 - <b> password</b>  - String - The account password
 - <b> unlockDuration</b>  - Number - The duration for the account to remain unlocked.

#### Return Type
 - Boolean - True if the account was unlocked successfully otherwise false


### personal.lockAccount
```
kanbanwebapi.kanban.lockAccount(address)
```

#### Parameters
 - <b>address</b>  - String - The account address to lock

#### Return Type
 - Boolean - True if the account was locked successfully otherwise false


### kanban.sendTransaction
```
kanbanwebapi.kanban.sendTransaction(transactionObject)
```

#### Parameters
 - <b>transactionObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified. Or an address or index of a local wallet in web3.eth.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to web3.eth.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

#### Return Type
 - "transactionHash" - String - 32 byte hash of the transaction if one is available


### kanban.getStorageAt

```
kanbanwebapi.kanban.getStorageAt(address, position [, defaultBlock])
```

#### Parameters
 - <b>address</b> - String - The address of the smart contract
 - <b>position</b> - Number - The index position of the storage.
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The value in storage at the given position, as a hex string


### kanban.getCode

```
kanbanwebapi.kanban.getCode(address [, defaultBlock])
```

#### Parameters
 - <b>address</b> - String - The address of the smart contract
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The code at the given address, as a hex string


### kanban.call

```
kanbanwebapi.kanban.call(callObject [, defaultBlock])
```
Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
#### Parameters
 - <b>callObject</b> - transaction Object - The transaction object to send:
    + <b>from</b> - String|Number: (optional) The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified. Or an address or index of a local wallet in web3.eth.accounts.wallet.
    + <b>to</b> - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
    + <b>coin</b> - String (optional) The type of coin you wish to send. Currently supports ("FAB", "BTC", "ETH"). Default "FAB". 
    + <b>value</b> - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
    + <b>gas</b> - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    + <b>gasPrice</b> - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to web3.eth.gasPrice.
    + <b>data</b> - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
    + <b>nonce</b> - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
 - <b>defaultBlock</b> - String|Number - (optional, default "latest") The block number in decimal or hex format. Or the string "genesis", "latest" or "pending".

#### Return Type
 - String - The returned data of the call, e.g. a smart contract functions return value.
