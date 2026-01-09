// Récupérer le formulaire et le message
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const userList = document.getElementById('userList');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const age = parseInt(form.age.value.trim(), 10);

  // Fonction pour vérifier le champ Nom
    form.name.addEventListener('input', function() {
    if (form.name.value.trim() === '') {
        form.name.style.borderColor = 'red';
    } else {
        form.name.style.borderColor = 'green';
    }
    });

    // Fonction pour vérifier le champ Email
    form.email.addEventListener('input', function() {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(form.email.value.trim())) {
        form.email.style.borderColor = 'red';
    } else {
        form.email.style.borderColor = 'green';
    }
    });

    // Fonction pour vérifier l'âge
    form.age.addEventListener('input', function() {
    const age = parseInt(form.age.value.trim(), 10);
    if (isNaN(age) || age < 0) {
        form.age.style.borderColor = 'red';
    } else {
        form.age.style.borderColor = 'green';
    }
    });


  if (!name || !email || isNaN(age)) {
    formMessage.textContent = 'Merci de remplir tous les champs correctement.';
    formMessage.className = 'red';
    return;
  }

  // Logique métier : calculer la catégorie d’âge
  let category = '';
  if (age < 18) category = 'mineur';
  else if (age <= 35) category = 'jeune adulte';
  else if (age <= 60) category = 'adulte';
  else category = 'senior';

  // Mise à jour du DOM : message dynamique
  formMessage.innerHTML = `
    Merci <strong>${name}</strong>, vous avez ${age} ans.<br>
    Catégorie : <em>${category}</em><br>
    Votre formulaire a été envoyé !
  `;
  formMessage.className = 'green';

    const li = document.createElement('li');
    li.textContent = `${name} (${age} ans, ${category})`;

    // Ajouter bouton supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.style.marginLeft = '1rem';
    deleteBtn.addEventListener('click', () => li.remove());
    li.appendChild(deleteBtn);

    userList.appendChild(li);

  form.reset();
});

