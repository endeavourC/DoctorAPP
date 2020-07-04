import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: null,
        name: null
    });

    useEffect(() => {
        if (localStorage.getItem("loggedUser")) {
            const currentUser = JSON.parse(localStorage.getItem("loggedUser"));
            setUser(currentUser);
        }
    }, []);

    const loginUser = ({ token, name }) => {
        setUser({
            token,
            name
        });
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({
                token,
                name
            })
        );
    };

    const logoutUser = () => {
        setUser({
            token: null,
            name: null
        });
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({
                token: null,
                name: null
            })
        );
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login: loginUser,
                logout: logoutUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
