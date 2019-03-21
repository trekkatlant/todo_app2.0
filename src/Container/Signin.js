import React, { Component } from "react";

class Signin extends Component {
    constructor() {
        super();
        this.state = { username: "" };
    }

    handleInput = event => {
        this.setState({ username: event.target.value });
        console.log(event.target.value);
    };

    handleSubmit = () => {
        fetch("https://hunter-todo-api.herokuapp.com/auth", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username
            })
        })
            .then(response => response.json())
            .then(data => {
                this.props.handleAuth(data);
                this.props.handleRoute("home");
            });
    };

    render() {
        return (
            <div>
                <h1>Sign In</h1>
                <label>
                    Name:
          <input type="text" name="username" onChange={this.handleInput} />
                </label>
                <button onClick={this.handleSubmit}> Sign In </button>
            </div>
        );
    }
}

export default Signin;