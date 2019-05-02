# kanbanwebapi documentation


## Web3.eth

### Properties

| Property                | Return-type               | Description                                                      |
|-------------------------|---------------------------|------------------------------------------------------------------|
| eth.coinbase            | String                    | the coinbase address to which mining rewards will go             |
| eth.mining              | Boolean                   | checks whether the node is mining or not                         |
| eth.hashrate            | Number                    | number of hashes per second that the node is mining with         |
| eth.syncing             | syncing object or boolean | if node is syncing, returns syncing object, otherwise false      |
| eth.gasPrice            | BigNumber                 | current gas price oracle determined by median of last few blocks |// confirm if should exist
| eth.accounts            | array of accounts         | array of addresses controlled by node                            |// confirm return type & if works
| eth.blockNumber         | Object                    | object containing "blockNumber" and "blockNumberHex"             |
| eth.protocolVersion     | String                    | protocol version of the node in hexadecimal format               |// confirm if produces kanban version


### Methods

### eth.getBlock
```
kanbanwebapi.kanban.getBlock(blockHashOrBlockNumber [, returnTransactionObjects] [, callback])
```

#### Parameters
 - String|Number - The block number or block hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
 - Boolean - (optional, default false) If true, the returned block will contain all transactions as objects, if false it will only contains the transaction hashes.
 - Function - (optional) Optional callback, returns an error object as first parameter and the result as second.

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