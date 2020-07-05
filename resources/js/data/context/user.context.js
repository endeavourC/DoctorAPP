import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getCurrentUser } from "../fetch/user.fetch";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setLogged] = useState(false);

    const getToken = () => {
        if (localStorage.getItem("loggedUser")) {
            return JSON.parse(localStorage.getItem("loggedUser")).token;
        } else {
            return null;
        }
    };

    const loginUser = ({ token }) => {
        setLogged(true);
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({
                token
            })
        );
    };

    const getUser = () => {
        const token = getToken();
        if (token !== null) {
        }
        const { status, isLoading, isError, isSuccess } = useQuery(
            ["user_id", { token }],
            getCurrentUser,
            {
                retry: 0,
                retryDelay: 0
            }
        );
        return { status, isLoading, isError, isSuccess };
    };

    const logoutUser = () => {
        setLogged(false);
        localStorage.setItem(
            "loggedUser",
            JSON.stringify({
                token: null
            })
        );
    };

    return (
        <UserContext.Provider
            value={{
                isLogged,
                getUser,
                getToken,
                login: loginUser,
                logout: logoutUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
