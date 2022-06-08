import './styles/reset.css';
import './styles/style.css';
import Ellipsis from './images/elipsis.png';
import Trash from './images/trash_1.png';
import storageAvailable from './modules/storage_available.js';
import { getTasks, saveTasks } from './modules/local_storage.js';
import { addTask, removeFromStorage, editDescription } from './modules/task_manager.js';
import removeAllChildElements from './modules/remove_dom.js';
import { checkmark, checkAgain, clearAll } from './modules/clear_all.js';

const form = document.querySelector('form');
const input = document.querySelector('#text');
const ulist = document.querySelector('ul');
const clear = document.querySelector('#clear');

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
  taskMsg.addEventListener('input', editDescription);
  taskItem.appendChild(taskMsg);

  // Vertical ellipsis button
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

  // Trash can button
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
    let tasksList = getTasks();
    const taskId = +e.target.id.slice(5); 
    const tempList = removeFromStorage(taskId, tasksList);
    saveTasks(tempList);
    removeAllChildElements(ulist);
    tasksList = getTasks();
    tasksList.forEach((task) => {
      displayTask(task);
      checkAgain(task);
    });
  });
  trashBtn.appendChild(trashImg);
  taskItem.appendChild(trashBtn);

  ulist.appendChild(taskItem);
}

if (storageAvailable('localStorage')) {
  window.addEventListener('load', () => {
    const tasksList = getTasks();
    tasksList.forEach((task) => {
      displayTask(task);
      checkAgain(task);
    });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tasksList = getTasks();
    const [newTask, newTasksList] = addTask(input.value, tasksList);
    saveTasks(newTasksList);
    displayTask(newTask);
    e.target.reset();
  });
  clear.addEventListener('click', () => {
    clearAll();
    removeAllChildElements(ulist);
    const tasksList = getTasks();
    tasksList.forEach((task) => displayTask(task));
  });
}
