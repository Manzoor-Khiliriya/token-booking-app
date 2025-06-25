import React, { useEffect, useState } from 'react';
import logo from "../../Logo1.jpg";
import { useNavigate } from 'react-router-dom';
import { signUpApi } from '../../services/signUpApi';

export default function UserRegister() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
        place: '',
        password: ''
    });

    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await signUpApi(userData, navigate);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-success-subtle min-vh-100 position-relative">
            <div className="position-absolute top-0 start-0 m-3 z-0">
                <img src={logo} alt="Logo" height={80} />
            </div>

            <div className="bg-light shadow-lg rounded-4 p-4 text-center w-100" style={{ maxWidth: "550px" }}>
                <h3 className="mb-4">User Registration</h3>

                <form onSubmit={submitDetails}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <input
                                type="tel"
                                className="form-control"
                                name="phone_number"
                                value={userData.phone_number}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                placeholder="Phone Number"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <select
                                name="gender"
                                className="form-select"
                                value={userData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <input
                                type={userData.date_of_birth ? 'date' : 'text'}
                                className="form-control"
                                name="date_of_birth"
                                value={userData.date_of_birth}
                                onChange={handleChange}
                                placeholder="Date of Birth"
                                onFocus={(e) => e.target.type = 'date'}
                                required
                            />

                        </div>

                        <div className="col-12">
                            <input
                                type="text"
                                className="form-control"
                                name="place"
                                value={userData.place}
                                onChange={handleChange}
                                placeholder="Place"
                                required
                            />
                        </div>

                        <div className="col-12">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="col-12">
                                <div className="alert alert-danger">{error}</div>
                            </div>
                        )}

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100 fw-bold">
                                Signup
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
