import { getTasks, saveTasks } from './local_storage.js';
import Task from './task_class.js';

function addTask(description, list) {
  const taskId = list.length + 1;
  const newTask = new Task(description, taskId);
  list.push(newTask);
  return [newTask, list];
}

function removeFromStorage(taskId, tasksList) {
  const filteredTasks = tasksList.filter((task) => task.index !== taskId);
  for (let i = 0; i < filteredTasks.length; i += 1) {
    filteredTasks[i].index = i + 1;
  }
  return filteredTasks;
}

function editDescription(e) {
  const tasksList = getTasks();
  const taskId = +e.target.id.slice(4);
  tasksList.forEach((task) => {
    if (taskId === task.index) {
      task.description = e.target.value;
    }
  });
  saveTasks(tasksList);
}

export { addTask, removeFromStorage, editDescription };
