import React, { useEffect, useState } from 'react';
import logo from "../../Logo1.jpg";
import { useNavigate } from 'react-router-dom';

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


    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };


    const submitDetails = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (!response.ok) {
                return alert(result.error || 'Something went wrong during signup');
            }

            localStorage.setItem("token", result.data.token);
            navigate('/place');
        } catch (error) {
            console.error('Resgistration failed:', error.message);
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center bg-success-subtle position-relative" style={{ height: '100vh' }}>
            <div className="position-absolute top-0 start-0 z-0">
        <img src={logo} alt="Logo" height={100}/>
            </div>
            <div className='shadow-lg rounded-3 p-4 bg-light text-center col-12 col-md-5 mx-auto'>
                <h3 className='text-center'>Register User</h3>
                <form onSubmit={submitDetails}>
                    <div className='row'>
                        <div className='col-6 mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                name='username'
                                value={userData.username}
                                onChange={handleChange}
                                placeholder='Username'
                                required
                            />
                        </div>

                        <div className='d-flex flex-column col-6 mb-3'>
                            <input
                                type='tel'
                                className='form-control'
                                name='phone_number'
                                value={userData.phone_number}
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                placeholder='Phone Number'
                                required
                            />
                        </div>

                        <div className='d-flex justify-content-center align-items-center col-6 mb-3 ps-3'>
                            <label className='form-label me-1'>Gender</label>
                            <select
                                name='gender'
                                className='form-select'
                                value={userData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value='' disabled>Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className='d-flex justify-content-center align-items-center col-6 mb-3'>
                            <label className='form-label me-3'>DOB</label>
                            <input
                                type='date'
                                className='form-control'
                                name='date_of_birth'
                                value={userData.date_of_birth}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mb-2'>
                            <input
                                type='text'
                                className='form-control'
                                name='place'
                                value={userData.place}
                                onChange={handleChange}
                                placeholder='Place'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                value={userData.password}
                                onChange={handleChange}
                                placeholder='Password'
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary mt-3 col-6 mx-auto'>
                            Signup
                        </button>
                    </div>
                </form>

            </div>
        </div >
    );
}
