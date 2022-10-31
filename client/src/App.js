import { useEffect, useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="App">
            <h1>Welcome User</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                {todos.map(todo =>
                    <div className={"todo" + (todo.complete ? 'is-complete' : '')} key={todo._id}>
                        <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                        <div className="delete-todo">x</div>
                    </div>)}
            </div>
        </div>
    );
}

export default App;