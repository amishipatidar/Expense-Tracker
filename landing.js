// Retrieve the email from localStorage
const userEmail = localStorage.getItem('userEmail');

// Display the email in the landing page
document.getElementById('user-email').textContent = userEmail || 'Guest';
