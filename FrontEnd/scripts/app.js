import { fetchCategories, renderCategories } from './filters.js';
import { fetchWorks, renderWorks } from './works.js';

document.addEventListener('DOMContentLoaded', async () => {
    //TOKEN -> EDIT BUTTON DISPLAY & LOGIN NAV DISPLAY
    const token = sessionStorage.getItem('token');
    const modifierText = document.querySelector('.edit-btn');
    const authLink = document.getElementById('auth-link');

    if (token) {
        modifierText.classList.add('logged');

        authLink.textContent = 'logout';
        authLink.href = '';
        authLink.addEventListener('click', () => {
            sessionStorage.removeItem('token');
        });
    } else {
        authLink.textContent = 'login';
        authLink.href = './login.html';
    }


    //CATEGORIES ET TRAVAUX
    const categoriesContainer = document.querySelector('.categories');
    const portfolioContainer = document.querySelector('.gallery');
    try {
        const [categories, works] = await Promise.all([
            fetchCategories(),
            fetchWorks(),
        ]);

        renderCategories(categories, categoriesContainer, portfolioContainer);
        renderWorks(works, portfolioContainer);
        if (token) {
            sessionStorage.setItem('works', JSON.stringify(works));
            categoriesContainer.innerHTML = '';
        }

    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
    }
});
