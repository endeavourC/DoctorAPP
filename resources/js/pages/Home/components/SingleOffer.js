import React from "react";
import { currency } from "@/utils/currency";
import { Link } from "mdbreact";
const SingleOffer = ({
    id,
    slug,
    title,
    price,
    description,
    image_thumbnail,
    city,
    user
}) => {
    return (
        <li className="shadow-sm py-2 my-4 w-100 d-flex">
            <div className="card__imgContainer-rounded">
                <img
                    style={{ width: "150px", height: "150px" }}
                    className="rounded-circle "
                    src={`${process.env.MIX_IMAGE_PATH}/${image_thumbnail}`}
                    alt={title}
                />
                <span className="pt-2 d-block text-center text-primary muted">
                    <p>{user}</p>
                    <p className="text-secondary">{city}</p>
                </span>
            </div>
            <article className="p-3">
                <div className="d-flex align-items-center">
                    <h3>{title}</h3>

                    <span className="px-4 text-primary lead">
                        {currency(price)}
                    </span>
                </div>
                <p>{description}</p>
                <Link
                    to={`/offer/${id}-${slug}`}
                    className="d-inline-block btn btn-small btn-success"
                >
                    See offer
                </Link>
            </article>
        </li>
    );
};

export default SingleOffer;
