import React, { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBNav,
    MDBNavLink,
    MDBInput,
    MDBBtn
} from "mdbreact";
import FileInput from "../../../components/FileInput";
import { createOffer } from "../../../data/fetch/offer.fetch";
import { RES_ERROR, RES_SUCCESS } from "../../../data/constants/user.constants";
import { UserContext } from "../../../data/context/user.context";
const CreateOffer = () => {
    const history = useHistory();
    const user = useContext(UserContext);
    return (
        <MDBCol md="8" sm="12">
            <h3>Create Offer</h3>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    price: "",
                    city: "",
                    image: {}
                }}
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
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                    setTimeout(() => {
                        createOffer(user.getToken(), values).then(res => {
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
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <MDBInput
                            label="Offer Title"
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <p className="red-text">
                            {errors.title && touched.title && errors.title}
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
                            {errors.price && touched.price && errors.price}
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
                            {errors.image && touched.image && errors.image}
                        </p>
                        <MDBBtn type="submit" disabled={isSubmitting}>
                            Add offer
                        </MDBBtn>
                    </form>
                )}
            </Formik>
        </MDBCol>
    );
};

export default CreateOffer;
