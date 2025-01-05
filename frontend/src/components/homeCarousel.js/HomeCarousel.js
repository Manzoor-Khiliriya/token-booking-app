import React from 'react';

export default function HomeCarousel() {
  return (
    <div id="carouselExample1" className="carousel slide ">
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src="https://gotoken.in/uploads/091c7cd11bf5e38a7edf62012d6fafdf.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
            <img src="https://gotoken.in/uploads/7d5b789def6a3bd45a45fc4fd24694c6.jpg" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
            <img src="https://gotoken.in/uploads/c98a1aec74494bb70ddab1117680fb52.jpg" className="d-block w-100" alt="..." />
        </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample1" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample1" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>
  )
}
