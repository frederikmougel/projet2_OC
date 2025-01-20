import { fetchCategories, renderCategories } from './filters.js';
import { fetchWorks, renderWorks } from './works.js';

const API_URL = 'http://localhost:5678/api';

document.addEventListener('DOMContentLoaded', async () => {
    const categoriesContainer = document.querySelector('.categories');
    const portfolioContainer = document.querySelector('.gallery');

    try {
        // Récupérer les catégories et les travaux
        const [categories, works] = await Promise.all([
            fetchCategories(API_URL),
            fetchWorks(API_URL),
        ]);

        // Afficher les catégories et les travaux
        renderCategories(categories, categoriesContainer, portfolioContainer);
        renderWorks(works, portfolioContainer);
    } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
    }
});
