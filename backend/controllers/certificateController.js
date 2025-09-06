const blockchain = require('../blockchain/block');  // Import the singleton Blockchain instance

// Example method to add a certificate
exports.addCertificate = (req, res) => {
    const { certificateId, certificateName, issuedTo, issuedOn, expiryDate } = req.body;

    if (!certificateId || !certificateName || !issuedTo) {
        return res.status(400).json({
            message: 'Missing required fields'
        });
    }

    const certificate = {
        id: certificateId,
        name: certificateName,
        issuedTo: issuedTo,
        issuedOn: issuedOn,
        expiryDate: expiryDate || null  // Optional
    };

    blockchain.addCertificate(certificate);

    res.status(200).json({
        message: 'Certificate added successfully!',
        certificate: certificate
    });
};


// In certificateController.js
exports.verifyCertificate = (req, res) => {
    const { certificateId } = req.params;
    console.log("Verifying certificate in controller:", certificateId);
    
    const verificationResult = blockchain.verifyCertificate(certificateId);
    console.log("Controller verification result:", verificationResult);
    
    // Format the response correctly
    if (verificationResult.status === "valid") {
        res.status(200).json({
            message: 'Certificate is valid',
            status: 'valid',
            certificate: verificationResult.certificate
        });
    } else if (verificationResult.status === "not_found") {
        res.status(404).json({
            message: 'Certificate not found',
            status: 'not_found'
        });
    } else {
        res.status(200).json({
            message: `Certificate is ${verificationResult.status}`,
            status: verificationResult.status,
            certificate: verificationResult.certificate
        });
    }
};


exports.revokeCertificate = (req, res) => {
    const { certificateId, reason } = req.body;

    const certificate = blockchain.chain.find(block => block.data.id === certificateId);

    if (!certificate) {
        return res.status(404).json({ message: 'Certificate not found' });
    }

    if (certificate.data.revoked) {
        return res.status(400).json({ message: 'Certificate already revoked' });
    }

    const success = blockchain.revokeCertificate(certificateId, reason);
    if (!success) {
        return res.status(404).json({ message: 'Certificate not found' });
    }

    res.status(200).json({
        message: 'Certificate revoked successfully',
        certificateId,
        reason
    });
};


exports.searchCertificates = (req, res) => {
    const { name, issuedTo, course } = req.query;

    const results = blockchain.chain
        .map(block => block.data)
        .filter(cert =>
            (!name || cert.name?.toLowerCase().includes(name.toLowerCase())) &&
            (!issuedTo || cert.issuedTo?.toLowerCase().includes(issuedTo.toLowerCase())) &&
            (!course || cert.course?.toLowerCase().includes(course.toLowerCase()))
        );

    if (results.length === 0) {
        return res.status(404).json({ message: 'No matching certificates found' });
    }

    res.status(200).json({ results });
};


exports.getBlockchain = (req, res) => {
    res.status(200).json(blockchain.chain);
};
