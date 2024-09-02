# To-Do List Application with React & Redux

This is a fully functional To-Do List application built with React and Redux. The project demonstrates modern React practices and state management using Redux, showcasing a clean and maintainable architecture.

## Key Features

- **Dynamic Task Management**: Add, remove, and edit tasks within multiple to-do lists.
- **Filter Tasks**: Filter tasks by 'All', 'Active', and 'Completed' statuses.
- **State Management**: Utilizes Redux for managing the application state efficiently.

## Technologies Used

- **React**: The application is built using React, leveraging functional components and hooks for state management and lifecycle events.
  - **Hooks**:
    - `useState` for local state management in components.
    - `useDispatch` and `useSelector` from `react-redux` for interacting with the Redux store.
    - `useCallback` for optimizing performance by memoizing callback functions.
- **Redux**: Manages the global state of the application.
  - Actions and reducers are used to handle state updates for tasks and to-do lists.
- **Material-UI**: Provides a set of React components that implement Google's Material Design, including AppBar, Grid, Paper, and more.
- **TypeScript**: Ensures type safety and enhances code quality with static type checking.

## Components

- **AppWithRedux**: The main component that renders the entire application. It includes the top AppBar and a list of to-do lists.
- **TodoList**: Represents a single to-do list with functionalities to change filters, edit titles, and add/remove tasks.
- **Task**: Represents a single task with the ability to update its status and title or delete it.
- **AddItemForm**: A reusable component for adding new tasks and to-do lists with validation.
- **EditableSpan**: A component allowing inline editing of text.

## State Management

- **Tasks Reducer**: Manages the state of tasks, handling actions such as adding, removing, and updating tasks.
- **Todolists Reducer**: Manages the state of to-do lists, handling actions like adding, removing, and updating to-do lists.
- **Action Creators**: Define actions for updating the state and dispatching them from components.

## Testing

- **Unit Tests**: The application includes unit tests for reducers to ensure correctness in task and to-do list management. Tests cover scenarios such as adding and removing tasks, updating task statuses, and adding new to-do lists.

## Getting Started

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/todolist-app.git
    git clone https://github.com/lisaborysenko/ToDoListApp.git
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Run the Application**:
    ```bash
    yarn start
    ```

## Conclusion

This project is a comprehensive demonstration of React and Redux integration. It serves as a solid example of how to build a scalable and maintainable to-do list application, making use of modern JavaScript tools and libraries.

Feel free to explore, contribute, or use it as a reference for your own projects!
