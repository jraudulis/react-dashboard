import React, {useState} from 'react';
import './ToDo.css'

const ToDoWidget = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');

   const onInputChange = (event) => {
        setInput(event.target.value);
   }

   const addItems = () => {
    const trimedInput = input.trim();
    if (!trimedInput) return;
    setItems(prevItems => [...prevItems, {text: trimedInput, completed: false}]);
    setInput('');
   }

   const handleKeyPress = (event) => {
    if(event.key === 'Enter') addItems();
   }

   const toggleComplete = (i) => {
    setItems(prevItems => prevItems.map((item, index) => {
        if (index === i) { 
            return {...item, completed: !item.completed} 
        } return item;
     })
    );
   }

   const deleteItem = (i)=> {
    setItems(prevItems => prevItems.filter((item, index)=> index !== i));
   }

  return (
    <>
      <div className="todo-widget">
        <h2>Daily Tasks</h2>
        <input onKeyDown={handleKeyPress} onChange={onInputChange} value={input} className="input" type="text" placeholder="Enter item" />
        <button disabled={!input.trim()} onClick={addItems} aria-label="add task" className="btn">Enter</button>
        <ul className="list">{items.map((task, i)=>(
            <li key={i}> 
            <span className={task.completed? 'done' : '' }>{task.text}</span>
            <input onClick={()=> toggleComplete(i)} type="checkbox"/>
            <button onClick={()=> deleteItem(i)}>Delete</button>
            </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoWidget;

