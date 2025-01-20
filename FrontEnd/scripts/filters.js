// Récupérer les catégories depuis l'API
export async function fetchCategories(API_URL) {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des catégories');

        const categories = await res.json();
        const uniqueCategories = new Set(['Tous', ...categories.map(cat => cat.name)]);
        return Array.from(uniqueCategories);
    } catch (error) {
        console.error(error);
        return ['Tous'];
    }
}

// Afficher les catégories
export function renderCategories(categories, categoriesContainer, portfolioContainer) {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
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
