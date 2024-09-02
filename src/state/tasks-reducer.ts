import { FilterValuesType, TasksStateType, TodoListType } from '../AppWithRedux';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string;
};
type AddTaskActionType = {
  type: 'ADD-TASK';
  todolistId: string;
  title: string;
};

type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  todolistId: string;
  taskId: string;
  isDone: boolean;
};
type ChangeTaskTittleActionType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  newTitle: string;
  todoListId: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ChangeTaskTittleActionType;

const initialState: TasksStateType = {
  [todolistId1]: [
    { id: v1(), title: 'CSS&HTML', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'RestAPI', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'Jamon', isDone: true },
    { id: v1(), title: 'Kabanos', isDone: true },
    { id: v1(), title: 'Cheese', isDone: false },
    { id: v1(), title: 'Blueberry', isDone: false },
    { id: v1(), title: 'Donnut', isDone: false },
  ],
};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return { ...stateCopy };
    }
    case 'ADD-TASK': {
      let task = { id: v1(), title: action.title, isDone: false };

      let stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      let newTasks = [task, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return { ...stateCopy };
    }

    case 'CHANGE-TASK-STATUS': {
      let stateCopy = { ...state };
      let tasks = stateCopy[action.todolistId]; //достаем
      tasks = tasks.map((t) => (t.id === action.taskId ? { ...t, isDone: action.isDone } : t));

      stateCopy[action.todolistId] = tasks; //запихиваем
      return { ...stateCopy };

      // let todolistTasks = state[action.todolistId];
      // let task = todolistTasks.find((t) => t.id === action.taskId);
      // if (task) {
      //   task.isDone = action.isDone;
      // }
      // state[action.todolistId] = [...todolistTasks];
      // return { ...state };
    }

    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }

    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }

    case 'CHANGE-TASK-TITLE': {
      let stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.newTitle;
      }
      return { ...stateCopy };
    }

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
  return { type: 'ADD-TASK', todolistId: todolistId, title: title };
};

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, isDone: isDone };
};

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): ChangeTaskTittleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskId: taskId, newTitle: newTitle, todoListId: todoListId };
};
