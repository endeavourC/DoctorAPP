import React, { useState, useContext, useEffect } from "react";
import SliderInput from "@/components/SliderInput";
import { OfferContext } from "@/data/context/offer.context";
const OfferFilters = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [city, setCity] = useState(0);

    const handleInputChange = (stateType, value) => {
        stateType(value);
    };

    return (
        <form method="GET" action="">
            <SliderInput
                onChange={handleInputChange}
                stateType={setMinPrice}
                name="min-price"
                title="Min Price"
                currentValue={minPrice}
                maxValue={110}
            />
        </form>
    );
};

export default OfferFilters;
