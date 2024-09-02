import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { EditableSpan } from './EditableSpan';
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';

export type TaskPropsType = {
  taskId: string;
  title: string;
  isDone: boolean;
  todoListId: string;
};

export const Task = React.memo(({ taskId, title, isDone, todoListId }: TaskPropsType) => {
  const dispatch = useDispatch();

  const onRemoveHandler = useCallback(() => {
    dispatch(removeTaskAC(taskId, todoListId));
  }, [dispatch, taskId, todoListId]);

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(todoListId, taskId, newIsDoneValue));
    },
    [dispatch, taskId, todoListId]
  );

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(taskId, newValue, todoListId));
    },
    [dispatch, taskId, todoListId]
  );

  return (
    <ListItem key={taskId} className={isDone ? 'is-done' : ''}>
      <Checkbox
        checked={isDone}
        onChange={onChangeStatusHandler}
        sx={{
          color: pink[400],
          '&.Mui-checked': {
            color: pink[400],
          },
        }}
      />
      <EditableSpan title={title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  );
});
