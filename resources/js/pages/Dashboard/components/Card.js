import React, { useContext } from "react";
import { currency } from "../../../utils/currency";
import { UserContext } from "../../../data/context/user.context";
import { useMutation, queryCache } from "react-query";
import { deleteOffer } from "../../../data/fetch/offer.fetch";
import { Link } from "react-router-dom";
import { RES_SUCCESS } from "../../../data/constants/user.constants";
const OfferCard = ({ id, title, description, price, image_thumbnail }) => {
    const user = useContext(UserContext);
    const [mutate] = useMutation(deleteOffer);

    const handleDeleteOffer = async offerId => {
        const token = user.getToken();
        const data = await mutate({ offerId, token });
        if (data.status === RES_SUCCESS) {
            queryCache.invalidateQueries("userOffers");
        }
    };

    return (
        <div className="shadow-sm py-2 my-4 w-100 d-flex">
            <div className="card__imgContainer-rounded">
                <img
                    style={{ width: "150px", height: "150px" }}
                    className="rounded-circle "
                    src={`${process.env.MIX_IMAGE_PATH}/${image_thumbnail}`}
                    alt={title}
                />
            </div>
            <article className=" p-3">
                <div className="d-flex align-items-center">
                    <h3>{title}</h3>
                    <span className="px-4 text-primary lead">
                        {currency(price)}
                    </span>
                    <Link
                        className="btn btn-sm btn-success"
                        to={`/dashboard/offers/${id}/edit`}
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDeleteOffer(id)}
                        className="btn btn-sm btn-danger"
                    >
                        Delete
                    </button>
                </div>
                <p>{description}</p>
            </article>
        </div>
    );
};

export default OfferCard;
