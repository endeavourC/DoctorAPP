import React, { useState, useContext, useEffect } from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBFormInline
} from "mdbreact";
import { UserContext } from "../../data/context/user.context";
const Header = () => {
    const user = useContext(UserContext);
    const [isOpen, setOpen] = useState(false);
    const toggleCollapse = () => {
        setOpen(!isOpen);
    };
    return (
        <MDBNavbar color="indigo" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text">DoctorAPP</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                <MDBNavbarNav left>
                    <MDBNavItem>
                        <MDBNavLink to="/">Home</MDBNavLink>
                    </MDBNavItem>
                    {user.isLogged ? (
                        <>
                            <MDBNavItem>
                                <MDBNavLink to="/dashboard">
                                    Dashboard
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <button
                                    onClick={user.logout}
                                    style={{
                                        border: "none",
                                        background: "none"
                                    }}
                                    className="nav-link"
                                >
                                    Logout
                                </button>
                            </MDBNavItem>
                        </>
                    ) : (
                        <>
                            <MDBNavItem>
                                <MDBNavLink to="/login">Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/register">Register</MDBNavLink>
                            </MDBNavItem>
                        </>
                    )}
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBFormInline waves>
                            <div className="md-form my-0">
                                <input
                                    className="form-control mr-sm-2"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                            </div>
                        </MDBFormInline>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    );
};

export default Header;
