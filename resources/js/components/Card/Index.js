import React from "react";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCol
} from "mdbreact";
import { currency } from "../../utils/currency";
const OfferCard = ({ id, title, description, price, image }) => {
    return (
        <MDBCol>
            <MDBCard>
                <MDBCardImage
                    className="img-fluid"
                    src={`http://localhost/doctorapp/public/storage/${image}`}
                    waves
                />
                <MDBCardBody>
                    <p>{currency(price)}</p>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>{description.substr(0, 40)}</MDBCardText>
                    <MDBBtn href={`/offers/${id}`}>show offer</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};

export default OfferCard;
