import React from 'react';

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import NewTaskInput from './components/NewTaskInput';
import TaskList from './components/TaskList';
import Toolbar from './components/Toolbar';
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';

class App extends React.Component {

  getStoredTodoState() {
    return JSON.parse(localStorage.getItem('storedTodoState'));
  }

  setStoredTodoState() {
    localStorage.setItem('storedTodoState', JSON.stringify(this.state));
  }

  constructor(props) {
    super(props);
    const storedTodoState = this.getStoredTodoState();
    this.state = /* storedTodoState || */ {
      tasks: {},
      id: 0,
      doneCount: 0
    }
    this.onNewTask = this.onNewTask.bind(this);
    this.onTaskStatusChange = this.onTaskStatusChange.bind(this);
    this.onTaskDelete = this.onTaskDelete.bind(this);
    this.onCompletedTaskDelete = this.onCompletedTaskDelete.bind(this);
  }

  onNewTask(task) {
    this.setState((state) => {
      const newId = state.id + 1;
      let newTasks = { ...state.tasks };
      task.id = newId;
      newTasks[newId] = task;
      return ({
        tasks: newTasks,
        id: newId
      });
    });
  }

  onTaskStatusChange(id, description, isDone) {
    this.setState((state) => {
      let newTasks = { ...state.tasks };
      newTasks[id].description = description;
      let newDoneCount;
      // console.log(isDone, state.tasks[id].isDone);
      if(isDone !== state.tasks[id].isDone) {
        newDoneCount = isDone ? state.doneCount + 1 : state.doneCount - 1;
      } else {
        newDoneCount = state.doneCount;
      }
      newTasks[id].isDone = isDone;
      return ({
        tasks: newTasks,
        doneCount: newDoneCount
      });
    });
  }

  onTaskDelete(id) {
    this.setState((state) => {
      let newTasks = { ...state.tasks };
      const newDoneCount = newTasks[id].isDone ? state.doneCount - 1 : state.doneCount;
      delete newTasks[id];
      return ({
        tasks: newTasks,
        doneCount: newDoneCount
      });
    });
  }

  onCompletedTaskDelete() {
    const tasks = {...this.state.tasks};
    Object.keys(tasks).forEach(id => {
      const task = tasks[id];
      if(task.isDone) this.onTaskDelete(id);
    });
  }

  componentDidUpdate() {
    console.log(this.state);
    this.setStoredTodoState();
  }

  render() {
    const tasksWithoutIds = Object.values(this.state.tasks);
    const taskCount = Object.keys(this.state.tasks).length;
    return (
      <Container>
        <Header />
        <NewTaskInput newTask={this.onNewTask} />
        <TaskList tasks={tasksWithoutIds} taskStatusChange={this.onTaskStatusChange} taskDelete={this.onTaskDelete} />
        <Toolbar doneCount={this.state.doneCount} taskCount={taskCount} completedTaskDelete={this.onCompletedTaskDelete}/>
      </Container>
    );
  }
}

export default App;
