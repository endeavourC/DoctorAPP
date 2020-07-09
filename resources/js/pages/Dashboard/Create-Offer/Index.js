import React, { useContext } from "react";
import { Formik } from "formik";
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
import { UserContext } from "../../../data/context/user.context";
const CreateOffer = () => {
    const user = useContext(UserContext);
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
                            // if (!values.title) {
                            //     errors.title = "Title is required";
                            // }

                            // if (!values.price) {
                            //     errors.price = "Price is required";
                            // }

                            // if (!values.description) {
                            //     errors.description = "Description is required";
                            // }

                            // if (!values.city) {
                            //     errors.city = "City is required";
                            // }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                // alert(JSON.stringify(values, null, 2));
                                // console.log(values);
                                createOffer(user.getToken(), values);

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
                                {errors.title && touched.title && errors.title}
                                <MDBInput
                                    label="Offer Description"
                                    type="textarea"
                                    name="description"
                                    rows="5"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {errors.description &&
                                    touched.description &&
                                    errors.description}
                                <MDBInput
                                    label="Price"
                                    type="number"
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                />
                                {errors.price && touched.price && errors.price}
                                <MDBInput
                                    label="City"
                                    type="text"
                                    name="city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                />
                                {errors.city && touched.city && errors.city}
                                <FileInput
                                    name="image"
                                    onChange={event => {
                                        setFieldValue(
                                            "image",
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                />
                                <MDBBtn type="submit" disabled={isSubmitting}>
                                    Add offer
                                </MDBBtn>
                            </form>
                        )}
                    </Formik>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default CreateOffer;
