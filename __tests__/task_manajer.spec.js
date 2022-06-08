import { addTask } from '../src/modules/task_manager.js';

describe ('Add function tests', () => {
    test('Adding a message and one item to the list', () => {
        const desc = 'First message';
        const list = [];
        const newtask = {completed: false, description: 'First message', index: 1};
        const updatedList = [{description: 'First message', index: 1, completed: false}];
        const output = [newtask, updatedList];
        expect(addTask(desc, list)).toEqual(output);
    });
});