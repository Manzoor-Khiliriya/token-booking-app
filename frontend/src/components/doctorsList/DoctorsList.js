import React, { useEffect, useState } from 'react';
import DoctorCard from '../doctorCard/DoctorCard';
import { getAllDoctors } from '../../services/doctorApi';

const SPECIALITIES = [
  { label: 'All', value: 'all' },
  { label: 'General Surgeon', value: 'Surgical specialities' },
  { label: 'ENT', value: 'Otolaryngology' },
  { label: 'Cardiologist', value: 'Cardiology' },
];

export default function DoctorsList() {
  const [doctorList, setDoctorList] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDistrict = localStorage.getItem('selectedDistrict');
  const selectedPlace = localStorage.getItem('selectedPlace');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getAllDoctors(token);
        setDoctorList(data);
      } catch (error) {
        console.error('Error fetching doctors:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedDistrict, selectedPlace, token]);

  const filteredDoctors = doctorList.filter(doctor => {
    const matchLocation =
      doctor.district === selectedDistrict &&
      doctor.place === selectedPlace;

    const matchSpeciality =
      activeSpeciality === 'all' || doctor.speciality === activeSpeciality;

    const matchSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());

    return matchLocation && matchSpeciality && matchSearch;
  });

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Available Doctors</h2>

      <ul className="nav nav-pills justify-content-center mb-4">
        {SPECIALITIES.map(({ label, value }) => (
          <li className="nav-item" key={value}>
            <button
              className={`nav-link ${activeSpeciality === value ? 'active' : ''}`}
              onClick={() => setActiveSpeciality(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <form className="d-flex justify-content-center mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search by name or speciality..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center text-danger">No doctors found for the selected filter.</div>
      ) : (
        <div className="row">
          {filteredDoctors.map(doctor => (
            <div key={doctor._id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
