import { deleteWork } from "./works.js";

const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
openModalBtn.onclick = function() {
    modal.style.display = 'flex';
    renderWorksModal()
}
closeModalBtn.onclick = function() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function renderWorksModal() {
    const portfolioModalContainer = document.querySelector('.modal-portfolio');
    portfolioModalContainer.innerHTML = '';
    const works = JSON.parse(sessionStorage.getItem('works'));
    works.forEach(work => {
        const figure = document.createElement('figure');
        figure.setAttribute('data-id', work.id);

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash-can');
        

        icon.addEventListener('click', () => {
            deleteWork(work.id);
        });

        figure.appendChild(img);
        figure.appendChild(icon);
        portfolioModalContainer.appendChild(figure);
    });
}