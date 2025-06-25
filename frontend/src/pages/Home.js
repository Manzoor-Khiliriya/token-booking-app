import React from 'react';
import Header from '../components/header/Header';
import HomeCarousel from '../components/homeCarousel.js/HomeCarousel';
import DoctorsList from '../components/doctorsList/DoctorsList';
import Footer from '../components/footer/Footer';

export default function Home() {
  return (
    <>
      <Header />

      <main className="bg-body-secondary">
        <section className="mb-4">
          <HomeCarousel />
        </section>

        <section className="container py-3">
          <DoctorsList />
        </section>
      </main>
      <Footer/>
    </>
  );
}
