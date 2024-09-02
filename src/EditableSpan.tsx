import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log('Editable Span');
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    if (title !== props.title) {
      props.onChange(title);
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField variant={'standard'} value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});
