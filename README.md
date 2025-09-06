# Proofo

Proofo is a blockchain-based certificate verification system. It allows users to submit, verify, and revoke certificates using a secure and transparent blockchain backend, with a simple web-based frontend.

## Features

- Submit certificates to the blockchain
- Verify certificate authenticity
- Revoke certificates
- RESTful API backend (Node.js/Express)
- Simple frontend for user interaction

## Project Structure

```
Proofo/
├── backend/
│   ├── blockchain/              # Blockchain logic (block.js)
│   ├── controllers/             # API controllers
│   ├── models/                  # Data models
│   ├── routes/                  # API routes
│   ├── server.js                # Express server entry point
│   └── package.json             # Backend dependencies
├── frontend/
│   ├── css/                     # Stylesheets
│   ├── js/                      # Frontend JS logic
│   ├── index.html               # Main page
│   ├── submitCertificate.html   # Submit certificate page
│   ├── verifyCertificate.html   # Verify certificate page
│   └── revokeCertificate.html   # Revoke certificate page
├── Dockerfile                   # Containerization
├── LICENSE.md                   # License information
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### Installation

1. Clone the repository:
	```sh
	git clone https://github.com/SolarisXD/Proofo.git
	cd Proofo
	```

2. Install backend dependencies:
	```sh
	cd backend
	npm install
	```

3. (Optional) Run with Docker:
	```sh
	docker build -t proofo .
	docker run -p 3000:3000 proofo
	```

### Running the Backend

```sh
cd backend
npm start
```

The backend server will start on `http://localhost:3000`.

### Using the Frontend

Open `frontend/index.html` in your browser. Use the navigation to submit, verify, or revoke certificates.

## API Endpoints

- `POST /api/certificates` — Submit a certificate
- `GET /api/certificates/:id` — Verify a certificate
- `POST /api/certificates/revoke` — Revoke a certificate

## License

See `LICENSE.md` for details.
# Proofo
