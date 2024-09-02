import { Input, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const OnChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode ? (
    <TextField
      variant={'standard'}
      value={title}
      onBlur={activateViewMode}
      onChange={OnChangeTitleHandler}
      autoFocus={true}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
