const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listiners
loadEventListeners();


function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    // Remove task event
    tasklist.addEventListener('click', removeTask);

    // Clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter Tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
            
    //Create li element 
    const li = document.createElement('li');

    // Add Class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    tasklist.appendChild(li)
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task ')
    }
    
    //Create li element 
    const li = document.createElement('li');

    // Add Class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    // Append li to ul
    tasklist.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
    e.preventDefault();
}

// store Task

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove Task

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){

    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }

    // Clear Tasks from LS
    clearTasksFromLocalStorage();
 
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
//Filter Tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;

        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';

        }
    });
}
