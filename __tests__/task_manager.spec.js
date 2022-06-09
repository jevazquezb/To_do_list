/**
 * @jest-environment jsdom
 */
import { addTask, removeFromStorage } from '../src/modules/task_manager.js';
import displayTask from '../src/modules/display.js';
import removeAllChildElements from '../src/modules/remove_dom.js';

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
  test('Removing an item from the list', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: true },
    ];
    const index = 1;
    const output = [
      { description: 'Second message', index: 1, completed: true },
    ];
    expect(removeFromStorage(tasksList, 'index', index)).toEqual(output);
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
    expect(removeFromStorage(tasksList, 'index', index)).toEqual(output);
  });
});

describe('Add list elements to the DOM', () => {
  test('Add one new item to the list', () => {
    document.body.innerHTML = '<div>'
    + '  <ul></ul>'
    + '</div>';
    const newTask = { description: 'First message', index: 1, completed: false };

    displayTask(newTask);

    const items = document.querySelectorAll('ul li');

    expect(items).toHaveLength(1);
  });
  test('Add two new items to the list', () => {
    document.body.innerHTML = '<div>'
    + '  <ul></ul>'
    + '</div>';
    const newTask = { description: 'First message', index: 1, completed: false };

    displayTask(newTask);
    displayTask(newTask);

    const items = document.querySelectorAll('ul li');

    expect(items).toHaveLength(2);
  });
  test('Add three new items to the list', () => {
    document.body.innerHTML = '<div>'
    + '  <ul></ul>'
    + '</div>';
    const newTask = { description: 'First message', index: 1, completed: false };

    displayTask(newTask);
    displayTask(newTask);
    displayTask(newTask);

    const items = document.querySelectorAll('ul li');

    expect(items).toHaveLength(3);
  });
});

describe('Remove list elements from the DOM', () => {
  test('Remove the only item from the list', () => {
    document.body.innerHTML = `<div>
       <ul>
         <li></li>
       </ul>
     </div>`;

    const uList = document.querySelector('ul');
    const items = document.querySelectorAll('ul li');
    removeAllChildElements(uList);
    const trimmedList = items.length - 1;
    const newTask = { description: 'First message', index: 1, completed: false };

    for (let i = 0; i < trimmedList; i += 1) {
      displayTask(newTask);
    }

    const newItems = document.querySelectorAll('ul li');

    expect(newItems).toHaveLength(0);
  });
  test('Remove one item from a list of two items', () => {
    document.body.innerHTML = `<div>
       <ul>
         <li></li>
         <li></li>
       </ul>
     </div>`;

    const uList = document.querySelector('ul');
    const items = document.querySelectorAll('ul li');
    removeAllChildElements(uList);
    const trimmedList = items.length - 1;
    const newTask = { description: 'First message', index: 1, completed: false };

    for (let i = 0; i < trimmedList; i += 1) {
      displayTask(newTask);
    }

    const newItems = document.querySelectorAll('ul li');

    expect(newItems).toHaveLength(1);
  });
  test('Remove one item from a list of three items', () => {
    document.body.innerHTML = `<div>
       <ul>
         <li></li>
         <li></li>
         <li></li>
       </ul>
     </div>`;

    const uList = document.querySelector('ul');
    const items = document.querySelectorAll('ul li');
    removeAllChildElements(uList);
    const trimmedList = items.length - 1;
    const newTask = { description: 'First message', index: 1, completed: false };

    for (let i = 0; i < trimmedList; i += 1) {
      displayTask(newTask);
    }

    const newItems = document.querySelectorAll('ul li');

    expect(newItems).toHaveLength(2);
  });
});
