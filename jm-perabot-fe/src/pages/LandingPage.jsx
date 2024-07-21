import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import dress from "../assets/dress.png";
import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import Card from "../components/Card";
import Layout from "../components/Layout";

const CATEGORIES = [
  { label: "Dresses", imageSrc: dress, alt: "dress" },
  { label: "Beachwear", imageSrc: dress, alt: "dress" },
  { label: "Tops", imageSrc: dress, alt: "dress" },
  { label: "Tees", imageSrc: dress, alt: "dress" },
  { label: "Denim", imageSrc: dress, alt: "dress" },
  { label: "Bottoms", imageSrc: dress, alt: "dress" },
  { label: "Jumpsuits & Two-pieces", imageSrc: dress, alt: "dress" },
  { label: "Lingerie & Loungewear", imageSrc: dress, alt: "dress" },
  { label: "Activewear", imageSrc: dress, alt: "dress" },
  { label: "Shoes & Accessories", imageSrc: dress, alt: "dress" },
];

const LandingPage = () => {
  return (
    <Layout>
      <div>
        <Slider
          infinite
          autoplay
          autoplaySpeed={3000}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
        >
          <div>
            <img src={slide1} alt="slide 1" />
          </div>
          <div>
            <img src={slide2} alt="slide 2" />
          </div>
        </Slider>

        <div class="mt-10">
          <div class="section-title mb-5 text-center">Shop by Category</div>
          <div class="flex flex-wrap">
            {CATEGORIES.map(({ label, imageSrc, alt }, idx) => (
              <div key={idx} class="w-[20%]">
                <Card order={idx} label={label} imageSrc={imageSrc} alt={alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
