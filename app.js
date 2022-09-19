// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listener
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)
window.addEventListener('DOMContentLoaded', getTodos);

// Functions
function addTodo(event) {
    // Prevent default
    event.preventDefault();

    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    // create
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // save to local storage
    saveTodoLocal(todoInput.value)
    
    // check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    
    // remove button
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('remove-btn');
    todoDiv.appendChild(removeButton);

    // append todo-list
    todoList.appendChild(todoDiv);

    // clear value
    todoInput.value = "";
};

function deleteCheck(event) {
    const item = event.target;
    // remove
    if(item.classList[0] === 'remove-btn') {
        const itemParent = item.parentElement;
        itemParent.classList.add('fall');
        removeLocalStorageTodo(itemParent);
        itemParent.addEventListener('transitionend', function() {
            itemParent.remove();
        });
    };

    // checkmark 
    if(item.classList[0] === 'complete-btn') {
        const itemParent = item.parentElement;
        itemParent.classList.toggle('completed');
    };;
};

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed": 
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted": 
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        };
    });
};

function saveTodoLocal(todo) {
    // check todo exist in local storage
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
    let todos;
    // check todo exist in local storage
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        
        // create
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        // check button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);
        
        // remove button
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.classList.add('remove-btn');
        todoDiv.appendChild(removeButton);

        // append todo-list
        todoList.appendChild(todoDiv);
    });
};

function removeLocalStorageTodo(todo) {
    let todos;
    // check todo exist in local storage
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todosIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todosIndex), 1);
    
    localStorage.setItem('todos',JSON.stringify(todos));
};