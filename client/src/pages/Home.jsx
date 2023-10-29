// import { useEffect } from 'react'
import CategoryCarousel from '../components/UserHome/CategoryCarousel'
import HeroSection from '../components/UserHome/HeroSection'

// import sports from '../assets/sports.jpg'
import ProductCardsContainer from '../components/UserHome/ProductCardContainerHome'
import ServicesSection from '../components/UserHome/ServicesSection'
import { Separator } from '../components/ui/separator'

const Home = () => {
  return (
    <div className="lg:mx-20 min-h-screen mt-[90px]">
      <HeroSection />
      <CategoryCarousel />
      <Separator />
      <div data-aos="fade-up">
        <ProductCardsContainer />
      </div>
      <div data-aos="fade-up">
        <ServicesSection />
      </div>
    </div>
  )
}

export default Home
