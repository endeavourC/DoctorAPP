import React from "react";
import Sidebar from "@/components/Sidebar";
import OfferList from "./OfferList";

const OfferSection = () => {
    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <h3 className="text-center py-4">
                        See our latest doctor offers
                    </h3>
                </div>
                <div style={{ position: "relative" }} className="row">
                    <Sidebar size="3">Sidebar</Sidebar>
                    <OfferList />
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
