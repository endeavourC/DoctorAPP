import React, { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import {
    getOffers as fetchOffers,
    getOffersByFilters
} from "@/data/fetch/offer.fetch";
import { filter } from "@/utils/filter";
export const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const history = useHistory();
    const [offers, setOffers] = useState();
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        city: ""
    });

    const params = history.location.search.replace("?", "");

    /**
     *  Query to get the offers from API.
     *  @param int
     *  @param object
     */

    const { isLoading, data } = useQuery(
        ["offers", { page, params }],
        fetchOffers,
        {
            refetchInterval: 20000
        }
    );

    useEffect(() => {
        setOffers(data);
    }, [data, page]);

    useEffect(() => {
        // Get only active filters
        const getResults = setTimeout(() => {
            const activatedFilters = filter(
                filters,
                filter => filter !== null && filter !== ""
            );

            //Make 'key=value' array
            const query = Object.entries(activatedFilters).map(
                ([key, value]) => `${key}=${value}`
            );

            //Push all of available filters to history

            history.push({
                search: query.join("&")
            });
        }, 500);

        return () => clearTimeout(getResults);
    }, [filters]);

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

    const getFilters = () => filters;

    /**
     *  Change state of current Slider Input
     *  @param stateType is callback Function from state
     *  @param value is the current value of the slider input
     */

    const handleCityInputChange = value => {
        setFilters(prev => ({ ...prev, city: value }));
    };

    const handleMinPriceInputChange = value => {
        setFilters(prev => ({ ...prev, minPrice: value }));
    };

    const handleMaxPriceInputChange = value => {
        setFilters(prev => ({ ...prev, maxPrice: value }));
    };

    return (
        <OfferContext.Provider
            value={{
                getOffers,
                setPage: handleSetPage,
                handleCityInputChange,
                handleMinPriceInputChange,
                handleMaxPriceInputChange,
                getFilters
            }}
        >
            {children}
        </OfferContext.Provider>
    );
};
