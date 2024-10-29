document.addEventListener("DOMContentLoaded", loadItems);

function addItem() {
    const input = document.getElementById("todoInput");
    const itemText = input.value.trim();

    if (itemText === "") {
        alert("Please enter a task.");
        return;
    }

    const todos = getTodos();
    todos.push({ text: itemText, completed: false });
    saveTodos(todos);

    input.value = "";
    loadItems();
}

function loadItems() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    const todos = getTodos();

    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");
        listItem.className = todo.completed ? "completed" : "";

        const icon = document.createElement("img");
        icon.src = "task-icon.png";
        icon.alt = "Task Icon";
        icon.style.marginRight = "8px";
        icon.style.width = "40px";
        icon.style.height = "40px";

        const taskText = document.createElement("span");
        taskText.textContent = todo.text;
        taskText.onclick = () => toggleComplete(index);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editItem(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => removeItem(index);

        listItem.appendChild(icon);
        listItem.appendChild(taskText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}

function editItem(index) {
    const todos = getTodos();
    const currentText = todos[index].text;
    const newText = prompt("Edit your task:", currentText);
    
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveTodos(todos);
        loadItems();
    }
}

function toggleComplete(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    loadItems();
}

function removeItem(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    loadItems();
}

function clearList() {
    localStorage.removeItem("todos");
    loadItems();
}

function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
