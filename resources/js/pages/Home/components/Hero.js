import React from "react";
import { Link } from "react-router-dom";
import { MDBMask } from "mdbreact";

const Hero = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${process.env.MIX_IMAGE_PATH}homepage-background.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <MDBMask overlay="black-strong" className="py-5">
                <div className="container py-5">
                    <div className="justify-content-center row py-5">
                        <h2 className=" w-100 text-white text-center">
                            Welcome in DoctorApp
                        </h2>
                        <p className="w-100 text-white lead text-center">
                            You can find here your favorite doctor and book a
                            visit to them.
                        </p>
                        <Link to="/login" className="mt-5 btn btn-primary">
                            Get started
                        </Link>
                    </div>
                </div>
            </MDBMask>
        </section>
    );
};

export default Hero;
