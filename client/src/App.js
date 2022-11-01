import { useEffect, useState } from 'react';

function App() {
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/todos')
            .then(res => res.json())
            .then(data => setTodos(Object.values(data)))
            .catch(err => console.log(err))
    }, []);

    const completeTodo = async (todoId) => {
        const data = await fetch('http://localhost:3001/todo/complete/' + todoId)
            .then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }));
    }

    const addTodo = async () => {
        const data = await fetch('http://localhost:3001/todo/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newTodo
            })
        })
            .then(res => res.json());

        setTodos(todos => ([...todos, data]));
        setPopupActive(false);
        setNewTodo('');
    }

    const deleteTodo = async (todoId) => {
        const data = await fetch('http://localhost:3001/todo/delete/' + todoId, {
            method: 'DELETE'
        }).then(res => res.json());

        console.log(data);

        setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
    }

    return (
        <div className="App">
            <h1>Welcome User</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                {todos.length > 0 ? todos.map(todo =>
                    <div className={"todo" + (todo.complete ? ' is-complete' : '')}
                        key={todo._id}
                        onClick={() => completeTodo(todo._id)}>
                        <div className="checkbox"></div>
                        <div className="text">{todo.text}</div>
                        <div className="delete-todo"
                            onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>) : (
                        <p>You don't have tasks</p>
                    )}
            </div>
            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input
                            type="text"
                            className='add-todo-input'
                            onChange={(e) => setNewTodo(e.target.value)}
                            value={newTodo}
                        />
                        <div className="button" onClick={addTodo}>Create Task</div>
                    </div>
                </div>
            ) : ''}
        </div>
    );
}

export default App;