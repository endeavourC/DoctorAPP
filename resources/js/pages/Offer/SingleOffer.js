import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Hero from "@/components/Hero";
import { GetOffer } from "@/data/fetch/offer.fetch";
import Loader from "@/components/Loader";
import { currency } from "@/utils/currency";
const SingleOffer = () => {
    const params = useParams();
    const paramOfferID = params.offerId;
    const paramOfferSlug = params.offerSlug;
    const { isLoading, data } = useQuery(
        ["singleOffer", { paramOfferID, paramOfferSlug }],
        GetOffer
    );

    if (isLoading) return <Loader />;

    const { id, title, description, image, price, city } = data.offers;

    console.log(data);
    return (
        <>
            <Hero title={title} />
            <div className="container">
                <div className="row">
                    <div className="mt-n5 col-md-6 col-sm-12">
                        <img
                            className="img-fluid"
                            src={`${process.env.MIX_IMAGE_PATH}/${image}`}
                            alt={title}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <p className="lead  pt-4">{description}</p>
                        <p>City: {city}</p>
                        <p
                            style={{ fontSize: "20px" }}
                            className="text-primary"
                        >
                            {currency(price)}
                        </p>

                        <button className="btn btn-sm btn-info">Buy now</button>
                    </div>
                </div>
            </div>
            {/* <Opinions postId={id} /> */}
        </>
    );
};

export default SingleOffer;
