import React, { useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { addTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { Task, TaskPropsType } from './Task';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const tasks = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id]);
  const dispatch = useDispatch();

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props]);
  const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props]);

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(props.id, title));
    },
    [dispatch, props.id]
  );

  let tasksForToDoList = tasks;

  if (props.filter === 'completed') {
    tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === true);
  }
  if (props.filter === 'active') {
    tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" size="large" onClick={removeTodolist}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ paddingLeft: 0 }}>
        {tasksForToDoList.map((task) => (
          <Task key={task.id} taskId={task.id} title={task.title} isDone={task.isDone} todoListId={props.id} />
        ))}
      </ul>

      <div>
        <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler} color={'inherit'}>
          All
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'text'}
          color={'inherit'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          color={'inherit'}
          onClick={onCompletedClickHandler}
          sx={{
            color: pink[400],
            '&.Mui-checked': {
              color: pink[400],
            },
          }}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
