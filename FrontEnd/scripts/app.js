import { fetchCategories, renderCategories } from './filters.js';
import { fetchWorks, renderWorks } from './works.js';

document.addEventListener('DOMContentLoaded', async () => {
    //TOKEN -> EDIT BUTTON DISPLAY
    const token = sessionStorage.getItem('token');
    const modifierText = document.querySelector('.edit-btn');
    if (token) modifierText.classList.add('logged');


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

        const token = sessionStorage.getItem('token');
        if (token) {
            sessionStorage.setItem('categories', JSON.stringify(categories));
            sessionStorage.setItem('works', JSON.stringify(works));
        }

    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
    }
});
