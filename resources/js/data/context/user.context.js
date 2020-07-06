import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { isCurrentUserAuth, logoutUser as logout } from "../fetch/user.fetch";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setLogged] = useState(false);

    useEffect(() => {
        if (getToken() !== null) {
            setLogged(true);
        }
    }, []);

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

    const isAuthUser = () => {
        const token = getToken();
        const { status, isLoading, isError, isSuccess, data } = useQuery(
            ["user_id", { token }],
            isCurrentUserAuth,
            {
                retry: 0,
                retryDelay: 0,
                refetchOnWindowFocus: false
            }
        );
        return { status, isLoading, isError, isSuccess, data };
    };

    const logoutUser = () => {
        logout(getToken());
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
                isAuthUser,
                getToken,
                login: loginUser,
                logout: logoutUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
