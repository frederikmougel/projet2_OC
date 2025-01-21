const API_URL = 'http://localhost:5678/api';

// Récupérer les projets
export async function fetchWorks() {
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
        figure.setAttribute('data-id', work.id);

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

// Supprimer un projet
export async function deleteWork(id) {
    try {
        const res = await fetch(`${API_URL}/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, 
            },
        });

        if (!res.ok) throw new Error(`Erreur lors de la suppression du travail avec l'ID ${id}`);
        
        console.log(`Travail avec l'ID ${id} supprimé avec succès.`);
        const works = JSON.parse(sessionStorage.getItem('works')) || [];
        const updatedWorks = works.filter(work => work.id !== id);
        sessionStorage.setItem('works', JSON.stringify(updatedWorks));

        const portfolioModalContainer = document.querySelector('.modal-portfolio');
        const workModalElement = portfolioModalContainer.querySelector(`[data-id="${id}"]`);
        if (workModalElement) workModalElement.remove();

        const portfolioContainer = document.querySelector('.gallery');
        const workElement = portfolioContainer.querySelector(`[data-id="${id}"]`);
        if (workElement) workElement.remove();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
