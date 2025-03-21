import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//https://www.npmjs.com/package/react-responsive-carousel
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; //required for carousel

import './App.scss'
import mohan from "./assets/images/Mohan-muruge.jpg";
import skills from "./assets/images/skills.png";
import upload from "./assets/images/Upload-video-preview.jpg";
import TeamRoom from "./components/TeamRoom/TeamRoom";
import DebateRoom from "./components/DebateRoom/DebateRoom";

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDebateRoom, setShowDebateRoom] = useState(true);

  const carouselItems = [
    { id: 1, image: mohan, title: "Topic 1" },
    { id: 2, image: skills, title: "Topic 2" },
    { id: 3, image: upload, title: "Topic 3" },
    { id: 4, image: mohan, title: "Topic 4" },
    { id: 5, image: skills, title: "Topic 5" },
    { id: 6, image: upload, title: "Topic 6" },
    { id: 7, image: mohan, title: "Topic 7" },
    { id: 8, image: skills, title: "Topic 8" },
    { id: 9, image: upload, title: "Topic 9" },
    { id: 10, image: mohan, title: "Topic 10" },
    { id: 11, image: skills, title: "Topic 11" },
    { id: 12, image: upload, title: "Topic 12" },
    { id: 13, image: mohan, title: "Topic 13" }
  ];

  const handleCarouselChange = (index) => {
    setCurrentSlide(index);
  };

  const toggleRoom = () => {
    setShowDebateRoom(prev => !prev);
  };

  return (
    <>
      <section className="carousel-container">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          onChange={handleCarouselChange}
          selectedItem={currentSlide}
          className="carousel"
        >
          {carouselItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} className="carousel__image" alt={item.title} />
              <p className="legend">{item.title}</p>
            </div>
          ))}
        </Carousel>
      </section>

      <div className="room-toggle">
        <button className="room-toggle__button" onClick={toggleRoom}>
          Switch to {showDebateRoom ? 'Team Room' : 'Debate Room'}
        </button>
      </div>

      {showDebateRoom ? (
        <DebateRoom
          topicId={carouselItems[currentSlide].id}
          topicTitle={carouselItems[currentSlide].title}
        />
      ) : (
        <TeamRoom
          topicId={carouselItems[currentSlide].id}
          topicTitle={carouselItems[currentSlide].title}
        />
      )}
    </>
  )
}

export default App
