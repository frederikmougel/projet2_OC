import { setCategories } from "./app.js";

const API_URL = 'http://localhost:5678/api';

// Récupérer les catégories
export async function fetchCategories() {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des catégories');

        const categories = await res.json();
        setCategories(categories)

        return categories
    } catch (error) {
        console.error(error);
        return ['Tous'];
    }
}

// Afficher les catégories
export function renderCategories(categories, categoriesContainer, portfolioContainer) {
    categoriesContainer.innerHTML = '';
    const updatedCategories = new Set(['Tous', ...categories.map(cat => cat.name)]);
    const newCategories = Array.from(updatedCategories);

    newCategories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.dataset.category = category;
        button.classList.add('category');
        if (category === 'Tous') button.classList.add('category-active');
        button.addEventListener('click', () => {
            const buttons = categoriesContainer.querySelectorAll('button');
            buttons.forEach(btn => btn.classList.remove('category-active'));
            button.classList.add('category-active');
            filterProjects(category, portfolioContainer);
        });
        categoriesContainer.appendChild(button);
    });
}

// Filtrer les projets
export function filterProjects(category, portfolioContainer) {
    const projects = portfolioContainer.querySelectorAll('figure');
    projects.forEach(project => {
        if (category === 'Tous' || project.dataset.category === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
