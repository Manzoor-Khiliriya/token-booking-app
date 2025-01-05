import React, { useEffect, useState } from 'react';
import DoctorCard from '../doctorCard/DoctorCard';


export default function DoctorsList() {
    const [doctorList, setDoctorList] = useState([]);
    const selectedDistrict = localStorage.getItem('selectedDistrict');
    const selectedPlace = localStorage.getItem('selectedPlace');
    const token = localStorage.getItem("token");

    async function fetchDoctors() {
        try {
            const response = await fetch('http://localhost:5000/api/doctors', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();
            setDoctorList(result.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }

    var filteredDoctors = doctorList.filter((doctor) =>
        (doctor.district === selectedDistrict && doctor.place === selectedPlace));

    useEffect(() => {
        fetchDoctors();
    }, [selectedDistrict, selectedPlace]);

    return (
        <div className='m-2 p-2'>
                <h2>Available Doctors</h2>

                <div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-GS-tab" data-bs-toggle="pill" data-bs-target="#pills-GS" type="button" role="tab" aria-controls="pills-GS" aria-selected="false">General Surgeon</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-ENT-tab" data-bs-toggle="pill" data-bs-target="#pills-ENT" type="button" role="tab" aria-controls="pills-ENT" aria-selected="false">ENT</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-cardiologist-tab" data-bs-toggle="pill" data-bs-target="#pills-cardiologist" type="button" role="tab" aria-controls="pills-cardiologist" aria-selected="false">Cardiologist</button>
                        </li>
                    </ul>

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search Doctors.." aria-label="Search Doctors.." />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <div className="tab-content" id="pills-tabContent">
                        <div id="pills-home" className="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div className='container-fluid'>
                                <div className='row'>
                                    {filteredDoctors.map(doctor => (
                                        <DoctorCard doctor={doctor} key={doctor._id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-GS" role="tabpanel" aria-labelledby="pills-GS-tab" tabIndex="0">
                            <div className='container-fluid'>
                                <div className='row'>
                                    {filteredDoctors.filter(doctor => doctor.speciality === 'Surgical specialities').map(doctor => (
                                        <DoctorCard doctor={doctor} key={doctor._id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-ENT" role="tabpanel" aria-labelledby="pills-ENT-tab" tabIndex="0">
                            <div className='container-fluid'>
                                <div className='row'>
                                    {filteredDoctors.filter(doctor => doctor.speciality === 'Otolaryngology').map(doctor => (
                                        <DoctorCard doctor={doctor} key={doctor._id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pills-cardiologist" role="tabpanel" aria-labelledby="pills-cardiologist-tab" tabIndex="0">
                            <div className='container-fluid'>
                                <div className='row'>
                                    {filteredDoctors.filter(doctor => doctor.speciality === 'Cardiology').map(doctor => (
                                        <DoctorCard doctor={doctor} key={doctor._id} />
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
    )
}


