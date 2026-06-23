let tasks = JSON.parse(localStorage.getItem('taskflow_tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function saveAndRender() {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        li.className = `flex justify-between items-center p-3 rounded-lg border transition ${
            task.completed
                ? 'bg-gray-50 border-gray-200 opacity-60'
                : 'bg-white border-gray-200 hover:border-emerald-300'
        }`;

        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input
                    type="checkbox"
                    ${task.completed ? 'checked' : ''}
                    class="w-5 h-5 accent-emerald-600 cursor-pointer"
                    onclick="toggleTask(${index})">

                <span class="${
                    task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-700'
                } font-medium">
                    ${task.text}
                </span>
            </div>

            <button
                onclick="deleteTask(${index})"
                class="text-red-400 hover:text-red-600 text-sm font-bold px-2">
                ✕
            </button>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = taskInput.value.trim();

    if (!text) return;

    tasks.push({
        text,
        completed: false
    });

    taskInput.value = '';

    saveAndRender();
});

window.toggleTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
};

window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveAndRender();
};

function updateStats() {
    const total = tasks.length;

    const completed =
        tasks.filter(t => t.completed).length;

    const pending =
        total - completed;

    const percent =
        calculateProgress(total, completed);

    document.getElementById('stats-pending').innerText =
        pending;

    document.getElementById('stats-completed').innerText =
        completed;

    document.getElementById('sidebar-count').innerText =
        pending;

    document.getElementById('progress-text').innerText =
        `${percent}%`;

    const desc =
        document.getElementById('progress-desc');

    if (total === 0) {
        desc.innerText =
            '¡Empieza a organizar tu día!';
    } else if (percent === 100) {
        desc.innerText =
            '¡Excelente! Todo completado 🎉';
    } else {
        desc.innerText =
            `Has completado ${completed} de ${total} tareas`;
    }
}

renderTasks();