import React, { useContext } from "react";
import { Formik } from "formik";
import { useParams, Redirect, useHistory } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBNav,
    MDBNavLink,
    MDBInput,
    MDBBtn
} from "mdbreact";
import { useQuery } from "react-query";
import FileInput from "../../../components/FileInput";
import { updateOffer } from "../../../data/fetch/offer.fetch";
import { RES_ERROR, RES_LOADING } from "../../../data/constants/user.constants";
import { UserContext } from "../../../data/context/user.context";
import { editSingleOffer } from "../../../data/fetch/offer.fetch";
import Loader from "../../../components/Loader";
const EditOffer = () => {
    const params = useParams();
    const offerId = params.id;
    const history = useHistory();
    const user = useContext(UserContext);
    const token = user.getToken();

    const { data, status } = useQuery(
        ["singleOffer", { offerId, token }],
        editSingleOffer,
        {
            refetchOnWindowFocus: false,
            retry: 0
        }
    );
    if (status === RES_ERROR) {
        return (
            <Redirect
                to={{
                    pathname: "/dashboard"
                }}
            />
        );
    }

    if (!data && status === RES_LOADING) return <Loader />;

    console.log(data);

    const {
        price,
        title,
        city,
        description,
        image_thumbnail,
        image
    } = data.offers;

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <MDBCol md="4" sm="12" className="card-body">
                    <MDBNav className="d-flex flex-column font-weight-bold">
                        <MDBNavLink to="/dashboard/create-offer">
                            Add new Offer
                        </MDBNavLink>
                        <MDBNavLink to="#!">Change Account Details</MDBNavLink>
                        <MDBNavLink to="#!">Your Orders</MDBNavLink>
                        <MDBNavLink disabled to="#!">
                            Your Feedback
                        </MDBNavLink>
                    </MDBNav>
                </MDBCol>
                <MDBCol md="8" sm="12">
                    <h3>Edit Offer</h3>
                    <Formik
                        enableReinitialize={true}
                        initialValues={data.offers}
                        validate={values => {
                            const errors = {};
                            if (!values.title) {
                                errors.title = "Title is required";
                            }

                            if (!values.price) {
                                errors.price = "Price is required";
                            }

                            if (!values.description) {
                                errors.description = "Description is required";
                            }

                            if (!values.city) {
                                errors.city = "City is required";
                            }

                            return errors;
                        }}
                        onSubmit={(
                            values,
                            { setSubmitting, setFieldError }
                        ) => {
                            setTimeout(() => {
                                let isImageUploaded = false;

                                if (values.image !== image)
                                    isImageUploaded = true;

                                updateOffer(
                                    user.getToken(),
                                    values,
                                    offerId,
                                    isImageUploaded
                                ).then(res => {
                                    if (res.status === RES_ERROR) {
                                        setFieldError("image", res.data);
                                    } else {
                                        history.goBack();
                                    }
                                });

                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue
                            /* and other goodies */
                        }) => (
                            <form
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <MDBInput
                                    label="Offer Title"
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <p className="red-text">
                                    {errors.title &&
                                        touched.title &&
                                        errors.title}
                                </p>
                                <MDBInput
                                    label="Offer Description"
                                    type="textarea"
                                    name="description"
                                    rows="5"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <p className="red-text">
                                    {errors.description &&
                                        touched.description &&
                                        errors.description}
                                </p>
                                <MDBInput
                                    label="Price"
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                <p className="red-text">
                                    {errors.price &&
                                        touched.price &&
                                        errors.price}
                                </p>
                                <MDBInput
                                    label="City"
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                />
                                <p className="red-text">
                                    {errors.city && touched.city && errors.city}
                                </p>
                                <FileInput
                                    name="image"
                                    onChange={event => {
                                        setFieldValue(
                                            "image",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                />
                                <p className="red-text">
                                    {errors.image &&
                                        touched.image &&
                                        errors.image}
                                </p>
                                <div className="w-25">
                                    <img
                                        className="img-thumbnail rounded"
                                        src={`http://localhost/doctorapp/public/storage/${image_thumbnail}`}
                                        alt={title}
                                    />
                                </div>
                                <MDBBtn type="submit" disabled={isSubmitting}>
                                    Edit offer
                                </MDBBtn>
                            </form>
                        )}
                    </Formik>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default EditOffer;
