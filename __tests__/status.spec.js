/**
 * @jest-environment jsdom
 */
import { updatePropertyValue } from '../src/modules/task_manager.js';
// import removeAllChildElements from '../src/modules/remove_dom.js';

describe('Editing function tests', () => {
  test('Change the value of the description property', () => {
    const list = [{completed: false, description: 'First message', index: 1}];
    const index = 1;
    const property = 'description';
    const value = 'Changed message';
    const output = [{completed: false, description: 'Changed message', index: 1}]
    expect(updatePropertyValue(list, index, property, value)).toEqual(output);
  });
});

describe('Updating status function tests', () => {
  test('Change the value of the completed property', () => {
    const list = [{completed: false, description: 'First message', index: 1}];
    const index = 1;
    const property = 'completed';
    const value = true;
    const output = [{completed: true, description: 'First message', index: 1}]
    expect(updatePropertyValue(list, index, property, value)).toEqual(output);
  });
});