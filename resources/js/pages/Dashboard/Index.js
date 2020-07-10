import React, { useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBNav, MDBNavLink } from "mdbreact";
import { getUserData } from "../../data/fetch/user.fetch";
import { getOffersByUserId } from "../../data/fetch/offer.fetch";
import { useQuery, queryCache } from "react-query";
import { UserContext } from "../../data/context/user.context";
import Loader from "../../components/Loader";
import OfferCard from "../../components/Card";
const Dashboard = () => {
    const { getToken } = useContext(UserContext);
    const token = getToken();

    const { isLoading, data } = useQuery(["userData", { token }], getUserData, {
        refetchOnWindowFocus: false
    });
    const userId = data && data.data.id;
    const userOffers = useQuery(["userOffers", { userId }], getOffersByUserId, {
        refetchOnWindowFocus: false
    });
    console.log(userOffers);
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
                        <MDBRow>
                            {userOffers.data &&
                                userOffers.data.offers.map(offer => (
                                    <OfferCard
                                        key={offer.id}
                                        title={offer.title}
                                        description={offer.description}
                                        price={offer.price}
                                        image={offer.image}
                                        id={offer.id}
                                    />
                                ))}
                        </MDBRow>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Dashboard;
