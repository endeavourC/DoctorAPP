import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";
import { getOffers } from "@/data/fetch/offer.fetch";
import SingleOffer from "./SingleOffer";
import Pagination from "@/components/Pagination";
import { OfferContext } from "@/data/context/offer.context";

const OfferList = () => {
    const offerStore = useContext(OfferContext);

    const [page, setPage] = useState(1);

    const { isLoading, data } = offerStore.getOffers(page);

    if (isLoading) return <Loader />;

    const handleSetPage = page => {
        setPage(page);
    };

    return (
        <div className="row col-md-9 col-sm-12">
            <ul className="w-100" style={{ listStyle: "none" }}>
                {data && data.offers.length ? (
                    data.offers.map(offer => (
                        <SingleOffer
                            title={offer.title}
                            description={offer.description}
                            price={offer.price}
                            user={offer.user.name}
                            id={offer.id}
                            slug={offer.slug}
                            image_thumbnail={offer.image_thumbnail}
                            key={offer.id}
                        />
                    ))
                ) : (
                    <p>There is no offer yet.</p>
                )}
            </ul>
            {data.offers.length > 0 && (
                <Pagination
                    changePage={handleSetPage}
                    current={data.current_page}
                    count={data.pages_count}
                />
            )}
        </div>
    );
};

export default OfferList;
