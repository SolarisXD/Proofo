const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// Certificate APIs
router.post('/addCertificate', certificateController.addCertificate);
router.get('/verifyCertificate/:certificateId', certificateController.verifyCertificate);
router.post('/revokeCertificate', certificateController.revokeCertificate);  // New
router.get('/searchCertificates', certificateController.searchCertificates); // New
router.get('/chain', certificateController.getBlockchain);                   // New

// Alternate routes (can be kept or removed for consistency)
router.post('/submit', certificateController.addCertificate);
router.get('/verify/:certificateId', certificateController.verifyCertificate);

module.exports = router;
