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

       /// Validation 

       let allInputs;

       function removeError(input) {
           const parent = input.parentNode;
           const errorElement = parent.querySelector('.error', '.input');
           
           if (errorElement) {
               errorElement.remove();
               input.classList.remove('red');
           }
       }
       
       function createError(input, text) {
           const parent = input.parentNode;
           const errorLabel = document.createElement('p');
       
           errorLabel.classList.add('error', 'padding');
           errorLabel.textContent = text;
       
           parent.classList.add('error');
           
           input.classList.add('red');
       
           parent.append(errorLabel);
       }
       
       function validationRegistration(form) {
           let mailFormInput = document.querySelector('.mailForm').value;
           allInputs = form.querySelectorAll('input');
       
           let result = true;
       
           allInputs.forEach((input, i) => {
               removeError(input);
           
               if (input.value === '') {
                   console.log("Ошибка поля");
                   createError(input, 'Write something!');
                   result = false;
                   return; // Используйте return вместо continue, чтобы выйти из forEach при ошибке.
               }
           
               if (i === 1 && !isAValidMail(mailFormInput)) {
                   console.log("Ошибка поля");
                   createError(input, 'Address is not valid.');
                   result = false;
                   return;
               }
           
               if (i === 3 && allInputs[2].value !== allInputs[3].value) {
                   console.log("Ошибка поля");
                   createError(input, 'Passwords mismatch');
                   result = false;
                   return;
               }
           });
           
       
           return result;
       }
       
       document.getElementById('formRegistation').addEventListener('submit', function(event) {
           event.preventDefault();
       
           if (validationRegistration(this)) {
               alert('Форма отправлена');
       
               const person = {
                   login: allInputs[0].value,
                   email: allInputs[1].value,
                   password: allInputs[2].value,
                 };
       
               console.log(person)
           }
       });
       
       function validationLogIn(form) {
           let mailFormInput = document.getElementById('mailForm').value;
           allInputs = form.querySelectorAll('input');
       
           let result = true;
       
           allInputs.forEach((input, i) => {
               removeError(input);
           
               if (input.value === '') {
                   console.log("Ошибка поля");
                   createError(input, 'Write something!');
                   result = false;
                   return;
               }
           
               if (i == 0 && !isAValidMail(mailFormInput)) {
                   console.log(mailFormInput)
                   console.log("Ошибка поля");
                   createError(input, 'Address is not valid.');
                   result = false;
                   return;
               }
           
           });
           
           return result;
       }
       
       document.getElementById('formAuthorization').addEventListener('submit', function(event) {
           event.preventDefault();
       
           if (validationLogIn(this)) {
               alert('Форма отправлена');
       
               const logIn = {
                   email: allInputs[0].value,
                   password: allInputs[1].value,
                 };
       
               console.log(logIn)
           }
       });
       