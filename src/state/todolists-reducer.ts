import { FilterValuesType, TodoListType } from '../AppWithRedux';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string;
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  title: string;
  todolistId: string;
};
type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  id: string;
  title: string;
};
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodoListType> = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
];

export const todolistsReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.id !== action.id);
    }
    case 'ADD-TODOLIST': {
      return [{ id: action.todolistId, title: action.title, filter: 'all' }, ...state];
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map((todolist) => (todolist.id === action.id ? { ...todolist, title: action.title } : todolist));
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map((todolist) => (todolist.id === action.id ? { ...todolist, filter: action.filter } : todolist));
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1() };
};

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter };
};
