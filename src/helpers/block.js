import sha256 from 'crypto-js/sha256.js';
import Transaction from './transaction.js';

class Block {
    constructor(timestamp, transactions, precedingHash = " ") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }

    computeHash() {
        return sha256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    proofOfWork(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.computeHash();
        }

        console.log("Block mined " + this.hash);
    }

    hasValidTransactions() {
        for (const transaction of this.transactions) {
            if (!transaction.isValid()) {
                return false;
            }
        }

        return true;
    }
}

export default Block;