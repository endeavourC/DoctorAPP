import React, { useState, useContext, useEffect } from "react";
import SliderInput from "@/components/SliderInput";
import { OfferContext } from "@/data/context/offer.context";
import SelectInput from "@/components/SelectInput";
const OfferFilters = () => {
    const offerStore = useContext(OfferContext);

    const handleInputChange = offerStore.handleInputChange;

    return (
        <form method="GET" action="">
            <SliderInput
                onChange={handleInputChange}
                stateType={offerStore.setMinPrice}
                name="min-price"
                title="Min Price"
                currentValue={offerStore.minPrice}
                maxValue={110}
            />
            <SliderInput
                onChange={handleInputChange}
                stateType={offerStore.setMaxPrice}
                name="max-price"
                title="Max Price"
                currentValue={offerStore.maxPrice}
                maxValue={110}
            />
            <SelectInput options={[{ name: "Opole", value: "Opole" }]} />
        </form>
    );
};

export default OfferFilters;
