import React from 'react';
import Header from '../components/header/Header';
import DoctorsList from '../components/doctorsList/DoctorsList';
import HomeCarousel from '../components/homeCarousel.js/HomeCarousel';

export default function Home() {

    return (
        <div>
            <Header />
            <HomeCarousel />
            <DoctorsList />
        </div>
    );
}

