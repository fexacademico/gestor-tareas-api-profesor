// Copyright © 2025 Felix Lee Pan
// All rights reserved. Unauthorized copying, modification, or distribution of this software is prohibited.

// TODO: 1
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-title');

window.addEventListener('DOMContentLoaded', loadTasks);

// TODO: 4
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = input.value;
  // Error handling
  if (!title) return;

  // Add task
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
    .then(res => res.json())
    .then(newTask => {
      // Load new task
      renderTask(newTask);
      input.value = '';
    });
});

// TODO: 2
function loadTasks() {
  fetch(`${API_URL}?_limit=5`)
    .then(res => res.json())
    .then(tasks => {
      tasks.forEach(task => renderTask(task));
    });
}

// TODO: 3
function renderTask(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  li.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button onclick="editTask(${task.id})">Editar</button>
      <button onclick="deleteTask(${task.id})">Eliminar</button>
    </div>
  `;
  taskList.appendChild(li);
}

// TODO: 5
function editTask(id) {
  const li = document.querySelector(`li[data-id="${id}"]`);
  const currentTitle = li.querySelector('span').textContent;
  const newTitle = prompt('Editar tarea:', currentTitle);
  if (!newTitle) return;

  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  }).then(() => {
    li.querySelector('span').textContent = newTitle;
  });
}

// TODO: 6
function deleteTask(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then(() => {
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.remove();
  });
}
