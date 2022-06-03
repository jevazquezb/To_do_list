function getTasks() {
  const tasksList = JSON.parse(localStorage.getItem('tasksList')) || [];
  return tasksList;
}
    
function saveTasks(data) {
  localStorage.setItem('tasksList', JSON.stringify(data));
}

export { getTasks, saveTasks };