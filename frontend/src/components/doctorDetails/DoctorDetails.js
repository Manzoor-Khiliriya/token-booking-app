import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Header from '../header/Header';

export default function DoctorDetails() {
    const [doctor, setDoctor] = useState([]);
    const params = useParams();
    const doctorId = params.doctorId;
    const token = localStorage.getItem("token");


    async function loadDoctorById() {
        try {
            const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            setDoctor(result.data);
        } catch (error) {
            console.error('Error fetching doctor:', error);
        }
    }



    useEffect(() => {
        if (doctorId) {
            loadDoctorById();
        }
    }, [doctorId]);
    if (!doctor || !doctor.availability_periods) {
        return <div>Loading...</div>;
    }
    return (
        <>
             <Header />
             <div className="border rounded d-flex flex-column m-2 p-2 border rounded text-center">
            <div>
                <h3>Doctor name: {doctor.name}</h3>
                <h4 className="text-danger-emphasis">Speciality: {doctor.speciality}</h4>
                <h5>Place: {doctor.place}</h5>
            </div>


            <div className='d-flex justify-content-center'>
                <h5>Available Slots : </h5>
                <>
                    {doctor.availability_periods.map((slot, index) => (
                        <div key={index}>
                            <h5>
                                [{slot.start} - {slot.end}],
                            </h5>
                        </div>
                    ))}
                </>

            </div>
            <h5>Remaining Tokens: {doctor.total_tokens - doctor.booked_tokens}</h5>
            <NavLink className='btn btn-primary p-2' to={'/book-token/' + doctorId}>Book Token</NavLink>
        </div>
        </>
     
    );
}
