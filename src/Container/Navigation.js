// JavaScript source code
import React from "react";

const Navigation = ({ handleRoute, signedIn }) => {
    if (signedIn) {
        return (
            <nav style={{ display: "flex", justifyContent: "left" }}>
                <button
                    style={{ fontSize: "20px", margin: "1vw" }}
                    onClick={() => handleRoute("signout")}
                >Sign Out
                </button>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: "flex", justifyContent: "left" }}>
                <button
                    style={{ fontSize: "20px", margin: "1vw" }}
                    onClick={() => handleRoute("signin")}
                >Sign In
                </button>

                <button
                    style={{ fontSize: "20px", margin: "1vw" }}
                    onClick={() => handleRoute("signup")}
                >Sign Up
                </button>
            </nav>
        );
    }
};

export default Navigation;