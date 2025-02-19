import { categories, works } from "./app.js";
import { addWork, deleteWork } from "./works.js";

const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const backModalBtn = document.getElementById('back-modal-btn');
const addPhotoBtn = document.getElementById('add-photo-btn');
const galleryView = document.getElementById('gallery-view');
const addPhotoView = document.getElementById('add-photo-view');
const fileUpload = document.getElementById('file-upload');
const fileBtnContainer = document.getElementById('file-btn-container');
const categoriesSelect = document.getElementById('categories');
const addPhotoForm = document.getElementById('add-photo-form');
const submitBtn = document.getElementById("submit-btn");

let previousFile = null;

// Fonction pour afficher la modale
openModalBtn.onclick = function() {
    modal.style.display = 'flex';
    showGalleryView();
    renderModalWorks();
}

// Fonction pour fermer la modale
closeModalBtn.onclick = function() {
    closeModal();
}

// Fonction pour revenir à la vue galerie depuis la vue ajout de photo
backModalBtn.onclick = function() {
    showGalleryView();
    resetFileInput();
}

// Fonction pour afficher la vue ajout de photo
addPhotoBtn.onclick = function() {
    showAddPhotoView();
    renderModalCategories();
}

// Fermeture de la modale en cliquant à l'extérieur
window.onclick = function(event) {
    if (event.target == modal) closeModal();
}

// Afficher la vue galerie
function showGalleryView() {
    galleryView.style.display = 'flex';
    addPhotoView.style.display = 'none';
    backModalBtn.style.display = 'none';
}

// Afficher la vue ajout de photo
function showAddPhotoView() {
    galleryView.style.display = 'none';
    addPhotoView.style.display = 'flex';
    backModalBtn.style.display = 'block';
}

// Fermer la modale et reset le formulaire
function closeModal() {
    modal.style.display = 'none';
    resetFileInput();
}

// Reset le champ de fichier et le conteneur de boutons
function resetFileInput() {
    addPhotoForm.reset();
    previousFile = null;
    submitBtn.disabled = true
    fileBtnContainer.style.padding = '20px 100px';
    fileBtnContainer.style.height = '140px'
    fileBtnContainer.innerHTML = `
        <i class="fa-regular fa-image image-icon"></i>
        <label for="file-upload" class="custom-file-upload">
            <i class="fa-solid fa-plus"></i> Ajouter photo
        </label>
        <p>jpg, png : 4mo max</p>
    `;
}

// Upload de l'image et affichage de la preview
fileUpload.addEventListener('change', function(event) {
    const previousImg = fileBtnContainer.querySelector("img");
    const file = event.target.files[0];

    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Seuls les images sont autorisées.');
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            alert('Le fichier dépasse la taille maximale de 4 Mo.');
            return;
        }
        previousFile = file;
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Preview';
            img.addEventListener('click', () => fileUpload.click());

            fileBtnContainer.style.padding = '0';
            fileBtnContainer.style.height = '180px'
            fileBtnContainer.innerHTML = '';
            fileBtnContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else if (previousImg) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(previousFile);
        fileUpload.files = dataTransfer.files;
    }
});

// Afficher les projets dans la modale
function renderModalWorks() {
    const portfolioModalContainer = document.querySelector('.modal-portfolio');
    portfolioModalContainer.innerHTML = '';
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

// Afficher les catégories dans le form de la modale
function renderModalCategories() {
    categoriesSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = ' ';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    categoriesSelect.appendChild(defaultOption);

    categories
        .filter(category => category && category.name !== 'Tous')
        .forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoriesSelect.appendChild(option);
    });
}

// Ajout d'évenements pour vérifier la validité du formulaire
document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById("title");

    function checkFormValidity() {
        const isFileSelected = fileUpload.files.length > 0 || previousFile;
        const isTitleFilled = titleInput.value.trim() !== "";
        const isCategorySelected = categoriesSelect.value !== "";
    
        submitBtn.disabled = !(isFileSelected && isTitleFilled && isCategorySelected);
    }    

    // Écoute les changements sur tous les champs du formulaire
    fileUpload.addEventListener("change", checkFormValidity);
    titleInput.addEventListener("input", checkFormValidity);
    categoriesSelect.addEventListener("change", checkFormValidity);

    checkFormValidity();
});


// Fonction pour ajouter un projet
addPhotoForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(addPhotoForm);
    formData.set('image', previousFile);
    
    const title = formData.get('title').trim();
    const category = Number(formData.get('category'));
    const file = formData.get('image');

    if (!file || !title || !category) {
        alert('Veuillez remplir tous les champs.');
        return;
    }
    
    try {
        await addWork(formData);
        closeModal();
        addPhotoForm.reset();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'ajout du projet.');
    }
});
