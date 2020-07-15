import React, { useContext } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Sidebar from "../../components/Sidebar";
import { Route, Switch } from "react-router-dom";
import CreateOffer from "./Create-Offer";
import EditOffer from "./Edit-Offer";
import DashboardPanel from "./DashboardPanel";
import PrivateRoute from "../../data/Auth/PrivateRoute";
import ErrorPage from "../../pages/404";
const Dashboard = () => {
    const items = [
        {
            title: "Add new Offer",
            path: "/dashboard/create-offer"
        },
        {
            title: "Dashboard",
            path: "/dashboard/"
        },
        {
            title: "Your Orders",
            path: "/dashboard/orders"
        }
    ];

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <Sidebar items={items} />
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dashboard/"
                        component={DashboardPanel}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/offers/:id/edit"
                        component={EditOffer}
                    />
                    <PrivateRoute
                        exact
                        path="/dashboard/create-offer"
                        component={CreateOffer}
                    />
                    <Route path="*" component={ErrorPage} />
                </Switch>
            </MDBRow>
        </MDBContainer>
    );
};

export default Dashboard;
