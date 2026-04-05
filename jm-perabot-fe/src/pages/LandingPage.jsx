import { NavLink } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import heroBackground from '../assets/hero_background.png'
import Layout from '../components/Layout'

const REVIEWS = [
  {
    name: 'mukhsin saragih',
    review:
      'Koko nya ramah, jujur dalam berjualan, kalau ada hadiah dia kasih tau semuanya, harga juga cukup murah dan bersaing, diantar pula ketujuan kita, rekomended buat beli kasur 5 kaki dan 6 kaki',
  },
  {
    name: 'Florencia Natanegara',
    review:
      'harganya lebih murah dari tempat lain, servicenya bagus👍🏻 pelayanan top …',
  },
  { name: 'luna', review: 'mantap otw langganan disini' },
]

const LandingPage = () => {
  return (
    <Layout>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0)), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="mb-3 py-3"
        >
          <div className="text-2xl/7 font-bold w-[55%]">
            Furnitur Pilihan untuk Setiap Sudut Kehidupan Anda
          </div>
          <NavLink to="/categories">
            <div
              style={{
                background: `rgba(0,0, 0, 0.2)`,
              }}
              className="mt-3 p-[10px] w-[150px] text-sm font-medium text-center rounded"
            >
              Jelajahi Katalog
            </div>
          </NavLink>
        </div>

        <div className="landing-page-section-title mb-2">
          Apa Kata Pelanggan Kami
        </div>
        <div>
          <Slider
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            swipeToSlide
            centerMode
            centerPadding="50px"
            className="review-slider"
            adaptiveHeight={false}
          >
            {REVIEWS.map(({ name, review }, idx) => (
              <div key={idx} className="bg-zinc-100 p-3 h-[250px] rounded">
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-3">{review}</div>
                  <div className="text-xl font-medium">{name}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Layout>
  )
}

export default LandingPage
