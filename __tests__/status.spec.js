/**
 * @jest-environment jsdom
 */
import {
  updatePropertyValue,
  removeFromStorage,
} from '../src/modules/task_manager.js';
// import removeAllChildElements from '../src/modules/remove_dom.js';

describe('Editing function tests', () => {
  test('Change the value of the description property', () => {
    const list = [{ completed: false, description: 'First message', index: 1 }];
    const index = 1;
    const property = 'description';
    const value = 'Changed message';
    const output = [
      { completed: false, description: 'Changed message', index: 1 },
    ];
    expect(updatePropertyValue(list, index, property, value)).toEqual(output);
  });
});

describe('Updating status function tests', () => {
  test('Change the value of the completed property', () => {
    const list = [{ completed: false, description: 'First message', index: 1 }];
    const index = 1;
    const property = 'completed';
    const value = true;
    const output = [
      { completed: true, description: 'First message', index: 1 },
    ];
    expect(updatePropertyValue(list, index, property, value)).toEqual(output);
  });
});

describe('Remove all completed task', () => {
  test('Remove task marked as complete', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: false },
      { description: 'Third message', index: 3, completed: true },
      { description: 'Fourth message', index: 4, completed: true },
    ];
    const isCompleted = true;
    const output = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: false },
    ];
    expect(removeFromStorage(tasksList, 'completed', isCompleted)).toEqual(output);
  });

  test('Return all the list if no task is completed', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: false },
      { description: 'Third message', index: 3, completed: false },
      { description: 'Fourth message', index: 4, completed: false },
    ];
    const isCompleted = true;

    const output = [
      { description: 'First message', index: 1, completed: false },
      { description: 'Second message', index: 2, completed: false },
      { description: 'Third message', index: 3, completed: false },
      { description: 'Fourth message', index: 4, completed: false },
    ];
    expect(removeFromStorage(tasksList, 'completed', isCompleted)).toEqual(output);
  });

  test('Return empty list if all task are completed', () => {
    const tasksList = [
      { description: 'First message', index: 1, completed: true },
      { description: 'Second message', index: 2, completed: true },
      { description: 'Third message', index: 3, completed: true },
      { description: 'Fourth message', index: 4, completed: true },
    ];
    const isCompleted = true;

    const output = [];
    expect(removeFromStorage(tasksList, 'completed', isCompleted)).toEqual(output);
  });
});
