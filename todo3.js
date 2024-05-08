const todoInput = document.getElementById('todoInput')
const btnAddNewTask = document.getElementById('btnAddNewTask')
const frame =  document.getElementById('frame')
const checkbox1 = document.getElementById('checkbox1')
const tasksText = document.getElementById('tasksText')
const deleteAllTasks = document.getElementById('deleteAllTasks')
const deleteDoneTasks = document.getElementById('deleteDoneTasks')
let todos =[]

function buildNewElement() {
    frame.innerHTML = ''
    if(todos.length){
        
        todos.forEach((newTask)=>{
            const tasks = document.createElement('div')
            tasks.classList.add('container-tasks')
            let tasksText =  document.createElement('p')
            tasksText.classList.add('task-text')
            tasksText.textContent = `${newTask.text}`
            const btnsTask = document.createElement('div')
            btnsTask.classList.add('btn-tasks')
            let checkbox1 =  document.createElement('input')
            checkbox1.type = 'checkbox'
            checkbox1.classList.add('checkbox-done')
            let btnEdit =  document.createElement('button')
            btnEdit.classList.add('btn-edit')
            btnEdit.textContent = '✏️'
            let btnDelete =  document.createElement('button')
            btnDelete.classList.add('btn-delete')
            btnDelete.textContent = '🗑️'
            

        
            frame.appendChild(tasks)
            tasks.appendChild(tasksText)
            tasks.appendChild(btnsTask)
            btnsTask.appendChild(checkbox1)
            btnsTask.appendChild(btnEdit)
            btnsTask.appendChild(btnDelete)
        })
        saveData()
            }
}
btnAddNewTask.addEventListener('click', function(){
    const text = todoInput.value
    if(text){
        const newTask = {
            text,
            isDone: false,
        }
        todos.push(newTask)
        todoInput.value = ''
        buildNewElement()
    } 
})

frame.addEventListener('click', function myFunctionForButtons(e) {
    if(e.target.classList.contains('checkbox-done')){
    const containerTasks = e.target.closest('.container-tasks')
        const index = Array.from(containerTasks.parentElement.children).indexOf(containerTasks);
    if(index !== -1 && index < todos.length){
        todos[index].isDone = !todos[index].isDone 
    }
    let pText = containerTasks.querySelector('.task-text')
    e.target.classList.toggle('checked')
    pText.classList.toggle('task-text1')
    }
    else if(e.target.classList.contains('btn-edit')){
        const containerTasks = e.target.closest('.container-tasks')
        let pText = containerTasks.querySelector('.task-text')
        const editWindow =  prompt('Enter here your new todo:)')
        if(editWindow !== null && editWindow.trim !== ' '){
            pText.textContent = editWindow
        }
    }
    else if(e.target.classList.contains('btn-delete')){
        const containerTasks = e.target.closest('.container-tasks')
        const index = Array.from(containerTasks.parentElement.children).indexOf(containerTasks);
        todos.splice(index, 1)
        containerTasks.remove()
    }
        saveData()
})

deleteAllTasks.addEventListener('click', function() {
    todos.length = 0
    buildNewElement()
    saveData()
})

deleteDoneTasks.addEventListener('click', function(e){
    todos = todos.filter((newTask) => !newTask.isDone)
        buildNewElement()
})

function saveData() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function showData() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos.push(...JSON.parse(savedTodos));
        buildNewElement();
    }
}
showData()