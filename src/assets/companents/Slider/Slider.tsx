import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSliderData } from '../../features/actions/sliderAction';
import { AppDispatch, RootState } from '../../store/store';
import './slider.css';


const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const sliderData = useSelector((state: RootState) => state.slider.sliderData);

  useEffect(() => {
    dispatch(fetchSliderData());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderData?.items?.length) {
        setCurrentSlide((prev) => (prev + 1) % sliderData.items.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [sliderData]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <div className="slider">
      <div className="container">
        {sliderData?.items &&
          sliderData.items.map((item, index) => (
            <div
              key={`slide-${index}`}
              className={`slide ${currentSlide === index ? 'active' : ''}`}
              style={{
                transform: `translateX(${-currentSlide * 100}%)`,
              }}
            >
              <div className="content">
                <h2>{item.title}</h2>
                <p>{item.descr}</p>
                <div className="buttons">
                  <a href="#" className="learn">
                    Learn More
                  </a>
                  <a href="#" className="wishlist">
                    Add to Wishlist
                  </a>
                </div>
              </div>
              {item.image && (
                <div
                  className="image"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    borderRadius: '10px',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    zIndex: -1,
                    backgroundBlendMode: 'overlay',
                    opacity: 0.7,
                    transition: 'opacity 1.5s ease-in-out',
                  }}
                ></div>
              )}
            </div>
          ))}
      </div>
      <div className="thumbnails">
        {sliderData?.items &&
          sliderData.items.map((item, index) => (
            <div
              key={`thumbnail-${index}`}
              className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="thumbnail-bg"></div>
              {item.image && <img src={item.image} alt={item.title} />}
              <h3>{item.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Slider;
