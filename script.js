window.onload = () => {
    const output = document.getElementById('output');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToOutput(task));

    document.forms.register.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskInput = event.target.givenname;
        const task = taskInput.value;

        // Clear the input field
        taskInput.value = '';

        // Add task to output and local storage
        addTaskToOutput(task);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Add event listener for "Delete All" button
    document.getElementById('deleteAll').addEventListener('click', () => {
        while (output.firstChild) {
            output.removeChild(output.firstChild);
        }
        // Clear tasks from local storage
        localStorage.removeItem('tasks');
    });
};

function addTaskToOutput(task) {
    const output = document.getElementById('output');

    let taskDiv = document.createElement("div");
    taskDiv.classList.add('task', 'dd'); // Add 'dd' class for green background

    let taskP = document.createElement("p");
    taskP.innerText = task;

    let taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";

    let editBtn = document.createElement("button");
    editBtn.innerText = 'Edit Task';
    editBtn.onclick = () => {
        let newTask = window.prompt("Change");
        if (newTask !== null) {
            taskP.innerText = newTask;
        }
    }

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = 'Delete Task';
    deleteBtn.onclick = () => {
        taskDiv.remove();
        // Remove task from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    taskDiv.append(taskP, taskCheckbox, editBtn, deleteBtn);
    output.appendChild(taskDiv);
}