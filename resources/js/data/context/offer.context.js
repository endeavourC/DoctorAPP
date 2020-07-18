import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getOffers as fetchOffers } from "@/data/fetch/offer.fetch";

export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [offers, setOffers] = useState();
    const [page, setPage] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [city, setCity] = useState(0);

    /**
     *  Query to get the offers from API.
     *  @param int
     */

    const { isLoading, data } = useQuery(["offers", { page }], fetchOffers, {
        refetchInterval: 20000
    });
    useEffect(() => {
        setOffers(data);
    }, [data]);

    /**
     *  @return {isLoading, offers}
     *  @param isLoading is the loading state of the query.
     *  @param offers is the React state in Context API.
     */

    const getOffers = () => ({ isLoading, offers });

    /**
     *  Switching page for pagination
     *  @param int
     */

    const handleSetPage = page => {
        setPage(page);
    };

    /**
     *  Change state of current Slider Input
     *  @param stateType is callback Function from state
     *  @param value is the current value of the slider input
     */

    const handleInputChange = (stateType, value) => {
        stateType(value);
    };

    return (
        <OfferContext.Provider
            value={{
                getOffers,
                setPage: handleSetPage,
                handleInputChange,
                maxPrice,
                minPrice,
                setMinPrice,
                setMaxPrice
            }}
        >
            {children}
        </OfferContext.Provider>
    );
};
