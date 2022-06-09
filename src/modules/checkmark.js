import { getTasks, saveTasks } from './local_storage.js';
import { updatePropertyValue } from './task_manager.js';

function checkmark(e) {
  const tmpIndex = +e.target.id.slice(5);
  const taskMsg = document.querySelector(`#desc${tmpIndex}`);
  let status;

  if (e.target.textContent !== '\u2714') {
    e.target.textContent = '\u2714';
    e.target.classList.add('checkmark');
    taskMsg.classList.add('crossed');
    status = true;
  } else {
    e.target.classList.remove('checkmark');
    e.target.textContent = '';
    taskMsg.classList.remove('crossed');
    status = false;
  }
  const tasksList = getTasks();
  const updatedList = updatePropertyValue(tasksList, tmpIndex, 'completed', status);
  saveTasks(updatedList);
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

export { checkmark, checkAgain };
