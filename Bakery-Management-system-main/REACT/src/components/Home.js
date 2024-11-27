import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './Home.css';
import CardHome from './CardHome';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';


const slides = ["bread.jpeg","cake1.jpg","cake.jpg","cake2.jpg","c.jpg","donut1.jpg","muffins.jpg"];

const Carousel = () => (
  <Swiper
    effect="coverflow"
    grabCursor
    centeredSlides
    slidesPerView="auto"
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    modules={[EffectCoverflow]}
  >
    {slides.map((slide) => (
      <SwiperSlide key={slide}>
        <img src={slide} alt="" />
      </SwiperSlide>
    ))}
  </Swiper>
);

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/index-product");
      setProducts(response.data.Products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    
    <div >
    <div className="slider-container">
  <h2 className="slider-heading">Sugar Rush</h2>
  <p className="slider-description">Where Tradition Meets Taste: Your Artisan Bakery Experience</p>
  <Carousel />
</div>


      <div className="product-heading">
  Check out our products
</div>
<hr className="hr-line" />


      <div className="row">
        {products.map((item) => (
          <div className="col-4" key={item.id}>
            <CardHome title={item.title} price={item.price} image={item.image} id={item.id} />
          </div>
        ))}
      </div>

      <footer>
      <svg viewBox="0 0 120 28">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 13 -9"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <path
            id="wave"
            d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z"
          />
        </defs>

        <use id="wave3" className="wave" xlinkHref="#wave" x="0" y="-2"></use>
        <use id="wave2" className="wave" xlinkHref="#wave" x="0" y="0"></use>
        <g className="gooeff" filter="url(#goo)">
          <use id="wave1" className="wave" xlinkHref="#wave" x="0" y="1" />
        </g>
      </svg>

      <div className='footer-data'>
        <h3>About Us</h3>
        <p>From Fresh Bites to Warm Sips: The Magic of Sugar Rush</p>
        <ul className="social-icons">
        <li className="social-icon-item">
          <a className="social-icon-link" href="#">
            <FaFacebookF className="social-icon" />
          </a>
        </li>
        <li className="social-icon-item">
          <a className="social-icon-link" href="#">
            <FaTwitter className="social-icon" />
          </a>
        </li>
        <li className="social-icon-item">
          <a className="social-icon-link" href="#">
            <FaInstagram className="social-icon" />
          </a>
        </li>
      </ul>
      </div>
    </footer>
    </div>
  );
}

export default Home;
