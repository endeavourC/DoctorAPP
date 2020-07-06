import React, { useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdbreact";
import { Formik } from "formik";
import { Link, useHistory, Redirect } from "react-router-dom";
import Loader from "../../components/Loader";
import { registerUser } from "../../data/fetch/user.fetch";
import { UserContext } from "../../data/context/user.context";
import { RES_ERROR } from "../../data/constants/user.constants";
const Register = () => {
    const history = useHistory();
    const user = useContext(UserContext);

    if (user.getToken() !== null) {
        const { isLoading, data } = user.isAuthUser();
        if (isLoading) {
            return <Loader />;
        }
        if (!isLoading && data.message !== UNAUTHORIZED) {
            return (
                <Redirect
                    to={{
                        pathname: "/dashboard"
                    }}
                />
            );
        }
    }

    return (
        <MDBContainer className="pt-5">
            <h3 className="text-center">Sign up in our DoctorApp</h3>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    c_password: ""
                }}
                validate={values => {
                    const errors = {};

                    // name validation
                    if (!values.name) {
                        errors.name = "Your name is required.";
                    }

                    // email validation
                    if (!values.email) {
                        errors.email = "Your email is required.";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Invalid email address";
                    }

                    // password validation
                    if (!values.password) {
                        errors.password = "Your password is required.";
                    } else if (values.password.length < 8) {
                        errors.password =
                            "Your passsword must contain  at least 8 letters";
                    }
                    if (values.password !== values.c_password) {
                        errors.c_password =
                            "The password and confirm password must be the same.";
                    }

                    // get errors
                    return errors;
                }}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                    setTimeout(() => {
                        const request = registerUser(values).then(res => {
                            console.log(res);
                            if (Object.keys(res)[0] === RES_ERROR) {
                                const resErrors = Object.entries(res.error);
                                const objectErorrs = resErrors.map(
                                    ([key, value]) => {
                                        const data = {};
                                        data[key] = value.toString();
                                        return data;
                                    }
                                );
                                setErrors(objectErorrs[0]);
                            } else {
                                user.login({
                                    token: res.success.token,
                                    name: res.success.name
                                });
                                history.push("/dashboard");
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
                    isSubmitting
                    /* and other goodies */
                }) => (
                    <form
                        style={{
                            opacity: isSubmitting ? "0.7" : "1",
                            position: "relative"
                        }}
                        onSubmit={handleSubmit}
                    >
                        <MDBInput
                            label="Your Name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {
                            <p className="red-text">
                                {errors.name && touched.name && errors.name}
                            </p>
                        }
                        <MDBInput
                            label="Your Email Address"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {
                            <p className="red-text">
                                {errors.email && touched.email && errors.email}
                            </p>
                        }
                        <MDBInput
                            label="Your password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {
                            <p className="red-text">
                                {errors.password &&
                                    touched.password &&
                                    errors.password}
                            </p>
                        }
                        <MDBInput
                            label="Confirm password"
                            type="password"
                            name="c_password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repeat_password}
                        />
                        {
                            <p className="red-text">
                                {errors.c_password &&
                                    touched.c_password &&
                                    errors.c_password}
                            </p>
                        }
                        <MDBBtn
                            type="submit"
                            color="indigo"
                            disabled={isSubmitting}
                        >
                            Submit
                        </MDBBtn>
                        <p className="pt-2">
                            Have already an account?{" "}
                            <Link to="/login">Log In</Link>
                        </p>
                        {isSubmitting ? <Loader /> : null}
                    </form>
                )}
            </Formik>
        </MDBContainer>
    );
};

export default Register;
