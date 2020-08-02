//defining UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// i will call a function to load all event listeners list
// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTask);
    // filter task
    filter.addEventListener('keyup', filterTasks);
}
// get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        //to give space between tasks
        li.className = 'collection-item';

        // Add class
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to the li
        li.appendChild(link);

        // Append li to ul

        taskList.appendChild(li);
    });

}
// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    //to give space between tasks
    li.className = 'collection-item';

    // Add class
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}
    function storeTaskInLocalStorage(task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage
            (e.target.parentElement.parentElement);
        }
    }
}
// Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('task', JSON.stringify(tasks));

}

// clear task
function clearTask() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from local storage
    clearTaskFromLocalStorage();
}
// Clear task from local storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}
// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });

}