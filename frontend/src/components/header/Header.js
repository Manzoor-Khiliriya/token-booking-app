import React from "react";
import logo from '../../Logo1.jpg';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'darkblue' }}>
            <div className="container">
                <NavLink className="navbar-brand" to="/home">
                    <img src={logo} height={70} alt="Logo" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                <button className="btn btn-outline-light fw-bold" aria-label="Profile">Profile</button>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={() => localStorage.clear()}>
                                <button className="btn btn-outline-light fw-bold">Add new patient</button>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/place">
                                <button className="btn btn-outline-light fw-bold">Select another place</button>
                            </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Header;
