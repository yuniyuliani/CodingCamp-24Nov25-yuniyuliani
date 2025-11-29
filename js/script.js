document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todoForm");
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const todoList = document.getElementById("todoList");
    const filter = document.getElementById("filter");

    let todos = [];

    // Add Task
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const task = taskInput.value.trim();
        const date = dateInput.value;

        if (task === "" || date === "") return;

        const todo = {
            id: Date.now(),
            task: task,
            date: date
        };

        todos.push(todo);
        renderTodos(todos);

        form.reset();
    });

    // Delete Task
    function deleteTask(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(todos);
    }

    // Filter
    filter.addEventListener("change", () => {
        const today = new Date().toISOString().split("T")[0];

        let filtered = todos;

        if (filter.value === "today") {
            filtered = todos.filter(todo => todo.date === today);
        } else if (filter.value === "upcoming") {
            filtered = todos.filter(todo => todo.date > today);
        }

        renderTodos(filtered);
    });

    // Render List
    function renderTodos(list) {
        todoList.innerHTML = "";
        list.forEach(todo => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span>${todo.task} - <small>${todo.date}</small></span>
                <button class="deleteBtn" onclick="deleteItem(${todo.id})">Delete</button>
            `;

            todoList.appendChild(li);
        });
    }

    // Global delete function
    window.deleteItem = function(id) {
        deleteTask(id);
    };

});
