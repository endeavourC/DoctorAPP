import React, { useContext } from "react";
import { OfferContext } from "@/data/context/offer.context";
import SelectInput from "@/components/SelectInput";
import { MDBInput } from "mdbreact";
const OfferFilters = () => {
    const offerStore = useContext(OfferContext);

    const {
        getFilters,
        handleMinPriceInputChange,
        handleMaxPriceInputChange,
        handleCityInputChange
    } = offerStore;

    const filters = getFilters();

    return (
        <form method="GET" action="">
            <div className="row">
                <div className="col-6">
                    <MDBInput
                        label="Min Price"
                        type="number"
                        value={filters.minPrice}
                        onChange={e =>
                            handleMinPriceInputChange(e.target.value)
                        }
                    />
                </div>
                <div className="col-6">
                    <MDBInput
                        label="Max Price"
                        value={filters.maxPrice}
                        type="number"
                        onChange={e =>
                            handleMaxPriceInputChange(e.target.value)
                        }
                    />
                </div>
            </div>
            <SelectInput
                onChange={handleCityInputChange}
                options={[{ name: "Opole", value: "Opole" }]}
            />
            {/* <button className="m-0 mt-5  w-100 btn btn-primary">Filter</button> */}
        </form>
    );
};

export default OfferFilters;
