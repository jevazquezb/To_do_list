import { getTasks, saveTasks } from './local_storage.js';
import Task from './task_class.js';

function addTask(description, list) {
  const taskId = list.length + 1;
  const newTask = new Task(description, taskId);
  list.push(newTask);
  return [newTask, list];
}

function removeFromStorage(tasksList, key, value) {
  const filteredTasks = tasksList.filter((task) => task[key] !== value);
  for (let i = 0; i < filteredTasks.length; i += 1) {
    filteredTasks[i].index = i + 1;
  }
  return filteredTasks;
}

function updatePropertyValue(tasksList, index, key, value) {
  tasksList.forEach((task) => {
    if (index === task.index) {
      task[key] = value;
    }
  });
  return tasksList;
}

export { addTask, removeFromStorage, updatePropertyValue };
