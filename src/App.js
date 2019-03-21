import React, { Component } from "react";
import "./App.css";
import Signin from "./Container/Signin";
import Signup from "./Container/Signup";
import Navigation from "./Container/Navigation";
import Todos from "./Container/Todos";
class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            route: "signin",
            signedIn: false,
            auth: ""
        };
    }

    componentDidMount() {
        const auth = sessionStorage.getItem("sillyauth");
        if (auth) {
            this.setState({
                signedIn: true,
                route: "home",
                auth: auth
            });
            return;
        }
    }

    handleAuth = data => {
        sessionStorage.setItem("sillyauth", data.token);
        this.setState({
            auth: data.token
        });
    };

    handleInput = event => {
        console.log(event.target.value);
        this.setState({ input: event.target.value });
    };

    handleRoute = route => {
        if (route === "signout") {
            sessionStorage.clear();
            this.setState({ signedIn: false });
        } else if (route === "home") {
            this.setState({ signedIn: true });
        }
        this.setState({ route: route });
    };

    render() {
        return (
            <div className="App">
                <Navigation
                    signedIn={this.state.signedIn}
                    handleRoute={this.handleRoute}
                />

                {
                    this.state.route === "home" ? (
                    <div>
                        <h1 className="heading">React To Do App</h1>
                        <Todos auth={this.state.auth} />
                    </div>
                    )

                    : this.state.route === "signin" ? (
                    <Signin handleAuth={this.handleAuth} handleRoute={this.handleRoute} />
                    )

                    : (
                    <Signup
                    handleAuth={this.handleAuth}
                    onRouteChange={this.handleRoute}
                    />
                    )
                }
            </div>
        );
    }
}

export default App;