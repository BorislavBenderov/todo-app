function App() {
    return (
        <div className="App">
            <h1>Welcome User</h1>
            <h4>Your Tasks</h4>

            <div className="todos">
                <div className="todo">
                    <div className="checkbox">
                        <div className="text">Go play football</div>
                        <div className="delete-todo">x</div>
                    </div>
                </div>
                <div className="todo is-complete">
                    <div className="checkbox">
                        <div className="text">Go play football</div>
                        <div className="delete-todo">x</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;