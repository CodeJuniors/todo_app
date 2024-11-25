const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoActions);
filterOption.addEventListener("change", filterTodo);



































// Handle complete, edit, and delete actions
function handleTodoActions(e) {
    const item = e.target;
    const todo = item.parentElement;

    // Complete Task
    if (item.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
        updateLocalTodos(todo); // Update completion status in localStorage
    }

    // Edit Task
    if (item.classList.contains("edit-btn")) {
        const todoText = todo.querySelector(".todo-item");
        if (todoText.isContentEditable) {
            todoText.contentEditable = "false";
            item.innerHTML = '<i class="fas fa-edit"></i>';
            updateLocalTodos(todo); // Update task content in localStorage
        } else {
            todoText.contentEditable = "true";
            item.innerHTML = '<i class="fas fa-save"></i>';
            todoText.focus();
        }
    }

    // Delete Task
    if (item.classList.contains("trash-btn")) {
        removeLocalTodos(todo);
        todo.remove();
    }
}



































// Save the new task to local storage
function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const newTodo = {
        id: Date.now(), // Generate a unique ID
        text: todo,
        completed: false
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}












// Get todos from local storage and display them
function getLocalTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(function(todo) {
        if (!todo.text) {
            console.error("Missing text for todo:", todo);
            return; // Skip this todo if it's invalid
        }

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.setAttribute("data-id", todo.id); // Set the unique ID

        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        newTodo.innerText = todo.text;
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }
        todoDiv.appendChild(newTodo);

        todoDiv.appendChild(createButton('<i class="fas fa-check-circle"></i>', "complete-btn"));
        todoDiv.appendChild(createButton('<i class="fas fa-edit"></i>', "edit-btn"));
        todoDiv.appendChild(createButton('<i class="fas fa-trash"></i>', "trash-btn"));

        todoList.appendChild(todoDiv);
    });
}
