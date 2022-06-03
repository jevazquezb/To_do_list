/* eslint-disable import/no-mutable-exports */
import Task from './task_class.js';

export let tasksList;

export function getTasks() {
  tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
  return tasksList;
}

export function saveTasks(data = tasksList) {
  localStorage.setItem('tasksList', JSON.stringify(data));
}

export function addTask(description) {
  const taskId = tasksList.length + 1;
  const newTask = new Task(description, taskId);
  tasksList.push(newTask);
  return newTask;
}

export function removeFromStorage(e) {
  getTasks();
  const taskId = +e.target.id.slice(5);
  const filteredTasks = tasksList.filter((task) => task.index !== taskId);
  for (let i = 0; i < filteredTasks.length; i += 1) {
    filteredTasks[i].index = i + 1;
  }
  saveTasks(filteredTasks);
}

export function removeAllChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function editDescription(e) {
  getTasks();
  const taskId = +e.target.id.slice(4);
  tasksList.forEach((task) => {
    if (taskId === task.index) {
      task.description = e.target.value;
    }
  });
  saveTasks();
}