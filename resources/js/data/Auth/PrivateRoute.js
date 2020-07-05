import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { UserContext } from "../../data/context/user.context";
import Loader from "../../components/Loader";
const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const user = useContext(UserContext);
    const token = user.getToken();
    const { isError, isLoading } = user.getUser();
    if (isError || token === null) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: {
                        prevLocation: path,
                        error: "You need to login first!"
                    }
                }}
            />
        );
    }

    return (
        <Route
            path={path}
            {...rest}
            render={props =>
                isLoading ? <Loader /> : <Component {...props} />
            }
        />
    );
};
export default withRouter(PrivateRoute);
