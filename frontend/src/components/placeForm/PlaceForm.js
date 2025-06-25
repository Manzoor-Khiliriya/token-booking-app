import React, { useEffect, useState } from 'react';
import logo from '../../Logo2.jpg';
import { useNavigate } from 'react-router-dom';

const PlaceForm = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  const districts = [
    { id: '1', name: 'Kasaragod', places: ['Bekal', 'Kanhangad', 'Kasaragod'] },
    { id: '2', name: 'Kannur', places: ['Kannapuram', 'Kannur', 'Thalassery'] },
    { id: '3', name: 'Wayanad', places: ['Mananthavady', 'Sulthan Bathery', 'Wayanad'] },
    { id: '4', name: 'Kozhikode', places: ['Koyilandy', 'Kozhikode', 'Vadakara'] }
  ];

  useEffect(() => {
    localStorage.removeItem('selectedDistrict');
    localStorage.removeItem('selectedPlace');
  }, []);

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    const selected = districts.find(d => d.id === districtId);
    setPlaces(selected ? selected.places : []);
    setSelectedPlace(null);
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedDistrict && selectedPlace) {
      const districtName = districts.find(d => d.id === selectedDistrict)?.name;
      localStorage.setItem('selectedDistrict', districtName);
      localStorage.setItem('selectedPlace', selectedPlace);
      navigate('/home');
    } else {
      alert("Please select both district and place.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success-subtle min-vh-100 position-relative">
      <div className="position-absolute top-0 start-0 m-3">
        <img src={logo} alt="Logo" height={80} />
      </div>

      <div className="bg-light shadow-lg rounded-4 p-4 text-center w-100" style={{ maxWidth: '500px' }}>
        <h4 className="mb-4 fw-semibold">Select Doctor's Place</h4>

        <div className="row g-3">
          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedDistrict || ''}
              onChange={handleDistrictChange}
            >
              <option value="" disabled>Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <select
              className="form-select"
              value={selectedPlace || ''}
              onChange={handlePlaceChange}
              disabled={!places.length}
            >
              <option value="" disabled>Select Place</option>
              {places.map((place, idx) => (
                <option key={idx} value={place}>{place}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-primary w-100 mt-4 fw-bold" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PlaceForm;
