
let contacts = [];
let editingContactId = null;
let isFavorite = false;

window.addEventListener('load', () => {
  const storedContacts = localStorage.getItem('contacts');
  contacts = storedContacts ? JSON.parse(storedContacts) : [];

  document.querySelector('#addButton')
    .addEventListener('click', handleAddContact);

  document.querySelector('#cancelButton')
    .addEventListener('click', handleCancel);

  document.querySelector('#favoriteButton')
    .addEventListener('click', handleFormFavorite);

  document.querySelector('form')
    .addEventListener('submit', handleSubmit);

  document.querySelector('#searchInput')
    .addEventListener('input', updateTable);

  document.querySelector('#filterSelect')
    .addEventListener('change', updateTable);

  hideFormSection();
  updateTable();
});

const saveContacts = () => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const updateFavoriteButton = () => {
  const button = document.querySelector('#favoriteButton');

  button.textContent = isFavorite ? 'Favoritado' : 'Favoritar';
  button.classList.toggle('active', isFavorite);
  button.setAttribute('aria-pressed', String(isFavorite));
};

const handleFormFavorite = () => {
  isFavorite = !isFavorite;
  updateFavoriteButton();
};

const handleAddContact = () => {
  resetForm();
  showFormSection();
};

const handleCancel = () => {
  resetForm();
  hideFormSection();
};

const handleSubmit = (event) => {
  event.preventDefault();

  const form = document.querySelector('form');
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const phone = form.elements['phone'].value.trim();

  if (!name || !email || !phone) return;

  if (editingContactId !== null) {
    const contact = contacts.find(
      contact => contact.id === editingContactId
    );

    if (!contact) return;

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.favorite = isFavorite;
  } else {
    contacts.push({
      id: Date.now(),
      name,
      email,
      phone,
      favorite: isFavorite
    });
  }

  saveContacts();
  updateTable();
  resetForm();
  hideFormSection();
};

const handleEditContact = (id) => {
  const contact = contacts.find(contact => contact.id === id);

  if (!contact) return;

  editingContactId = id;
  isFavorite = contact.favorite === true;

  const form = document.querySelector('form');

  form.elements['name'].value = contact.name;
  form.elements['email'].value = contact.email;
  form.elements['phone'].value = contact.phone;

  document.querySelector('#formSection h2').textContent = 'Editar Contato';
  form.querySelector('button[type="submit"]').textContent = 'Salvar';

  updateFavoriteButton();
  showFormSection();
};

const handleRemoveContact = (id) => {
  contacts = contacts.filter(contact => contact.id !== id);

  if (editingContactId === id) {
    resetForm();
    hideFormSection();
  }

  saveContacts();
  updateTable();
};

const handleToggleFavorite = (id) => {
  const contact = contacts.find(contact => contact.id === id);

  if (!contact) return;

  contact.favorite = !contact.favorite;

  if (editingContactId === id) {
    isFavorite = contact.favorite;
    updateFavoriteButton();
  }

  saveContacts();
  updateTable();
};

const updateTable = () => {
  const contactsList = document.querySelector('#contactsTable tbody');
  contactsList.innerHTML = '';

  const search = document.querySelector('#searchInput')
    .value.toLowerCase().trim();

  const filter = document.querySelector('#filterSelect').value;

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      contact.phone.includes(search);

    const matchesFilter =
      filter === 'all' || contact.favorite === true;

    return matchesSearch && matchesFilter;
  });

  const emptyMessage = document.querySelector('#emptyMessage');
  const table = document.querySelector('#contactsTable');

  if (filteredContacts.length === 0) {
    table.style.display = 'none';
    emptyMessage.style.display = 'block';

    emptyMessage.textContent = contacts.length === 0
      ? 'Nenhum contato cadastrado.'
      : 'Nenhum contato encontrado.';
  } else {
    table.style.removeProperty('display');
    emptyMessage.style.display = 'none';
  }

  filteredContacts.forEach(contact => {
    const contactRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = contact.name;

    const emailCell = document.createElement('td');
    emailCell.textContent = contact.email;

    const phoneCell = document.createElement('td');
    phoneCell.textContent = contact.phone;

    const actionsCell = document.createElement('td');
    actionsCell.className = 'buttons';

    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.textContent = contact.favorite ? '★' : '☆';
    favoriteButton.classList.add('favorite-button');
    favoriteButton.classList.toggle('active', contact.favorite === true);
    favoriteButton.setAttribute(
      'aria-label',
      contact.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
    );
    favoriteButton.setAttribute(
      'aria-pressed',
      String(contact.favorite === true)
    );

    favoriteButton.addEventListener('click', () => {
      handleToggleFavorite(contact.id);
    });

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = 'Editar';

    editButton.addEventListener('click', () => {
      handleEditContact(contact.id);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Excluir';
    removeButton.classList.add('destructive');

    removeButton.addEventListener('click', () => {
      handleRemoveContact(contact.id);
    });

    actionsCell.append(favoriteButton, editButton, removeButton);
    contactRow.append(nameCell, emailCell, phoneCell, actionsCell);
    contactsList.appendChild(contactRow);
  });
};

const resetForm = () => {
  const form = document.querySelector('form');
  form.reset();

  editingContactId = null;
  isFavorite = false;

  document.querySelector('#formSection h2').textContent = 'Adicionar Contato';
  form.querySelector('button[type="submit"]').textContent = 'Adicionar';

  updateFavoriteButton();
};

const hideFormSection = () => {
  document.querySelector('#formSection').style.display = 'none';
};

const showFormSection = () => {
  document.querySelector('#formSection').style.display = 'flex';
};
