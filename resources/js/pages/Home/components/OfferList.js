import React from "react";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader";
import { getOffers } from "../../../data/fetch/offer.fetch";
import SingleOffer from "./SingleOffer";

const OfferList = () => {
    const { isLoading, data } = useQuery("offers", getOffers, {
        refetchInterval: 10000
    });

    console.log("get-refetched");
    if (isLoading) return <Loader />;

    return (
        <div className="row col-md-9 col-sm-12">
            <ul style={{ listStyle: "none" }}>
                {data &&
                    data.offers.map(offer => (
                        <SingleOffer
                            title={offer.title}
                            description={offer.description}
                            price={offer.price}
                            user={offer.user.name}
                            image_thumbnail={offer.image_thumbnail}
                            key={offer.id}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default OfferList;
