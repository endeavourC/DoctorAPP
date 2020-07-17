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
import SingleOffer from "./pages/Offer/SingleOffer";
import Header from "./components/Header";
import PrivateRoute from "./data/Auth/PrivateRoute";
// Context API
import UserProvider from "./data/context/user.context";

function App() {
    return (
        <Router>
            <UserProvider>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact
                        path="/offer/:offerId-:offerSlug"
                        component={SingleOffer}
                    />
                    <PrivateRoute path="/dashboard/" component={Dashboard} />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </UserProvider>
        </Router>
    );
}
export default App;

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
