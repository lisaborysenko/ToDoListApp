import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink, purple } from '@mui/material/colors';
import { Phonelink } from '@mui/icons-material';
// import { Input } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  addTask: (title: string, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todoListId: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
  const removeTodolist = () => props.removeTodolist(props.id);

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

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
        {props.tasks.map((task) => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHadler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHadler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };

          return (
            <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={task.isDone}
                onChange={onChangeStatusHadler}
                sx={{
                  color: pink[400],
                  '&.Mui-checked': {
                    color: pink[400],
                  },
                }}
              />
              <EditableSpan title={task.title} onChange={onChangeTitleHadler} />
              <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItem>
          );
        })}
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
