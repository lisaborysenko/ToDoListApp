import { useCallback } from 'react';
import './App.css';
import { TaskType, TodoList } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type FilterValuesType = 'active' | 'completed' | 'all';

export type TodoListType = { id: string; title: string; filter: FilterValuesType };

export type TasksStateType = {
  [todolistId: string]: Array<TaskType>;
};
function AppWithRedux() {
  console.log('AppWithRedux is called');
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolists);

  const changeFilter = useCallback(
    (value: FilterValuesType, todoListId: string) => {
      dispatch(changeTodolistFilterAC(todoListId, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistsId: string) => {
      dispatch(removeTodolistAC(todolistsId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(id, newTitle));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#707070' }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 3 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TO DO LIST
            </Typography>
            <Button color="inherit">LOGIN</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container gap={5}>
          <Grid container marginTop={5}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container gap={5}>
            {todolists.map((tl) => {
              return (
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
