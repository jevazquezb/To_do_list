import { addTask, removeFromStorage } from '../src/modules/task_manager.js';
// import { displayTask } from '../src/index.js';

describe('Add function tests', () => {
  test('Adding a message and one item to the list', () => {
    const desc = 'First message';
    const list = [];
    const newtask = {
      completed: false,
      description: 'First message',
      index: 1,
    };
    const updatedList = [
      { description: 'First message', index: 1, completed: false },
    ];
    const output = [newtask, updatedList];
    expect(addTask(desc, list)).toEqual(output);
  });
});

describe('Remove function test', () => {
  test('Removing an item to the list', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: true },
    ];
    const index = 1;
    const output = [
      { description: 'Second message', index: 1, completed: true },
    ];
    expect(removeFromStorage(index, tasksList)).toEqual(output);
  });
  test('Removing an item from a list of three elements', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: true },
      { description: 'Third message', index: 3, completed: false },
    ];
    const index = 1;
    const output = [
      { description: 'Second message', index: 1, completed: true },
      { description: 'Third message', index: 2, completed: false },
    ];
    expect(removeFromStorage(index, tasksList)).toEqual(output);
  });
});

// describe('Add list element to the DOM', () => {
//   test('Add one new item to the list', () => {
//     const uList = document.createElement('ul');
//     uList.id = 'list';
//     const newTask = {
//       description: 'First message',
//       index: 1,
//       completed: false,
//     };
//     const itemToDisplay = displayTask(newTask);
//     uList.appendChild(itemToDisplay);

//     const items = document.querySelectorAll('#list li');

//     expect(items).toHaveLength(1);
//   });
// });
