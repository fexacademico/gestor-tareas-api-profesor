// Copyright © 2025 Felix Lee Pan
// All rights reserved. Unauthorized copying, modification, or distribution of this software is prohibited.

// TODO: 1
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// TODO: 2
$(document).ready(function () {
  loadTasks();

  // TODO: 5
  $('#task-form').submit(function (e) {
    e.preventDefault();
    const title = $('#task-title').val().trim();
    if (!title) return;

    $.ajax({
      url: API_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ title }),
      success: function (newTask) {
        renderTask(newTask);
        $('#task-title').val('');
      },
    });
  });
});

// TODO: 3
function loadTasks() {
  $.get(`${API_URL}?_limit=5`, function (tasks) {
    tasks.forEach(task => renderTask(task));
  });
}

// TODO: 4
function renderTask(task) {
  const li = $(`
    <li data-id="${task.id}">
      <span>${task.title}</span>
      <div>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    </li>
  `);

  // TODO: 6
  li.find('.edit-btn').click(function () {
    const currentTitle = li.find('span').text();
    const newTitle = prompt('Editar tarea:', currentTitle);
    if (!newTitle) return;

    $.ajax({
      url: `${API_URL}/${task.id}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ title: newTitle }),
      success: function () {
        li.find('span').text(newTitle);
      },
    });
  });

  // TODO: 7
  li.find('.delete-btn').click(function () {
    $.ajax({
      url: `${API_URL}/${task.id}`,
      method: 'DELETE',
      success: function () {
        li.remove();
      },
    });
  });

  $('#task-list').append(li);
}
