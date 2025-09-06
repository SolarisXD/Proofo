// Event listener for submit certificate form
document.getElementById('submitCertificate').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    const studentName = document.getElementById('studentName').value;
    const certificateId = document.getElementById('certificateId').value;
    const course = document.getElementById('course').value;
    const year = document.getElementById('year').value;  // Add year input field in HTML

    // Ensure you're sending all fields to the backend
    fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, id: certificateId, course: course, year: year })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
});


// Event listener for verify certificate form
document.getElementById('verifyCertificate').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    const certificateId = document.getElementById('verifyCertificateId').value;

    fetch(`/api/certificates/verify/${certificateId}`)  // Updated endpoint for verification
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('verificationResult');
            if (data) {  // Check if certificate data is returned
                result.innerHTML = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Course:</strong> ${data.course}</p>
                    <p><strong>Issued On:</strong> ${data.issuedOn}</p>
                `;
            } else {
                result.innerHTML = `<p>Certificate not found</p>`;
            }
        })
        .catch(error => console.error('Error:', error));  // Log any error that occurs
});
