// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import hero_illustration from '../../assets/hero_illustration.svg'
import { Button } from '../ui/button'

const HeroSection = () => {
  return (
    <>
      <div data-aos="zoom-in" className="relative w-full ">
        <div className="flex px-8 flex-col md:flex-row max-w-full mx-auto py-20 md:py-24 items-center">
          <div className="lg:w-7/12 flex-1 text-center md:text-left">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-6">
              Welcome to,
              <br />
              <span className="bg-primary text-gray-100 px-4 transform -skew-x-12 mt-3 inline-block">
                {' '}
                CampusTradeHub!
              </span>
            </h1>
            <p className="my-8 lg:my-8 text-center md:text-justify  max-sm:px-10 text-base xl:text-lg">
              Buy and sell with ease within the campus community. From textbooks
              to tech gadgets, connect with fellow students to find great deals
              and make campus life even more exciting. Ready to get started?
              Explore CampusTradeHub now!
            </p>
            <div className="flex space-x-4 items-center sm:flex-row justify-center md:justify-start mt-8">
              <Link to="/new-product">
                <Button className="font-bold py-3 rounded bg-primary  transition duration-300">
                  Sell your Item
                </Button>
              </Link>
              <Link to="/products/all">
                <Button
                  variant="outline"
                  className="sm:mt-0 font-bold sm:ml-8 text-primary border-primary hover:bg-primary-500 hover:text-white rounded py-3 transition duration-300 focus:outline-none"
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0 flex-1 flex justify-end lg:self-end">
            <img
              src={hero_illustration}
              alt="Design Illustration"
              className=" w-full max-w-sm xl:max-w-lg"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
