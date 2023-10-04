import isAValidMail from './validMail.js'

const openModals1 = document.querySelectorAll('.registration');
const openModals2 = document.querySelectorAll('.logIn');

const greyStick = document.querySelectorAll('.stick');

const closeModal1 = document.getElementById('closeModal1');
const closeModal2 = document.getElementById('closeModal2');

const modal1 = document.getElementById('MyModule1');
const modal2 = document.getElementById('MyModule2');

const body = document.getElementById('bodyScrolling');

function openModal(modal) {
    body.style.overflow = 'hidden';
    modal.style.opacity = 1;
    modal.style.visibility = 'visible';
}

function closeModals(modal) {
    body.style.overflow = 'auto';
    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';
}

openModals1.forEach(openModalButton => {
    openModalButton.addEventListener('click', () => {
        openModal(modal1);
    });
});

openModals2.forEach(openModalButton => {
    openModalButton.addEventListener('click', () => {
        openModal(modal2);
    });
});

greyStick.forEach(stickElement => {
    stickElement.addEventListener('click', () => {
        closeModals(modal1)
        closeModals(modal2)
    });
});

closeModal1.addEventListener('click', () => closeModals(modal1));
closeModal2.addEventListener('click', () => closeModals(modal2));

window.addEventListener('click', (event) => {
    if (event.target === modal1 || event.target === modal2) {
        closeModals(modal1);
        closeModals(modal2);
    }
});

