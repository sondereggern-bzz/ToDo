window.onload = () => {
    const output = document.getElementById('output');
    if (localStorage.getItem('entries')) {
        output.innerHTML = localStorage.getItem('entries');
    }

    document.forms.register.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskInput = event.target.givenname;
        const task = taskInput.value;

        // Clear the input field
        taskInput.value = '';

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
        }

        taskDiv.append(taskP, taskCheckbox, editBtn, deleteBtn);
        output.appendChild(taskDiv);
    });

    // Add event listener for "Delete All" button
    document.getElementById('deleteAll').addEventListener('click', () => {
        while (output.firstChild) {
            output.removeChild(output.firstChild);
        }
    });
};