import React from 'react';
import { NavLink } from 'react-router-dom';

const DoctorCard = ({ doctor }) => (
    <div className='col-5 col-md-3 m-3 p-3 border rounded' key={doctor._id}>
        <NavLink className='link-body-emphasis link-underline link-underline-opacity-0' to={`/doctor/${doctor._id}`}>
            <h4>Doctor name: {doctor.name}</h4>
            <h5 className='text-success'>Speciality: {doctor.speciality}</h5>
            <button className="btn btn-primary">
                Available tokens: {doctor.total_tokens - doctor.booked_tokens}
            </button>
        </NavLink>
    </div>
);

export default DoctorCard;
