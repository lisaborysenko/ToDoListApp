import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './Todolist';
import { v1 } from 'uuid';
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

export type FilterValuesType = 'active' | 'completed' | 'all';

export type TodoListType = { id: string; title: string; filter: FilterValuesType };

type TasksStateType = {
  [todolistId: string]: Array<TaskType>;
};
function App() {
  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTask({ ...tasksObj });
  }

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTask({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todolist = todolists.find((tl) => tl.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTask({ ...tasksObj });
    }
  }

  function removeTodolist(todolistsId: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistsId);
    setTodolists(filteredTodolist);

    delete tasksObj[todolistsId];
    setTask({ ...tasksObj });
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasksObj, setTask] = useState<TasksStateType>({
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
  });

  function addTodolist(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    };
    setTodolists([todolist, ...todolists]);
    setTask({
      ...tasksObj,
      [todolist.id]: [],
    });
  }

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTask({ ...tasksObj });
    }
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    let newTodolists = todolists.find((t) => t.id === id);
    if (newTodolists) {
      newTodolists.title = newTitle;
      setTodolists([...todolists]);
    }
  }

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
              let tasksForToDoList = tasksObj[tl.id];
              if (tl.filter === 'completed') {
                tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === true);
              }
              if (tl.filter === 'active') {
                tasksForToDoList = tasksForToDoList.filter((t) => t.isDone === false);
              }

              return (
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    addTask={addTask}
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

export default App;
