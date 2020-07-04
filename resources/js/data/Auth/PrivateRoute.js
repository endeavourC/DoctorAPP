import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { UserContext } from "../../data/context/user.context";

// 3.3
const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const user = useContext(UserContext);
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
