// Récupérer les projets depuis l'API
export async function fetchWorks(API_URL) {
    try {
        const res = await fetch(`${API_URL}/works`);
        if (!res.ok) throw new Error('Erreur lors de la récupération des travaux');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Afficher les projets
export function renderWorks(works, portfolioContainer) {
    portfolioContainer.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        figure.dataset.category = work.category.name;

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        portfolioContainer.appendChild(figure);
    });
}
