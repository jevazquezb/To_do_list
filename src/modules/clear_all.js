import { getTasks, saveTasks } from './local_storage.js';

function checkmark(e) {
  const tmpIndex = +e.target.id.slice(5);
  const taskMsg = document.querySelector(`#desc${tmpIndex}`);

  if (e.target.textContent !== '\u2714') {
    e.target.textContent = '\u2714';
    e.target.classList.add('checkmark');
    taskMsg.classList.add('crossed');
    isChecked(tmpIndex, true);
  } else {
    e.target.classList.remove('checkmark');
    e.target.textContent = '';
    taskMsg.classList.remove('crossed');
    isChecked(tmpIndex, false);   
  }
}

function isChecked(index, status) {
  const tasksList = getTasks();
  tasksList.forEach((task) => {
    if (index === task.index) {
      task.completed = status;
    }
  });
  saveTasks(tasksList);
}

function checkAgain(task) {
  const checkbox = document.querySelector(`#check${task.index}`);
  const taskMsg = document.querySelector(`#desc${task.index}`);

  if (task.completed) {
    checkbox.textContent = '\u2714';
    checkbox.classList.add('checkmark');
    taskMsg.classList.add('crossed');
  }
}

function clearAll() {
  const tasksList = getTasks();
  const filteredTasks = tasksList.filter((task) => task.completed === false);
  for (let i = 0; i < filteredTasks.length; i += 1) {
    filteredTasks[i].index = i + 1;
  }
  saveTasks(filteredTasks);
}

export { checkmark, checkAgain, clearAll };

