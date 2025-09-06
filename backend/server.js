const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const certificateRoutes = require('./routes/certificateRoutes');
const blockchainRoutes = require('./routes/blockchainRoutes');
const blockchain = require('./blockchain/block');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable all CORS requests

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/certificates', certificateRoutes);
app.use('/api/blockchain', blockchainRoutes);

// Route to submit certificates
app.post('/api/certificates', (req, res) => {
    const { id, name, course, year } = req.body; // Extract year from request body

    if (!id || !name || !course || !year) {
        return res.status(400).send('Missing required fields for certificate submission');
    }

    const certificate = {
        id,
        name,
        course,
        year
    };

    try {
        blockchain.addCertificate(certificate);  // Add certificate to blockchain
        res.status(201).json({ message: 'Certificate submitted successfully' });

    } catch (error) {
        res.status(500).send('Error submitting certificate to blockchain');
    }
});


// Route to verify certificate by ID
app.get('/api/verifyCertificate/:id', (req, res) => {
    const certificate = blockchain.verifyCertificate(req.params.id); // Assuming verifyCertificate is defined
    if (certificate) {
        res.json({
            name: certificate.name,
            id: certificate.id,
            course: certificate.course,
            year: certificate.year
        });
    } else {
        res.status(404).send('Certificate not found');
    }
});


// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Function to get all certificates from the blockchain
function getAllCertificates(callback) {
    try {
        const certificates = blockchain.chain.map(block => block.data);  // Assuming certificates are in block data
        callback(null, certificates);
    } catch (error) {
        callback(error, null);
    }
}

// Route to fetch certificates
app.get('/getCertificates', (req, res) => {
    getAllCertificates((error, certificates) => {
        if (error) {
            return res.status(500).send('Error fetching certificates');
        }
        res.json(certificates);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
