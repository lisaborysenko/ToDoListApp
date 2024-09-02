import { removeTaskAC, tasksReducer, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './tasks-reducer';
import { TasksStateType } from '../AppWithRedux';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, removeTaskAC('2', 'todolistId2'));

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every((t) => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to the correct todolist', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC('todolistId2', 'apple'));

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
});

test('correct task status should be changed to the correct value', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, changeTaskStatusAC('todolistId1', '3', true));

  expect(endState['todolistId1'][2].isDone).toBe(true);
});

test('new property with new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };

  const action = addTodolistAC('title lalal');
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2');

  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };

  const action = removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});

test('Change task tittle', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS&HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],

    todolistId2: [
      { id: '1', title: 'Jamon', isDone: true },
      { id: '2', title: 'Kabanos', isDone: true },
      { id: '3', title: 'Cheese', isDone: false },
    ],
  };
  const action = changeTaskTitleAC('1', 'lalala', 'todolistId2');

  const endState = tasksReducer(startState, action);
  expect(endState['todolistId2'][0].title).toBe('lalala');
});
