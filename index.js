"use strict"

const items = new Map();

function getRandomId() {
  return Math.random().toString(36).substring(2, 12);
}

function showItems() {
  const templates = [];
  const itemTemplate = document.querySelector("#itemTemplate");
  const itemsEl = document.querySelector("#items");
  items.forEach((value, key) => {
    const clone = itemTemplate.content.cloneNode(true);
    const valueField = clone.querySelector('[name="value"]');
    const addButton = clone.querySelector('[data-type="add"]');
    const removeButton = clone.querySelector('[data-type="remove"]');
    valueField.value = value;
    addButton.dataset.id = key;
    removeButton.dataset.id = key;
    templates.push(clone);
  });
  itemsEl.innerHTML = '';
  itemsEl.append(...templates);
}

function showForm() {
  const formEl = document.querySelector('#form');
  const formTemplate = document.querySelector("#formTemplate");
  const clone = formTemplate.content.cloneNode(true);
  const idEl = clone.querySelector('[name="id"]');
  idEl.value = getRandomId();
  hideForm();
  formEl.appendChild(clone);
}

function hideForm() {
  const formEl = document.querySelector('#form');
  formEl.innerHTML = '';
}

function setItem(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  const value = formData.get('value');
  items.set(id, value);
  hideForm();
  showItems();
}

function updateItem(e) {
  const button = e.target;
  const id = button.dataset.id
  let value = items.get(id)
  items.set(id, ++value)
  showItems();
}

function removeItem(e) {
  const button = e.target;
  const id = button.dataset.id
  items.delete(id)
  showItems();
}




