import './styles/reset.css';
import './styles/style.css';
import storageAvailable from './modules/storage_available.js';
import { getTasks, saveTasks } from './modules/local_storage.js';
import { addTask, removeFromStorage } from './modules/task_manager.js';
import removeAllChildElements from './modules/remove_dom.js';
import { checkAgain } from './modules/checkmark.js';
import displayTask from './modules/display.js'

const form = document.querySelector('form');
const input = document.querySelector('#text');
const ulist = document.querySelector('ul');
const clear = document.querySelector('#clear');

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
    const tasksList = getTasks();
    const tmpList = removeFromStorage(tasksList, 'completed', true);
    saveTasks(tmpList);
    removeAllChildElements(ulist);
    tmpList.forEach((task) => displayTask(task));
  });
}
