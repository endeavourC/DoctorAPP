import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";
import { getOffers } from "@/data/fetch/offer.fetch";
import SingleOffer from "./SingleOffer";
import Pagination from "@/components/Pagination";
import { OfferContext } from "@/data/context/offer.context";

const OfferList = () => {
    const offerStore = useContext(OfferContext);

    // const [page, setPage] = useState(1);

    const { isLoading, offers } = offerStore.getOffers();

    if (isLoading) return <Loader />;

    return (
        <div className="row col-md-9 col-sm-12">
            <ul className="w-100" style={{ listStyle: "none" }}>
                {offers && offers.offers.length ? (
                    offers.offers.map(offer => (
                        <SingleOffer
                            title={offer.title}
                            description={offer.description}
                            price={offer.price}
                            user={offer.user.name}
                            id={offer.id}
                            city={offer.city}
                            slug={offer.slug}
                            image_thumbnail={offer.image_thumbnail}
                            key={offer.id}
                        />
                    ))
                ) : (
                    <p>There is no offer yet.</p>
                )}
            </ul>
            {offers && offers.offers.length > 0 ? (
                <Pagination
                    changePage={offerStore.setPage}
                    current={offers.current_page}
                    count={offers.pages_count}
                />
            ) : null}
        </div>
    );
};

export default OfferList;
