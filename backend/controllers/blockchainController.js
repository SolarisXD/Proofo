const Blockchain = require('../models/blockchain');
const blockchain = new Blockchain();

exports.checkBlockchain = (req, res) => {
    if (blockchain.isValid()) {
        res.json({ message: 'Blockchain is valid' });
    } else {
        res.json({ message: 'Blockchain has been tampered with' });
    }
};
