import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./carousel.css";
import { fetchCarouselData } from "../../store/actions/carouselAction";
import { selectCarouselItems } from "../../store/Selectors/carouselSelector";
import { MdOutlineAdd, MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Carousel: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsFromStore = useSelector(selectCarouselItems);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchCarouselData("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"));
  }, [dispatch]);

  const handlePrev = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      swiperRef.current.slideTo(Math.max(currentIndex - 6, 0));
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      swiperRef.current.slideTo(currentIndex + 6);
    }
  };

  const handleAddToCart = (item: any) => {
    // Dispatch action to add item to cart
    console.log("Added to Cart:", item);
    // You could dispatch an action here to update the Redux store for cart
  };

  const handleAddToWishlist = (item: any) => {
    // Dispatch action to add item to wishlist
    console.log("Added to Wishlist:", item);
    // You could dispatch an action here to update the Redux store for wishlist
  };

  const handleCardClick = (item: any) => {
    // Navigate to the detail page
    navigate(`/detail/${item.id}`);
  };

  if (!itemsFromStore.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      <div className="carousel-navigation">
        <button className="custom-button prev" onClick={handlePrev}>
          <GrFormPrevious />
        </button>
        <button className="custom-button next" onClick={handleNext}>
          <MdOutlineNavigateNext />
        </button>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={10}
        breakpoints={{
          1400: { slidesPerView: 6 },
          1200: { slidesPerView: 5 },
          1000: { slidesPerView: 4 },
          800: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          300: { slidesPerView: 1 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper"
      >
        {itemsFromStore.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="carousel-item" onClick={() => handleCardClick(item)}>
              <span className="add-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>
                <IoCartOutline />
              </span>
              <span
                className="add-wishlist"
                onClick={(e) => { e.stopPropagation(); handleAddToWishlist(item); }}
              >
                <MdOutlineAdd />
              </span>
              <div style={{
                overflow: 'hidden',
              }}>
                <img src={item.image} alt={item.name} className="carousel-image" />

              </div>
              <div className="carousel-content">
                <span className="carousel-category">{item.category}</span>
                <h3 className="carousel-name">{item.name}</h3>
                <span className="carousel-price">
                  {isNaN(item.price) ? "Free" : `$${item.price.toFixed(2)}`}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
