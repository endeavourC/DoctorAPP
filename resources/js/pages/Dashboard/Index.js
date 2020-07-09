import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBNav, MDBNavLink } from "mdbreact";
import { getUserData } from "../../data/fetch/user.fetch";
import { useQuery } from "react-query";
import { UserContext } from "../../data/context/user.context";
import Loader from "../../components/Loader";
const Dashboard = () => {
    const { getToken } = useContext(UserContext);
    const token = getToken();
    const { isLoading, data } = useQuery(["userData", { token }], getUserData, {
        refetchOnWindowFocus: false
    });

    if (isLoading) return <Loader />;

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <MDBCol md="4" sm="12" className="card-body">
                    <MDBNav className="d-flex flex-column font-weight-bold">
                        <MDBNavLink to="/dashboard/create-offer">
                            Add new Offer
                        </MDBNavLink>
                        <MDBNavLink to="#!">Change Account Details</MDBNavLink>
                        <MDBNavLink to="#!">Your Orders</MDBNavLink>
                        <MDBNavLink disabled to="#!">
                            Your Feedback
                        </MDBNavLink>
                    </MDBNav>
                </MDBCol>
                <MDBCol md="8" sm="12">
                    <h2>Welcome, {data.data.name}.</h2>
                    <MDBRow>
                        <h3>Your offers</h3>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Dashboard;
