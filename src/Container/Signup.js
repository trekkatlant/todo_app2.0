import React, { Component } from "react";

class Signup extends Component {
    constructor() {
        super();
        this.state = { username: "" };
    }

    handleInput = event => {
        this.setState({ username: event.target.value });
        console.log(event.target.value);
    };

    handleSubmit = () => {
        fetch("https://hunter-todo-api.herokuapp.com/user", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log(user);
                this.props.handleAuth(user);
                this.props.handleRoute("home");
            });
    };

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <label>
                    Name:
          <input type="text" name="username" onChange={this.handleInput} />
                </label>
                <button onClick={this.handleSubmit}> Sign Up </button>
            </div>
        );
    }
}

export default Signup;
