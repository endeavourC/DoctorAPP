import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateOffer from "./pages/Dashboard/Create-Offer";
import Header from "./components/Header";
import PrivateRoute from "./data/Auth/PrivateRoute";
// Context API
import { UserProvider } from "./data/context/user.context";

function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/create-offer"
                        component={CreateOffer}
                    />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        </UserProvider>
    );
}
export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
