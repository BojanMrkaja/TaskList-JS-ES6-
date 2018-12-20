const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listiners
loadEventListeners();


function loadEventListeners(){
    form.addEventListener('submit', addTask);
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

    // clear input
    taskInput.value = '';
    e.preventDefault();
}