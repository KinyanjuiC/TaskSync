document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list').querySelector('ul');
    const taskCounter = document.getElementById('task-counter');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort(compareTasksByPriority);
    tasks.forEach(task => addTaskToDOM(task));

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            priority: document.getElementById('task-priority').value,
            dueDate: document.getElementById('task-due-date').value,
            completed: false
        };
        tasks.push(task);
        tasks.sort(compareTasksByPriority);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
        updateTaskCounter();
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-task')) {
            const taskItem = e.target.closest('li');
            const taskIndex = taskItem.dataset.index;
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskItem.classList.toggle('completed');
            updateTaskCounter();
        } else if (e.target.classList.contains('delete-task')) {
            const taskItem = e.target.closest('li');
            const taskIndex = taskItem.dataset.index;
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            updateTaskCounter();
        }
    });

    function addTaskToDOM(task) {
        const taskItem = document.createElement('li');
        taskItem.className = `list-group-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.index = tasks.indexOf(task);
        taskItem.innerHTML = `
            <h5>${task.title}</h5>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Due Date: ${task.dueDate}</p>
            <button class="complete-task btn btn-success btn-sm">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-task btn btn-danger btn-sm">Delete</button>
        `;
        taskList.appendChild(taskItem);
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => addTaskToDOM(task));
    }

    function updateTaskCounter() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounter.textContent = `${totalTasks} tasks total, ${completedTasks} completed`;
    }

    function compareTasksByPriority(a, b) {
        const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    updateTaskCounter();
});