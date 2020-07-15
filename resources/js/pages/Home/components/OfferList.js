import React from "react";
import Sidebar from "../../../components/Sidebar";
const OfferList = () => {
    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <h3 className="text-center py-4">
                        See our latest doctor offers
                    </h3>
                </div>
                <div className="row">
                    <Sidebar />
                </div>
            </div>
        </section>
    );
};

export default OfferList;
