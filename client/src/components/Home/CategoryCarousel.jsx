import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import bookImage from '../../assets/books.jpg'
import electronicsImage from '../../assets/electronics.jpg'
import appliancesImage from '../../assets/appliances.jpg'
import clothesImage from '../../assets/clothes.jpg'
import sportsImage from '../../assets/sports.jpg'
import freebiesImage from '../../assets/freebies.jpg'
import { Button } from '../ui/button'

export default function CategoryCarousel() {
  const categories = [
    { id: 1, name: 'Books', image: bookImage },
    { id: 2, name: 'Electronics', image: electronicsImage },
    { id: 5, name: 'Appliances', image: appliancesImage },
    { id: 3, name: 'Clothing', image: clothesImage },
    { id: 4, name: 'Sports and fitness', image: sportsImage },
    { id: 6, name: 'Freebies', image: freebiesImage },
  ]
  // useEffect(() => {
  //   Aos.init()
  // }, [])

  return (
    <div data-aos="fade-up" className="mx-auto w-full  py-8 mt-8">
      <h1 className="text-xl ml-6 font-bold px-4 text-left mb-6 bg-primary text-gray-100 py-2 rounded-md inline-block">
        Featured Categories
      </h1>
      <Swiper
        spaceBetween={30}
        style={{
          '--swiper-pagination-color': '#7c3aed',
          // '--swiper-navigation-color': '#fff',
          '--swiper-navigation-size': '32px',
          '--swiper-navigation-sides-offset': '20px',
          '--swiper-pagination-bullet-opacity': '1',
          '--swiper-pagination-bullet-inactive-color': '#fff',
          '--swiper-pagination-bullet-inactive-opacity': '0.7',
          '--swiper-pagination-progressbar-bg-color': 'rgba(0, 0, 0, 0.25)',
        }}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg shadow-lg shadow-gray-500 mx-5 mb-8"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="relative">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[300px] lg:h-[450px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex">
                  <div className="w-full bg-black bg-opacity-20 text-white p-4 rounded-b-md">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <Button
                      onClick={() => {
                        console.log(`Button clicked for ${category.name}`)
                      }}
                    >
                      View Products
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
