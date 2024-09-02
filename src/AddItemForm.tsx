import { ControlPoint } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import { pink, purple, yellow } from '@mui/material/colors';
import React from 'react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormType) => {
  console.log('AddItemForm is called');
  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required!');
    }
  };
  const onChangeStatusHadler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.key === 'Enter') {
      addTask();
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <TextField
        variant={'outlined'}
        label={'Type value'}
        // className={error ? "error" : ""} тоже самое что и внизу , оператор !! мнняет значение на булевый оператор
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onChange={(e) => {
          setNewTaskTitle(e.currentTarget.value);
          onChangeStatusHadler(e);
        }}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <IconButton
        sx={{
          color: pink[400],
          '&.Mui-checked': {
            color: pink[400],
          },
        }}
        onClick={() => {
          addTask();
        }}
      >
        <ControlPoint />
      </IconButton>
    </div>
  );
});
