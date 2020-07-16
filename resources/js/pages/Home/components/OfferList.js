import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader";
import { getOffers } from "../../../data/fetch/offer.fetch";
import SingleOffer from "./SingleOffer";
import Pagination from "../../../components/Pagination";

const OfferList = () => {
    const [page, setPage] = useState(1);

    const { isLoading, data } = useQuery(["offers", { page }], getOffers, {
        refetchInterval: 20000
    });

    if (isLoading) return <Loader />;

    // console.log(data);

    const handleSetPage = page => {
        setPage(page);
    };

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
            <Pagination
                changePage={handleSetPage}
                current={data.current_page}
                count={data.pages_count}
            />
        </div>
    );
};

export default OfferList;
