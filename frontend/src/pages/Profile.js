import React from 'react';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../components/userDetails/UserDetails';
import UserBookingDetails from '../components/userBookingDetails/UserBookingDetails';


export default function Profile() {
  const navigate = useNavigate();


  return (
    <div className='bg-body-secondary'>
      <Header />
      <div className="container">
        <div className="my-2" >
          <UserDetails />
          <UserBookingDetails />
        </div>
        <button className="btn btn-outline-secondary fw-bold mb-2" onClick={() => {
          navigate('/home')
        }}>Back to home</button>
      </div>

    </div>

  );
};

