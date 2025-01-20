const API_URL = 'http://localhost:5678/api';

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Erreur dans l’identifiant ou le mot de passe');
        }

        const result = await response.json();
        sessionStorage.setItem('token', result.token);
        loginForm.reset();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erreur :', error);
        alert('Erreur dans l’identifiant ou le mot de passe');
    }
});

