const $formTask = document.getElementById('form-task')
const $taskTitle =  document.getElementById('task-title')
const $taskDescription =  document.getElementById('task-description')

$formTask.addEventListener('submit', saveTask);

function saveTask(e) {
    e.preventDefault();

    let title = $taskTitle.value
    let description = $taskDescription.value
    let task = { title, description }

    if(task.title != '' || task.description != '') {
        if(localStorage.getItem('tasks') == null) {
            let tasks = []
            tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(tasks))
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    } 

    renderTasks()
    $formTask.reset()
}

function renderTasks(){
    if(localStorage.getItem('tasks') !== null) {
        let $taskCards = document.getElementById('tasks-cards')
        $taskCards.innerHTML = '';
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        tasks.forEach(element => {
            $taskCards.innerHTML += `
                <div class="card">
                    <h3>${element.title}</h3>
                    <p>${element.description}</p>
                    <button class="btn btn-delete" onclick="deleteTask('${element.title}')" >Delete</button>
                </div>
            `
        });
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].title == title) {
            tasks.splice(i, 1)
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks();
}

renderTasks();