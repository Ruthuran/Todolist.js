const taskInput = document.getElementById("task");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("tasklist");
const clearAllBtn = document.getElementById("clearAll"); 


document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTask(taskText); 
        taskInput.value = "";  
    }
});


taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            createTask(taskText); 
            taskInput.value = "";  
        }
    }
});


function createTask(text, isCompleted = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

   
    taskItem.innerHTML = `
        <span class="task-text">${text}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    
    if (isCompleted) {
        taskItem.classList.add("completed");
    }

 
    taskList.appendChild(taskItem);

    
    const deleteBtn = taskItem.querySelector(".delete");
    const editBtn = taskItem.querySelector(".edit");
    const taskText = taskItem.querySelector(".task-text");

    deleteBtn.addEventListener("click", () => deleteTask(taskItem));
    editBtn.addEventListener("click", () => editTask(taskText, taskItem));
    taskItem.addEventListener("click", () => toggleComplete(taskItem));

   
    saveTasks();
}


function toggleComplete(taskItem) {
    taskItem.classList.toggle("completed");
    saveTasks();
}


function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    saveTasks();
}


function editTask(taskText, taskItem) {
    const newText = prompt("Edit your task:", taskText.textContent);
    if (newText && newText.trim() !== "") {
        taskText.textContent = newText.trim();
        saveTasks();
    }
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(taskItem => {
        const taskText = taskItem.querySelector(".task-text").textContent;
        const isCompleted = taskItem.classList.contains("completed");
        tasks.push({ text: taskText, completed: isCompleted });
    });

   
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => createTask(task.text, task.completed));
    }
}


clearAllBtn.addEventListener("click", clearAllTasks);

function clearAllTasks() {
 
    taskList.innerHTML = '';
    

    localStorage.removeItem("tasks");
}
