import Slider from '../../features/Slider/Slider';
import Carousel from '../../features/Crousel/Carousel';
import "./home.css"

const Home = () => {
  return (
    <>
      <section className='game-present'>
        <Slider />
      </section>
      <section className='popular-games'>
        <Carousel
          key="new-games"
          apiUrl="https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games"
        />
      </section>

    </>
  );
};

export default Home;
