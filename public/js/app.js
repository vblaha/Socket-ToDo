$(function () {

  const render = function () {

    // Empty our output divs
    $('#todos').empty();

    // Turn off any click listeners from our update items
    $('add-new-todo').off('click');

    // Run Queries!
    // ==========================================
    getTodos();
  }

  /**
   * TODO schema = { text: 'my todo text', completed: false }
   */
  const renderTodo = function (outputElement, todo) {
    const output = $(outputElement);

    const todoEl = $('<div>').addClass('todo');

    const label = $('<label>').addClass('fancy-checkbox');
    const checkbox = $('<input type="checkbox">')
      .attr('checked', todo.completed)
      .addClass('completed')
      .attr('data-id', todo._id);


    label.append(checkbox);
    label.append('<i class="fas fa-check-square checked">');
    label.append('<i class="far fa-square unchecked">');

    todoEl.append(
      label,

      $('<span>').text(todo.text).addClass('list-text'),

      $('<button>')
      .addClass('delete')
      .attr('data-id', todo._id)
      .append('<i>').addClass('fas fa-times')
    );

    output.append(todoEl);
  }

  const renderTodos = function (outputElement, todos) {
    const output = $(outputElement);
    output.empty();
    todos.forEach((todo) => renderTodo(outputElement, todo));
  }

  const getTodos = function () {

    // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
    $.ajax({
        url: '/api/todos',
        method: 'GET'
      })
      .then(function (todos) {
        renderTodos('#todos', todos);
      });
  }

  // ADD NEW TODO
  // Click listener for the submit button
  $('.submit').on('click', function (event) {
    event.preventDefault();

    // Here we grab the form elements
    const newTodo = {
      text: $('#new-todo-text').val().trim(),
      completed: false,
    };

    for (let key in newTodo) {
      if (newTodo[key] === '') {
        alert('Please add text for new todo');
        return;
      }
    }
    $.ajax({
      url: '/api/todos',
      method: 'POST',
      data: newTodo
    }).then(
      function (data) {
        console.log('app.js103: ' + JSON.stringify(data));
        if (data) {

          console.log('data', data)

          // Clear the form when submitting
          $('#new-todo-text').val('');

          // Set the users focus (cursor) to input
          $('#new-todo-text').focus();

          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }
      });
  });

  // UPDATE TODO COMPLETED STATUS
  $('body').on('click', '.completed', function (event) {
    const todoId = $(this).attr('data-id');
    const completed = event.target.checked; // TODO use jquery for this

    // Make the PUT request
    $.ajax({
        url: `/api/todos/${todoId}`,
        method: 'PUT',
        data: {
          completed: completed
        },
      })
      .then(function (data) {

        // If our PUT request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }


      });
  })

  // DELETE TODO
  $('body').on('click', '.delete', function (event) {
    const todoId = $(this).attr('data-id');

    // Make the DELETE request
    $.ajax({
        url: `/api/todos/${todoId}`,
        method: 'DELETE'
      })
      .then(function (data) {

        // If our DELETE request was successfully processed, proceed on
        if (data.success) {
          render();
        } else {

          alert('There was a problem with your submission. Please check your entry and try again.');
        }

      });
  });

  // fetch all todos and render them 
  render();

  const socket = io();
  socket.on('new todo', function(todo){
    console.log(todo);
    getTodos();
  });

  socket.on('delete todo', function(todo){
    console.log(todo);
    getTodos();
  });

  socket.on('update todo', function(todo){
    console.log(todo);
    getTodos();
  });
});