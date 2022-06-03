const Task = class {
  constructor(description = null, index = null, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }
};

export { Task as default };
