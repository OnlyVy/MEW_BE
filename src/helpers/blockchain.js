import Block from "./block.js";
import Transaction from "./transaction.js";

class BlockChain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 10;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    startGenesisBlock() {
        const timestamp = new Date().getTime();
        return new Block(timestamp, "Initial Block in the Chain", "0");
    }

    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    mindPendingTransactions(miningRewardAddress) {
        this.pendingTransactions.push(new Transaction(null, miningRewardAddress, this.miningReward));
        let block = new Block(Date.now(), this.pendingTransactions);
        block.precedingHash = this.obtainLatestBlock().hash;
        block.proofOfWork(this.difficulty);

        console.log("Block successfully mined");
        this.blockchain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction) {
        if (!transaction.senderAddress || !transaction.receiverAddress) {
            throw new Error("Transaction must include sender and receiver address");
        }

        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid transaction to chain");
        }

        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        this.pendingTransactions.push(transaction);
        // Making sure that the amount sent is not greater than existing balance
        // const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        // if (walletBalance < transaction.amount) {
        //     throw new Error('Not enough balance');
        // }

        // const pendingTransactionForWallet = this.pendingTransactions
        //     .filter(trans => trans.fromAddress === transaction.fromAddress);

        // if (pendingTransactionForWallet.length > 0) {
        //     const totalPendingAmount = pendingTransactionForWallet
        //         .map(trans => trans.amount)
        //         .reduce((prev, curr) => prev + curr);

        //     const totalAmount = totalPendingAmount + transaction.amount;
        //     if (totalAmount > walletBalance) {
        //         throw new Error('Pending transactions for this wallet is higher than its balance.');
        //     }
        // }
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.blockchain) {
            for (const transaction of block.transactions) {
                if (transaction.senderAddress === address) {
                    balance -= transaction.amount;
                }
                else if (transaction.receiverAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash)
                return false;
        }
        return true;
    }

    getAllTransactionsForWallet(address) {
        const transactions = [];
    
        for (const block of this.blockchain) {
          for (const trans of block.transactions) {
            if (trans.senderAddress === address || trans.receiverAddress === address) {
               transactions.push(trans);
            }
          }
        }
    
        return transactions;
      }
}

export default BlockChain;