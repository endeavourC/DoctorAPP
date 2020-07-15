import React from "react";
import OfferCard from "./Card";
import { getOffersByUserId } from "../../../data/fetch/offer.fetch";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader";
const Offers = ({ userId }) => {
    const userOffers = useQuery(["userOffers", { userId }], getOffersByUserId, {
        refetchOnWindowFocus: false
    });

    return (
        <>
            <h3 className="pt-5 w-100 text-center">Your offers</h3>
            {userOffers.data ? (
                userOffers.data.offers.length ? (
                    userOffers.data.offers.map(offer => (
                        <OfferCard
                            key={offer.id}
                            title={offer.title}
                            description={offer.description}
                            price={offer.price}
                            image_thumbnail={offer.image_thumbnail}
                            id={offer.id}
                        />
                    ))
                ) : (
                    <p className="text-primary lead mt-4 w-100">
                        You have no offer created yet.
                    </p>
                )
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Offers;
