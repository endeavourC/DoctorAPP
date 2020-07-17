import React, { useContext } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdbreact";
import { Formik } from "formik";
import { useHistory, Redirect } from "react-router-dom";
import Loader from "@/components/Loader";
import { UserContext } from "@/data/context/user.context";
import { loginUser } from "@/data/fetch/user.fetch";
import { RES_ERROR, UNAUTHORIZED } from "@/data/constants/user.constants";
const Login = () => {
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
            <h3 className="text-center">Log In to DoctorApp</h3>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validate={values => {
                    const errors = {};

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
                    }

                    // get errors
                    return errors;
                }}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                    setTimeout(() => {
                        const request = loginUser(values).then(res => {
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
                        <MDBBtn
                            type="submit"
                            color="indigo"
                            disabled={isSubmitting}
                        >
                            Submit
                        </MDBBtn>
                        {isSubmitting ? <Loader /> : null}
                    </form>
                )}
            </Formik>
        </MDBContainer>
    );
};

export default Login;
