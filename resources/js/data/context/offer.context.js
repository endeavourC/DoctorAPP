import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getOffers as fetchOffers } from "@/data/fetch/offer.fetch";

export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState({});

    const getOffers = page => {
        const { isLoading, data } = useQuery(
            ["offers", { page }],
            fetchOffers,
            {
                refetchInterval: 20000
            }
        );
        return { isLoading, data };
    };

    return (
        <OfferContext.Provider
            value={{
                getOffers
            }}
        >
            {children}
        </OfferContext.Provider>
    );
};
