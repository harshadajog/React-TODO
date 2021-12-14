import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import { useState } from 'react'; 
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const taskList = tasks.map(task => <Todo id={task.id} key={task.id} name={task.name} completed={task.completed} editTask={editTask} deleteTask={deleteTask} toggleTaskCompleted={toggleTaskCompleted} />);
  const filterList = FILTER_NAMES.map(name => <FilterButton key={name} name={name} />);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map(task => {
      if(id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks':'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
       {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {taskList}
      </ul>
    </div>
  );
}

export default App;
