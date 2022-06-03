import './styles/reset.css';
import './styles/style.css';
import Ellipsis from './images/elipsis.png';
import Trash from './images/trash_1.png';
import storageAvailable from './modules/storage_available.js';
import * as taskManager from './modules/task_manager.js';

const form = document.querySelector('form');
const input = document.querySelector('#text');

function checkmark(e) {
  const tmpIndex = e.target.id.slice(5);
  const taskMsg = document.querySelector(`#desc${tmpIndex}`);

  if (e.target.textContent === '\u2714') {
    e.target.classList.remove('checkmark');
    e.target.textContent = '';
    taskMsg.classList.remove('crossed');
  } else {
    e.target.textContent = '\u2714';
    e.target.classList.add('checkmark');
    taskMsg.classList.add('crossed');
  }
}

function enterTask(e) {
  e.target.classList.add('uncrossed');

  const tmpIndex = e.target.id.slice(4);
  const taskItem = document.querySelector(`#main${tmpIndex}`);
  taskItem.classList.add('task-bg-color');

  const ellipsisBtn = document.querySelector(`#ell${tmpIndex}`);
  ellipsisBtn.style.display = 'none';

  const trashBtn = document.querySelector(`#trabtn${tmpIndex}`);
  trashBtn.style.display = 'flex';
}

function exitTask(e) {  
  e.target.classList.remove('uncrossed');

  const tmpIndex = e.target.id.slice(4);
  const taskItem = document.querySelector(`#main${tmpIndex}`);
  taskItem.classList.remove('task-bg-color');

  const ellipsisBtn = document.querySelector(`#ell${tmpIndex}`);
  ellipsisBtn.style.display = 'flex';

  const trashBtn = document.querySelector(`#trabtn${tmpIndex}`);
  trashBtn.style.display = 'none';
}

function displayTask(task) {
  const ulist = document.querySelector('ul');

  const taskItem = document.createElement('li');
  taskItem.classList.add('disp', 'disp-task', 'btn-border');
  taskItem.id = `main${task.index}`;

  const checkbox = document.createElement('button');
  checkbox.classList.add('checkbox');
  checkbox.title = 'Check!';
  checkbox.alt = 'Check!';
  checkbox.type = 'button';
  checkbox.id = `check${task.index}`;
  checkbox.addEventListener('click', checkmark);
  taskItem.appendChild(checkbox);

  const taskMsg = document.createElement('input');
  taskMsg.classList.add('g-font', 'task');
  taskMsg.type = 'text';
  taskMsg.maxLength = '255';
  taskMsg.id = `desc${task.index}`;
  taskMsg.value = task.description;
  taskMsg.addEventListener('focus', enterTask);
  taskMsg.addEventListener('blur', exitTask);
  taskMsg.addEventListener('input', taskManager.editDescription);
  taskItem.appendChild(taskMsg);

  //Vertical ellipsis button
  const ellipsisBtn = document.createElement('button');
  ellipsisBtn.classList.add('img-btn', 'img-task-btn');
  ellipsisBtn.id = `ell${task.index}`;
  ellipsisBtn.type = 'button';

  const imgTask = document.createElement('img');
  imgTask.classList.add('img-size', 'img-task');
  imgTask.alt = 'Vertical ellipses: Move the task up or down';
  imgTask.src = Ellipsis;
  imgTask.id = `img${task.index}`;
  ellipsisBtn.appendChild(imgTask);
  taskItem.appendChild(ellipsisBtn);

  //Trash can button
  const trashBtn = document.createElement('button');
  trashBtn.classList.add('img-btn', 'img-trash-btn');
  trashBtn.id = `trabtn${task.index}`;
  trashBtn.type = 'button';
  trashBtn.style.display = 'none';

  const trashImg = document.createElement('img');
  trashImg.classList.add('trash');
  trashImg.alt = 'Trash can';
  trashImg.src = Trash;
  trashImg.id = `trash${task.index}`;
  trashImg.addEventListener('mousedown', (e) => {
    taskManager.removeFromStorage(e);  
    taskManager.removeAllChildElements(ulist);
    taskManager.getTasks();
    taskManager.tasksList.forEach((task) => displayTask(task));
  });
  trashBtn.appendChild(trashImg);
  taskItem.appendChild(trashBtn);

  ulist.appendChild(taskItem);
}

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    taskManager.getTasks();
    taskManager.tasksList.forEach((task) => displayTask(task));
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    taskManager.getTasks();
    const newTask = taskManager.addTask(input.value);
    taskManager.saveTasks();
    displayTask(newTask);
    e.target.reset();
  });
}
