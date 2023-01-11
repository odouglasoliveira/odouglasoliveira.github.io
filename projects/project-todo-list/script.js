const taskList = document.getElementById('lista-tarefas');
const taskText = document.getElementById('texto-tarefa');
let tasks = [];

function updateTasks() {
  taskList.innerHTML = '';
  for (let i = 0; i < tasks.length; i += 1) {
    taskList.appendChild(tasks[i]);
  }
}

function createTask() {
  const button = document.getElementById('criar-tarefa');
  button.addEventListener('click', () => {
    if (taskText.value.trim().length === 0) {
      window.alert('Escreva uma tarefa.');
      taskText.value = '';
    } else {
      const newTask = document.createElement('li');
      newTask.innerText = taskText.value;
      tasks.push(newTask);
      // taskList.appendChild(newTask)
      updateTasks();
      taskText.value = '';
      return taskList;
    }
  });
}
createTask();

function selectTask() {
  taskList.addEventListener('click', (e) => {
    if (!document.querySelector('.selected')) {
      e.target.classList.add('selected');
    } else {
      document.querySelector('.selected').classList.remove('selected');
      e.target.classList.add('selected');
    }
  });
}
selectTask();

function completeTask() {
  taskList.addEventListener('dblclick', (e) => {
    if (e.target.className.includes('completed')) {
      e.target.classList.remove('completed');
      updateTasks();
    } else {
      e.target.classList.add('completed');
      updateTasks();
    }
  });
}
completeTask();

function deleteAllTasks() {
  const button = document.getElementById('apaga-tudo');
  button.addEventListener('click', () => {
    taskList.innerText = '';
    tasks = [];
    localStorage.clear();
  });
}
deleteAllTasks();

function deleteCompletedTasks() {
  const button = document.getElementById('remover-finalizados');
  button.addEventListener('click', () => {
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].className.includes('completed')) {
        tasks.splice(i);
        updateTasks();
      }
    }
    if (localStorage.getItem('savedList')) {
      localStorage.setItem('savedList', taskList.innerHTML);
    }
    return tasks;
  });
}
deleteCompletedTasks();

function saveTasks() {
  const button = document.getElementById('salvar-tarefas');
  button.addEventListener('click', () => {
    localStorage.setItem('savedList', taskList.innerHTML);
  });
}
saveTasks();

function recoveryTasks() {
  if (localStorage.getItem('savedList')) {
    taskList.innerHTML = localStorage.getItem('savedList');
  }
}
recoveryTasks();

function removeSelectedTask() {
  const button = document.getElementById('remover-selecionado');
  button.addEventListener('click', () => {
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].className.includes('selected')) {
        tasks.splice(i, 1);
        updateTasks();
      }
    }
    if (localStorage.getItem('savedList')) {
      localStorage.setItem('savedList', taskList.innerHTML);
    }
    return tasks;
  });
}
removeSelectedTask();

function changePriorityUp() {
  const buttonUp = document.querySelector('#mover-cima');
  buttonUp.addEventListener('click', () => {
    const task = document.querySelector('.selected');
    for (let i = 0; i < tasks.length; i += 1) {
      if (task !== tasks[0] && task === tasks[i]) {
        const aux = tasks[i - 1];
        tasks[i - 1] = task;
        tasks[i] = aux;
        updateTasks();
      }
    }
  });
}

function changePriorityDown() {
  const buttonDown = document.querySelector('#mover-baixo');
  buttonDown.addEventListener('click', () => {
    const task = document.querySelector('.selected');
    for (let i = 0; i < tasks.length; i += 1) {
      if (task !== tasks[tasks.length - 1] && task === tasks[i]) {
        const aux = tasks[i + 1];
        tasks[i + 1] = task;
        tasks[i] = aux;
        updateTasks();
        return tasks;
      }
    }
  });
}

changePriorityUp();
changePriorityDown();
