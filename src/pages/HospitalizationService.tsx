import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/navigation/Footer'
import ImageCard from '@/components/navigation/ImageCard'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import petcare from '@/assets/petcare.jpg'
import hero from '@/assets/hero.png'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const HospitalizationService = () => {
  return (
    <div className='flex flex-col min-h-screen p-0 m-0 overflow-x-hidden'>
      <Navbar />
      <main className='flex-grow mx-auto p-4 -ml-5 -mr-5'>
        {/* Hero Section */}
        <section id='hero' className='bg-[--background] py-[8rem] mt-[6rem]'>
          <div className='px-4'>
            <div className='flex flex-col md:flex-row items-center justify-center'>
              <div className='mb-8 md:mb-0'>
                <h1 className='text-6xl md:text-[8rem] font-bold text-[#1F2937] mb-4 text-center font-mont'>
                  Comprehensive Pet Hospitalization
                </h1>
                <p className='text-lg md:text-[1.4rem] text-[#4B5563] mb-8 mt-[3rem] text-center font-roboto'>
                  Providing round-the-clock care for your beloved pets to ensure their health and recovery.
                </p>
                <div className='text-center space-x-8 mt-[4rem]'>
                  <Button color='primary' className='bg-white text-pink-700 hover:bg-pink-200 px-6 py-8 text-xl'>
                    <Link to={`/appointment`} className='text-pink-700 hover:text-white'>
                      Book an Appointment
                    </Link>
                  </Button>
                  <Button color='primary' className='bg-white text-pink-700 hover:bg-pink-200 px-6 py-8 text-xl'>
                    <Link to={`/contact`} className='text-pink-700 hover:text-white'>
                      Contact Us
                    </Link>
                  </Button>
                </div>
                <img src={hero} alt='Hero' className='w-[110rem] h-auto mt-[5rem]' />
              </div>
            </div>
          </div>
        </section>

        {/* Hospitalization Services Section */}
        <section id='hospitalization-services' className='text-center mb-[6rem] mt-[6rem]'>
          <h1 className='text-[4rem] font-bold mb-2 text-pink font-mont'>Hospitalization Services</h1>
          <p className='text-[1.3rem] font-roboto font-[100] text-[#4B5563]'>
            Our state-of-the-art facility offers the best in pet hospitalization, ensuring your pet's comfort and care.
          </p>

          {/* Services Details */}
          <section id='services-details' className='mt-[4rem] flex justify-center items-center gap-8'>
            <div className='flex flex-col gap-[4rem]'>
              <ImageCard imgSrc={petcare}>
                <h3 className='text-xl font-bold mb-2'>24/7 Monitoring</h3>
                <div className='space-x-4 mt-4'>
                  <h4>
                    Our team is dedicated to providing around-the-clock care to monitor your pet's health status
                    continuously.
                  </h4>
                </div>
              </ImageCard>
              <ImageCard imgSrc={petcare}>
                <h3 className='text-xl font-bold mb-2'>Advanced Medical Equipment</h3>
                <div className='space-x-4 mt-4'>
                  <h4>
                    We utilize the latest medical technology to ensure accurate diagnostics and effective treatment
                    plans.
                  </h4>
                </div>
              </ImageCard>
            </div>
            <div className='flex flex-col gap-[4rem]'>
              <ImageCard imgSrc={petcare}>
                <h3 className='text-xl font-bold mb-2'>Experienced Veterinarians</h3>
                <div className='space-x-4 mt-4'>
                  <h4>Our skilled veterinarians are experts in providing critical care and specialized treatments.</h4>
                </div>
              </ImageCard>
              <ImageCard imgSrc={petcare}>
                <h3 className='text-xl font-bold mb-2'>Comfortable Accommodations</h3>
                <div className='space-x-4 mt-4'>
                  <h4>
                    Our facilities are designed to offer a comfortable and stress-free environment for your pet's
                    recovery.
                  </h4>
                </div>
              </ImageCard>
            </div>
          </section>
        </section>

        {/* Testimonials Section */}
        <section
          id='testimonials'
          className='relative bg-cover bg-center bg-[#F9FAFB] py-[7rem]'
          style={{ backgroundImage: `url(${petcare})` }}
        >
          <div className='bg-black/60 absolute inset-0'></div>
          <div className='container px-4 py-24 relative'>
            <div className='text-center mb-12'>
              <p className='text-[#F9FAFB] text-[4rem] font-semibold mb-2 font-mont'>Pet Owners' Stories</p>
              <h2 className='text-[#F9FAFB] text-[1.5rem] font-bold'>
                Hear from our community of pet owners and their experiences with our hospitalization services.
              </h2>
            </div>
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000
                })
              ]}
              opts={{
                align: 'start',
                loop: true
              }}
              className='w-full'
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className='basis-1/3 p-1'>
                    <div className='p-1'>
                      <div className='testimonial wrp bg-white p-8 rounded-lg shadow-md select-none'>
                        <img src={hero} alt='' className='rounded-full w-16 h-16 mx-auto mb-4' />
                        <div className='product__rating flex justify-center mb-4'>
                          <span className='fa fa-star checked text-yellow-400'></span>
                          <span className='fa fa-star checked text-yellow-400'></span>
                          <span className='fa fa-star checked text-yellow-400'></span>
                          <span className='fa fa-star text-gray-400'></span>
                          <span className='fa fa-star text-gray-400'></span>
                        </div>
                        <p className='text-gray-700 text-center mb-4 select-none'>
                          Simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of
                          the printing and typesetting industry. Lorem Ipsum has been.
                        </p>
                        <h3 className='text-xl font-semibold text-center mb-2 select-none'>Sara Taylor</h3>
                        <p className='text-gray-600 text-center select-none'>Consumer</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Booking Section */}
        <section id='booking' className='py-[7rem] flex justify-center items-center gap-11 p-4 text-center'>
          <div>
            <h2 className='text-[2.5rem] font-bold mb-6 font-mont'>Book an Appointment</h2>
            <p className='text-[1.25rem] mb-6 font-roboto font-[100] text-[#4B5563]'>
              Schedule an appointment with our experienced veterinarians today.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none'
            >
              <Link to={`/appointment`} className='text-white'>
                Book Now
              </Link>
            </motion.button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HospitalizationService
