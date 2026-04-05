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

        <div className="mb-3">
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
                <div key={idx} className="bg-zinc-100 p-3 h-[270px] rounded">
                  <div className="flex flex-col justify-between h-full">
                    <div>{review}</div>
                    <div className="text-xl font-medium">{name}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div>
          <div className="landing-page-section-title mb-2">Lokasi Kami</div>

          <div className="overflow-hidden">
            <iframe
              title="Store location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.161315392276!2d99.82726047508143!3d2.091131558744664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302da194706b0d1d%3A0x372451211bcba31d!2sJakarta%20Metro%20(JM)%20%2F%20JM%20Era!5e0!3m2!1sen!2sid!4v1775379128756!5m2!1sen!2sid"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-2 flex justify-between">
            <div className="w-[45%]">
              <div className="font-bold">Alamat</div>
              <div>
                Jl. Gelugur no. 86-88, Rantauprapat, Labuhan Batu, Sumatra
                Utara, 21412
              </div>
            </div>

            <div className="w-[45%]">
              <div className="font-bold">Jam Operasional</div>
              <div>Buka setiap hari</div>
              <div>08:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LandingPage
