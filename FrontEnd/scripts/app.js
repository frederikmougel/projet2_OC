import { fetchCategories, renderCategories } from './filters.js';
import { fetchWorks, renderWorks } from './works.js';

export let works = []
export let categories = []
export function setWorks(w){
    works = w
}
export function setCategories(c){
    categories = c
}

document.addEventListener('DOMContentLoaded', async () => {
    //LOGGED MODE (TOKEN) -> EDIT BUTTON DISPLAY & LOGIN NAV DISPLAY & HEADER BLACK DISPLAY
    const token = sessionStorage.getItem('token');
    const modifierText = document.querySelector('.edit-btn');
    const authLink = document.getElementById('auth-link');
    const headerBlack = document.getElementById('header-black');
    const headerContent = document.getElementById('header-content');

    if (token) {
        modifierText.classList.add('logged');

        headerBlack.style.display = "flex"

        headerContent.style.margin = "90px 0"

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
        await Promise.all([
            fetchCategories(),
            fetchWorks(),
        ]);

        renderCategories(categories, categoriesContainer, portfolioContainer);
        renderWorks(works, portfolioContainer);
        if (token) {
            categoriesContainer.innerHTML = '';
        }

    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
    }
});
