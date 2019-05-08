import React, { Component } from "react";

class Todos extends Component {
    constructor() {
        super();
        this.state = {
            newTodo: "",
            todos: []
        };
    }

    handleInput = event => {
        this.setState({ newTodo: event.target.value });
        console.log(event.target.value);
    };
    componentDidMount() {
        fetch("https://hunter-todo-api.herokuapp.com/todo-item", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                sillyauth: this.props.auth
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: data
                });
            });
    }
    handleSubmit = () => {
        fetch("https://hunter-todo-api.herokuapp.com/todo-item", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                sillyauth: this.props.auth
            },
            body: JSON.stringify({
                content: this.state.newTodo
            })
        })
            .then(response => response.json())
            .then(todo => {
                console.log(todo);
                console.log(this.state.todos);
                this.setState({
                    todos: [...this.state.todos, todo]
                });
            });
    };

    handleDelete = todo => {
        fetch("https://hunter-todo-api.herokuapp.com/todo-item/" + todo.id, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                sillyauth: this.props.auth
            },
            body: JSON.stringify({
                content: this.state.newTodo
            })
        });
        let arr = this.state.todos.filter(function (item) {
            return item !== todo;
        });
        this.setState({
            todos: arr
        });
    };

    handleToggle = todo => {
        fetch("https://hunter-todo-api.herokuapp.com/todo-item/" + todo.id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                sillyauth: this.props.auth
            },
            body: JSON.stringify({
                completed: !todo.completed
            })
        });
        let arr = this.state.todos;
        arr[arr.indexOf(todo)].completed = !arr[arr.indexOf(todo)].completed;
        this.setState({
            todos: arr
        });
    };

    render() {
        return (
            <div>
                <label>
                    New Todo:
          <input type="text" name="todo" onChange={this.handleInput} />
                </label>
                <button onClick={this.handleSubmit}> Add </button>
                <ul>
                    {
                        this.state.todos.map((todo, index) => (
                        <div key={index}>
                            {todo.completed ? (
                                <li>
                                    <div style="text-decoration: line-through;">{`${todo.content}`}</div>
                                    <button onClick={() => this.handleToggle(todo)}>toggle</button>
                                    <button onClick={() => this.handleDelete(todo)}>delete</button>
                               </li>
                            ) : (
                                    <li>
                                        {`${todo.content}`}
                                        <button onClick={() => this.handleToggle(todo)}>toggle</button>

                                        <button onClick={() => this.handleDelete(todo)}>delete</button>

                                    </li>
                                )}
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Todos;