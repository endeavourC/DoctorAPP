import React from "react";
import { MDBCol, MDBNav, MDBNavLink } from "mdbreact";
const Sidebar = ({ items, children, size = "4" }) => {
    return (
        <MDBCol md={size} sm="12" className="card-body">
            <MDBNav className="d-flex flex-column font-weight-bold">
                {items &&
                    items.map(item => (
                        <MDBNavLink key={item.path} to={item.path}>
                            {item.title}
                        </MDBNavLink>
                    ))}
                {children}
            </MDBNav>
        </MDBCol>
    );
};

export default Sidebar;
