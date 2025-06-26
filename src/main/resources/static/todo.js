const API_URL = 'http://localhost:8080/api/todo';

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editTaskInput = document.getElementById('editTaskInput');
const editTaskId = document.getElementById('editTaskId');

document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-info">
                <span class="task-status ${task.completed ? 'status-completed' : 'status-not-completed'}">
                    ${task.completed ? 'Completed' : 'Not completed'}
                </span>
                <div class="task-title">${task.title}</div>
            </div>
            <div class="task-actions">
                <button class="change-status-btn" onclick="changeTaskStatus(${task.id}, ${!task.completed})">
                    ${task.completed ? 'Mark Not Completed' : 'Mark Completed'}
                </button>
                <button class="edit-btn" onclick="openEditModal(${task.id}, '${task.title}')">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

async function addTask() {
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed: false }),
        });

        const newTask = await response.json();
        taskInput.value = '';
        loadTasks();
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function changeTaskStatus(id, completed) {
    try {
        // Get current task to preserve title
        const currentTask = await fetch(`${API_URL}/${id}`).then(res => res.json());

        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: currentTask.title,
                completed: completed
            }),
        });
        loadTasks();
    } catch (error) {
        console.error('Error changing task status:', error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function openEditModal(id, title) {
    editTaskId.value = id;
    editTaskInput.value = title;
    editModal.style.display = 'block';
}


function closeModal() {
    editModal.style.display = 'none';
}

async function saveEditedTask() {
    const id = editTaskId.value;
    const newTitle = editTaskInput.value.trim();

    if (!newTitle) return;

    try {
        const currentTask = await fetch(`${API_URL}/${id}`).then(res => res.json());

        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: newTitle,
                completed: currentTask.completed
            }),
        });

        closeModal();
        loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

window.onclick = function(event) {
    if (event.target === editModal) {
        closeModal();
    }
};

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});