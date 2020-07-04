import React, { useState, useContext } from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBFormInline,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBBtn
} from "mdbreact";
import { UserContext } from "../../data/context/user.context";
const Header = () => {
    const [isOpen, setOpen] = useState(false);

    const user = useContext(UserContext);
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
                    {user.user.token ? (
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
