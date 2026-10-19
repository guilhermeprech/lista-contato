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

  updateContacts();
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

  updateContacts();

  hideFormSection();
  resetForm();
};

const updateContacts = () => {
  const contactsList = document.querySelector('table tbody');
  contactsList.innerHTML = '';
  contacts.forEach(contact => {
    const contactRow = document.createElement('tr');
    contactRow.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button type="button" id="editButton">Editar</button>
        <button type="button" id="deleteButton">Excluir</button>
      </td>
    `;
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