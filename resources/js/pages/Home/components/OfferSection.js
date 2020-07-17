import React from "react";
import Sidebar from "@/components/Sidebar";
import OfferList from "./OfferList";
import { OfferProvider } from "@/data/context/offer.context";
import OfferFilters from "./OfferFilters";
const OfferSection = () => {
    return (
        <OfferProvider>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <h3 className="text-center py-4">
                            See our latest doctor offers
                        </h3>
                    </div>
                    <div style={{ position: "relative" }} className="row">
                        <Sidebar size="3">
                            <OfferFilters />
                        </Sidebar>
                        <OfferList />
                    </div>
                </div>
            </section>
        </OfferProvider>
    );
};

export default OfferSection;
