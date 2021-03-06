import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { UserContext } from "../../data/context/user.context";
import Loader from "../../components/Loader";
import { UNAUTHORIZED } from "../constants/user.constants";

const NotAuthenticated = ({ path }) => (
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

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const user = useContext(UserContext);
    if (user.getToken() !== null) {
        const { isLoading, data } = user.isAuthUser();
        if (isLoading) {
            return <Loader />;
        }
        if (data.message && data.message === UNAUTHORIZED) {
            return <NotAuthenticated path={path} />;
        }
    } else {
        return <NotAuthenticated path={path} />;
    }

    return (
        <Route
            path={path}
            {...rest}
            render={props => <Component {...props} />}
        />
    );
};
export default withRouter(PrivateRoute);
