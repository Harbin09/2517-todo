const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", addTodo);

function addTodo() {
    let task = input.value.trim();
    if (task == "") {
        alert("Please enter a task");
        return;
    }
    let obj = {
        text: task,
        completed: false
    };
    todos.push(obj);
    saveTodos();
    showTodos();
    input.value = "";
}

function showTodos() {
    todoList.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement("li");
        let check = document.createElement("input");
        check.type = "checkbox";
        check.checked = todos[i].completed;

        let text = document.createElement("span");
        text.innerText = todos[i].text;

        if (todos[i].completed) {
            text.className = "completed";
        }

        let edit = document.createElement("button");
        edit.innerText = "Edit";
        edit.className = "edit";

        let del = document.createElement("button");
        del.innerText = "Delete";
        del.className = "delete";

        check.addEventListener("change", function () {
            todos[i].completed = check.checked;
            saveTodos();
            showTodos();
        });

        edit.addEventListener("click", function () {
            let newTask = prompt("Edit Task", todos[i].text);

            if (newTask != null && newTask.trim() != "") {
                todos[i].text = newTask;
                saveTodos();
                showTodos();
            }
        });

        del.addEventListener("click", function () {
            todos.splice(i, 1);
            saveTodos();
            showTodos();
        });

        li.appendChild(check);
        li.appendChild(text);
        li.appendChild(edit);
        li.appendChild(del);

        todoList.appendChild(li);
    }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

showTodos();