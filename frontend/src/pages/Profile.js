import React from 'react';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';
import UserDetails from '../components/userDetails/UserDetails';
import UserBookingDetails from '../components/userBookingDetails/UserBookingDetails';
import Footer from '../components/footer/Footer';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-body-secondary min-vh-100">
        <main className="container py-4">
          <div className="row justify-content-center">
            <div>
              <UserDetails />
              <UserBookingDetails />
              <div className="mt-4 ps-3">
                <button
                  className="btn btn-outline-secondary fw-bold"
                  onClick={() => navigate('/home')}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
