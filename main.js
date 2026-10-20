window.addEventListener('load', () => {
  onLoad();
});

let contacts = [];

const onLoad = () => {
  const storedContacts = localStorage.getItem('contacts');
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
  }

  const addButton = document.querySelector('#addButton');
  addButton.addEventListener('click', handleAddContact);

  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', handleCancel);

  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  hideFormSection();

  updateTable();
};

const handleAddContact = (event) => {
  event.preventDefault();

  showFormSection();
};

const handleCancel = (event) => {
  event.preventDefault();

  hideFormSection();
  resetForm();
};

const handleSubmit = (event) => {
  event.preventDefault();

  const form = document.querySelector('form');
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;
  const phone = form.querySelector('input[name="phone"]').value;

  contacts.push({
    id: contacts.length + 1,
    name,
    email,
    phone,
  });

  localStorage.setItem('contacts', JSON.stringify(contacts));

  updateTable();

  hideFormSection();
  resetForm();
};

const handleRemoveContact = (id) => {
  contacts = contacts.filter(contact => contact.id !== id);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  updateTable();
};

const updateTable = () => {
  const contactsList = document.querySelector('table tbody');
  contactsList.innerHTML = '';
  contacts.forEach(contact => {
    const contactRow = document.createElement('tr');

    contactRow.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
    `;

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => handleEditContact(contact.id));

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Excluir';
    removeButton.classList.add('destructive');
    removeButton.addEventListener('click', () => handleRemoveContact(contact.id));

    const actionsCell = document.createElement('td');
    actionsCell.className = 'buttons';
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(removeButton);

    contactRow.appendChild(actionsCell);

    contactsList.appendChild(contactRow);
  });
};

const resetForm = () => {
  document.querySelector('form').reset();
};

const hideFormSection = () => {
  document.querySelector('#formSection').style.display = 'none';
};

const showFormSection = () => {
  document.querySelector('#formSection').style.removeProperty('display');
};