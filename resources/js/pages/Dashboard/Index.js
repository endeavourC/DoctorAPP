import React, { useContext, useMemo } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { getUserData } from "../../data/fetch/user.fetch";
import { useQuery } from "react-query";
import { UserContext } from "../../data/context/user.context";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import Offers from "./components/Offers";
const Dashboard = () => {
    const { getToken } = useContext(UserContext);
    const token = getToken();

    const { isLoading, data } = useQuery(["userData", { token }], getUserData, {
        refetchOnWindowFocus: false
    });
    const userId = useMemo(() => data && data.data.id, [data]);

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

    if (isLoading) return <Loader />;

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <Sidebar items={items} />
                <MDBCol md="8" sm="12">
                    <h2>Welcome, {data.data.name}.</h2>
                    <MDBRow>
                        <Offers userId={userId} />
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Dashboard;
