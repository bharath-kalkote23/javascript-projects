document.addEventListener("DOMContentLoaded", loadTasks);

function addPatientTask() {
    const patientName = document.getElementById("patientName").value;
    const disease = document.getElementById("disease").value;
    const admitTime = document.getElementById("admitTime").value;
    const taskInput = document.getElementById("taskInput").value;

    if (patientName === "" || disease === "" || admitTime === "" || taskInput === "") {
        alert("Please fill all fields!");
        return;
    }

    const patientTask = {
        patientName,
        disease,
        admitTime,
        taskInput
    };

    saveTask(patientTask);
    renderTask(patientTask);
    clearFields();
}

function renderTask(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.innerHTML = `
        <strong>Patient:</strong> ${task.patientName} <br>
        <strong>Disease:</strong> ${task.disease} <br>
        <strong>Admit Time:</strong> ${task.admitTime} <br>
        <strong>Task:</strong> ${task.taskInput}
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = function () {
        li.remove();
        removeTask(task);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("questHospitalTasks")) || [];
    tasks.push(task);
    localStorage.setItem("questHospitalTasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("questHospitalTasks")) || [];
    tasks.forEach(task => renderTask(task));
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("questHospitalTasks")) || [];
    tasks = tasks.filter(task =>
        task.patientName !== taskToRemove.patientName ||
        task.disease !== taskToRemove.disease ||
        task.admitTime !== taskToRemove.admitTime ||
        task.taskInput !== taskToRemove.taskInput
    );
    localStorage.setItem("questHospitalTasks", JSON.stringify(tasks));
}

function clearFields() {
    document.getElementById("patientName").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("admitTime").value = "";
    document.getElementById("taskInput").value = "";
}
