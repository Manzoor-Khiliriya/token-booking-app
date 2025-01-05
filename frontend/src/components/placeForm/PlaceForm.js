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

        const selectedDistrict = districts.find(district => district.id === districtId);
        setPlaces(selectedDistrict ? selectedDistrict.places : []);
        setSelectedPlace(null);
    };

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
    };

    const handleSubmit = () => {
        if (selectedDistrict && selectedPlace) {
            const districtName = districts.find(district => district.id === selectedDistrict)?.name;
            navigate('/home');
            localStorage.setItem('selectedDistrict',districtName );
            localStorage.setItem('selectedPlace', selectedPlace)
        } else {
            alert("Please select both district and place");
        }
    };
   

    return (
        <div className="d-flex justify-content-center align-items-center bg-success-subtle position-relative" style={{ height: '100vh' }}>
            <div className="z-0 position-absolute top-0 start-0">
                <img src={logo} alt="Logo" height={100} />
            </div>
            <div className="shadow-lg rounded-3 p-4 bg-light text-center">
                <h4>Select doctor's  place</h4>
                <div className="d-flex gap-3">
                    <div>
                        <select className="form-select" aria-label="Select district" value={selectedDistrict || ''} onChange={handleDistrictChange}>
                            <option value="" disabled>Select district</option>
                            {districts.map(district => (
                                <option key={district.id} value={district.id}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className="form-select" aria-label="Select place" value={selectedPlace || ''} onChange={handlePlaceChange}>
                            <option value="" disabled>Select place</option>
                            {places.map((place, index) => (
                                <option key={index} value={place}>{place}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default PlaceForm;
