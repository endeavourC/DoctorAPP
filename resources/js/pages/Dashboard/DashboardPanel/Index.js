import React, { useMemo, useContext } from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { useQuery } from "react-query";
import { UserContext } from "@/data/context/user.context";
import { getUserData } from "@/data/fetch/user.fetch";
import Loader from "@/components/Loader";
import Offers from "../components/Offers";

const DashboardPanel = () => {
    const { getToken } = useContext(UserContext);
    const token = getToken();

    const { isLoading, data } = useQuery(["userData", { token }], getUserData, {
        refetchOnWindowFocus: false
    });
    const userId = useMemo(() => data && data.data.id, [data]);

    if (isLoading) return <Loader />;

    return (
        <MDBCol md="8" sm="12">
            <h2>Welcome, {data.data.name}.</h2>
            <MDBRow>
                <Offers userId={userId} />
            </MDBRow>
        </MDBCol>
    );
};

export default DashboardPanel;
