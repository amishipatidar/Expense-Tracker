document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevents the form from submitting and reloading the page

    // Get the email entered by the user
    const email = document.getElementById('email').value;

    // Save the email to localStorage
    localStorage.setItem('userEmail', email);

    // Redirect to the landing page
    window.location.href = 'landing.html';
});
