import React from 'react';

export default function HomeCarousel() {
  const images = [
    {
      src: 'https://gotoken.in/uploads/091c7cd11bf5e38a7edf62012d6fafdf.jpg',
      alt: 'Doctor consultation banner',
    },
    {
      src: 'https://gotoken.in/uploads/7d5b789def6a3bd45a45fc4fd24694c6.jpg',
      alt: 'Patient booking system demo',
    },
    {
      src: 'https://gotoken.in/uploads/c98a1aec74494bb70ddab1117680fb52.jpg',
      alt: 'Healthcare facility overview',
    },
  ];

  return (
    <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner shadow overflow-hidden">
        {images.map((item, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              src={item.src}
              className="d-block w-100"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
              alt={item.alt}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#homeCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
