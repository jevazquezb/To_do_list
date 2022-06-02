import './styles/reset.css';
import './styles/style.css';
import Ellipsis from './images/elipsis.png';
import Trash from './images/trash_1.png';

const tasks = [
  {
    description: 'Double-tap to edit',
    completed: true,
    index: 1,
  },
  {
    description: 'Drag \'n drop to reorder your list',
    completed: true,
    index: 2,
  },
  {
    description: 'Manage all your lists in one place',
    completed: true,
    index: 3,
  },
  {
    description: 'Resync to clear out the old',
    completed: true,
    index: 4,
  },
];

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

  const imgTask = document.querySelector(`#img${tmpIndex}`);
  imgTask.src = Trash;
  imgTask.classList.add('trash');
}

function exitTask(e) {
  e.target.classList.remove('uncrossed');

  const tmpIndex = e.target.id.slice(4);
  const taskItem = document.querySelector(`#main${tmpIndex}`);
  taskItem.classList.remove('task-bg-color');

  const imgTask = document.querySelector(`#img${tmpIndex}`);
  imgTask.src = Ellipsis;
  imgTask.classList.remove('trash');
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
  checkbox.id = `check${task.index}`;
  checkbox.addEventListener('click', checkmark);
  taskItem.appendChild(checkbox);

  const taskMsg = document.createElement('input');
  taskMsg.classList.add('g-font', 'task');
  taskMsg.type = 'text';
  taskMsg.maxLength = '255';
  taskMsg.id = `desc${task.index}`;
  taskMsg.value = task.description;
  taskMsg.addEventListener('focusin', enterTask);
  taskMsg.addEventListener('focusout', exitTask);
  taskItem.appendChild(taskMsg);

  const ellipsisBtn = document.createElement('button');
  ellipsisBtn.classList.add('img-btn', 'img-task-btn');

  const imgTask = document.createElement('img');
  imgTask.classList.add('img-size', 'img-task');
  imgTask.alt = 'Vertical ellipses: Move the task up or down';
  imgTask.src = Ellipsis;
  imgTask.id = `img${task.index}`;
  ellipsisBtn.appendChild(imgTask);
  taskItem.appendChild(ellipsisBtn);

  ulist.appendChild(taskItem);
}

tasks.forEach((task) => displayTask(task));
