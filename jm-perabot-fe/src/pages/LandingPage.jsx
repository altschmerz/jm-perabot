import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
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
                  <div className="">{review}</div>
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
