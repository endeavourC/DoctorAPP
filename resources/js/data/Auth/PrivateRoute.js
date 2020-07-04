import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { UserContext } from "../../data/context/user.context";
import { getCurrentUser } from "../fetch/user.fetch";
const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const user = useContext(UserContext);

    useEffect(() => {
        const currentUser = getCurrentUser(user.user.token).then(res => {
            console.log(res);
        });
    }, []);

    return (
        <Route
            path={path}
            {...rest}
            render={props =>
                user.user.token ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                prevLocation: path,
                                error: "You need to login first!"
                            }
                        }}
                    />
                )
            }
        />
    );
};
export default withRouter(PrivateRoute);
