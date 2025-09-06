    const crypto = require('crypto');  // Ensure crypto is required for hashing

    class Block {
        constructor(index, timestamp, data, previousHash = '') {
            this.index = index;
            this.timestamp = timestamp;

            this.data = {
                ...data,
                revoked: false,
                ownershipHistory: [{
                    owner: data.issuedTo,
                    transferredOn: data.issuedOn || new Date().toISOString()
                }]
            };

            this.previousHash = previousHash;
            this.hash = this.calculateHash();
        }

        calculateHash() {
            return crypto
                .createHash('sha256')
                .update(
                    this.index +
                    this.previousHash +
                    this.timestamp +
                    JSON.stringify(this.data)
                )
                .digest('hex');
        }
    }

    class Blockchain {
        constructor() {
            this.chain = [this.createGenesisBlock()];
        }

        createGenesisBlock() {
            return new Block(0, "01/01/2023", "Genesis Block", "0");
        }

        getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }

        addCertificate(certificate) {
            const newBlock = new Block(
                this.chain.length,
                Date.now(),
                certificate,
                this.getLatestBlock().hash
            );
            this.chain.push(newBlock);
        }

        // Example for verifyCertificate function in blockchain.js
        verifyCertificate(certificateId) {
            console.log(`Verifying certificate with ID: ${certificateId}`);
        
            // Locate the block with the certificate id
            const certificateBlock = this.chain.find(block => block.data.id === certificateId);
        
            // Handle case where the certificate isn't found
            if (!certificateBlock) {
                console.log("Certificate not found.");
                return { status: "not_found", certificate: null };
            }
        
            console.log("Found certificate block:", certificateBlock);
        
            // Calculate the current hash of the block and compare it with the stored hash
            const currentHash = certificateBlock.calculateHash();
            console.log("Current calculated hash:", currentHash);
            console.log("Stored hash:", certificateBlock.hash);
        
            const isTampered = currentHash !== certificateBlock.hash;
            const now = new Date();
            const expiry = new Date(certificateBlock.data.expiryDate);
        
            // Additional checks
            if (isTampered) {
                console.log("Certificate has been tampered.");
                return { status: "tampered", certificate: certificateBlock.data };
            } else if (certificateBlock.data.revoked) {
                console.log("Certificate has been revoked.");
                return { status: "revoked", certificate: certificateBlock.data };
            } else if (expiry < now) {
                console.log("Certificate has expired.");
                return { status: "expired", certificate: certificateBlock.data };
            } else {
                console.log("Certificate is valid.");
                return { status: "valid", certificate: certificateBlock.data };
            }
        }
        
        
        

        revokeCertificate(certificateId, reason) {
            const block = this.chain.find(block => block.data.id === certificateId);
            if (!block) return false;
        
            block.data.revoked = true;
            block.data.revocationReason = reason || 'No reason provided';
            block.hash = block.calculateHash();  // Update hash due to data change
        
            return true;
        }

        transferOwnership(certificateId, newOwner) {
            const block = this.chain.find(block => block.data.id === certificateId);
        
            if (!block || block.data.revoked) {
            return null;
            }
        
            const now = new Date().toISOString();
        
            block.data.ownershipHistory.push({
            owner: newOwner,
            transferredOn: now
            });
        
            block.data.issuedTo = newOwner;
        
            return block.data;
        }
        
        
        

    }

    module.exports = new Blockchain();  // Exports Blockchain instance
