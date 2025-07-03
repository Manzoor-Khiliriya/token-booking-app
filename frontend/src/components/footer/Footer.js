import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-primary text-white pt-5 pb-3 border-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h5 className="fw-bold">ON-TOKEN</h5>
                        <p>Book doctor appointments online and skip the waiting room with instant tokens.</p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><a href="/home" className="text-white text-decoration-none">About</a></li>
                            <li><a href="/home" className="text-white text-decoration-none">Find Doctors</a></li>
                            <li><a href="/home" className="text-white text-decoration-none">Contact</a></li>
                            <li><a href="/" className="text-white text-decoration-none">Login</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h6 className="fw-bold">Contact Us</h6>
                        <p>Email: support@ontoken.com</p>
                        <p>Phone: +91 98765 43210</p>
                    </div>
                </div>
                <hr className="border-light" />
                <div className="text-center">
                    <small>&copy; 2025 ON-TOKEN. All rights reserved.</small>
                </div>
            </div>
        </footer>

    );
}
