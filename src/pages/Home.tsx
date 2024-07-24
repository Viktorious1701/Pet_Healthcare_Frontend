import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ImageCard from '@/components/navigation/ImageCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hero from '@/assets/hero.png';
import booking from '@/assets/veterinary-booking.jpg';
import hospitalization from '@/assets/hospitalization.jpg';
import petcare2 from '@/assets/petcare2.jpg';
import cat from '@/assets/cat2.jpeg';
import CustomCalendar from '@/components/calendar/CustomCalendar';
import { APPOINTMENT } from '@/Route/router-const';
import { CONTACT } from '@/Route/router-const';

import '@fontsource-variable/montserrat';
import '@fontsource/roboto';

import { ABOUT_PAGE } from '@/Route/router-const';
import CardMingAnhAvatar from '@/components/team_cards/MinhAnhCard/CardMingAnhAvatar';
import CardThinhAnAvatar from '@/components/team_cards/ThinhAnCard/CardThinhAnAvatar';

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';
import { MarqueeReview } from '@/components/marqueeReview';
import CardDinhDuongAvatar from '@/components/team_cards/DinhDuongCard/CardDinhDuongAvatar';
import CardSongPhucAvatar from '@/components/team_cards/SongPhucCard/CardSongPhucAvatar';
import CardDuyTanAvatar from '@/components/team_cards/DuyTanCard/CardDuyTanAvatar';
import CardAnhKietAvatar from '@/components/team_cards/AnhKietCard/CardDinhDuongAvatar';

import vet1 from '@/assets/vet1.png';
import vet2 from '@/assets/vet2.png';
import vet3 from '@/assets/vet3.png';
import vet4 from '@/assets/vet4.png';
import vet5 from '@/assets/vet5.png';

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen p-0 m-0 overflow-x-hidden'>
      <Navbar />
      <main className='flex-grow mx-auto p-4 -ml-5 -mr-5'>
        {/* Hero Section */}
        <section id='hero' className='bg-[--background] py-[8rem] mt-[6rem]'>
          <div className='px-4'>
            <div className='flex flex-col md:flex-row items-center justify-center'>
              <div className='mb-8 md:mb-0'>
                <h1 className='text-6xl md:text-[8rem] font-bold text-[--hero-text] mb-4 text-center font-mont'>
                  Pamper Your Pet
                </h1>
                <p className='text-lg md:text-[1.4rem] text-[--hero-text] mb-8 mt-[3rem] text-center font-roboto'>
                  Discover top-tier pet care services designed to keep your furry friends happy and healthy.
                </p>
                <div className='text-center space-x-8 mt-[4rem]'>
                  <Link to={`/${APPOINTMENT}`} className='text-pink-700 hover:text-white'>
                    <Button
                      color='primary'
                      className='bg-[--hero-button] text-pink-700 hover:bg-pink-200 px-6 py-8 text-xl'
                    >
                      Book an Appointment
                    </Button>
                  </Link>

                  <Link to={`/${CONTACT}`} className='text-pink-700 hover:text-white'>
                    {' '}
                    <Button
                      color='primary'
                      className='bg-[--hero-button] text-pink-700 hover:bg-pink-200 px-6 py-8 text-xl'
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
                <img src={hero} alt='Hero' className='w-[110rem] h-auto mt-[5rem]' />
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id='services'>
          {/* Welcome Section */}
          <section id='welcome' className='text-center mb-[6rem] mt-[6rem]'>
            <h1 className='text-[4rem] font-bold mb-2 text-pink font-mont'>Our Services</h1>
            <p className='text-[1.3rem] font-roboto font-[100] text-[--hero-text]'>
              From grooming to boarding, we offer a comprehensive range of services to cater to
              <br />
              your pet's every need.
            </p>
          </section>

          {/* Category Section */}
          <section id='category' className='mb-[8rem] flex gap-10 justify-center items-center text-center'>
            <ImageCard imgSrc={booking}>
              <h3 className='text-xl font-bold mb-2'>Booking</h3>
              <div className='space-x-4 mt-4'>
                <h4 className=''>We offer the best veterinarians</h4>
              </div>
            </ImageCard>
            <ImageCard imgSrc={hospitalization}>
              <h3 className='text-xl font-bold mb-2'>Pet Hospitalization</h3>
              <div className='space-x-4 mt-4'>
                <h4 className=''>We offer the best hospitalization</h4>
              </div>
            </ImageCard>
            <ImageCard imgSrc={petcare2}>
              <h3 className='text-xl font-bold mb-2'>Pet Care</h3>
              <div className='space-x-4 mt-4'>
                <h4 className=''>We offer the best pet care services</h4>
              </div>
            </ImageCard>
          </section>
        </section>

        {/* About Section */}
        <section id='about' className='py-[7rem] bg-[--background] rounded-lg shadow'>
          <div className='flex justify-center gap-[10rem]'>
            <div className='m-2'>
              <img
                className='rounded-md h-96 w-full object-cover' // Adjust the height and width as needed
                src={cat}
                alt=''
              />
            </div>
            <div className='flex flex-col justify-center items-center gap-[1rem]'>
              <h3 className='text-[4rem] font-bold font-mont'>About Us</h3>
              <div className='space-x-4'>
                <h4 className='text-lg font-roboto font-[100] text-[--hero-text] text-[1.5rem] text-center'>
                  We take care of your pets' condition and provide top-tier treatment
                </h4>
                <p className='text-base mt-4 font-roboto font-[100] text-[--hero-text] text-center'>
                  At our pet care center, we believe in providing comprehensive health services for your pets.
                  <br />
                  Our experienced veterinarians have been serving the community since the early 2000s,
                  <br />
                  offering a range of services from routine check-ups to surgical procedures.
                  <br />
                  We are committed to ensuring your pet's health and well-being.
                </p>
              </div>
              {/* Animated Button */}
              <Link to={`${ABOUT_PAGE}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='mt-[2rem] bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none'
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id='booking' className='py-[7rem] flex justify-center items-center gap-11 p-4 text-center'>
          <div>
            <h2 className='text-[2.5rem] font-bold mb-6 font-mont'>Book an Appointment</h2>
            <p className='text-[1.25rem] mb-6 font-roboto font-[100] text-[--hero-text]'>
              Schedule an appointment with our experienced veterinarians today.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none'
            >
              <Link to={`${APPOINTMENT}`} className='text-white'>
                Book Now
              </Link>
            </motion.button>
          </div>
          <div>
            <CustomCalendar />
          </div>
        </section>

        {/* Veterinarian Section */}
        <section id='veterinarian' className='py-[2rem] bg-[var(--background)] text-center'>
          <h2 className='text-[3rem] font-bold text-pink mb-[4rem] font-mont'>Meet Our Veterinarians</h2>
          <div className='flex flex-wrap justify-center gap-8'>
            {[
              {
                name: 'Dr. Jane Doe',
                image: vet1,
                specialty: 'Specialist in Small Animals'
              },
              {
                name: 'Dr. Johnny Sins',
                image: vet2,
                specialty: 'Expert in Exotic Pets'
              },
              {
                name: 'Dr. Alice Brown',
                image: vet3,
                specialty: 'Pharmacist'
              },
              {
                name: 'Dr. Saul Goodman',
                image: vet4,
                specialty: 'Lawyer'
              },
              {
                name: 'Dr. Gus Fring',
                image: vet5,
                specialty: 'Lead Surgeon'
              }
            ].map((vet, index) => (
              <div key={index} className='w-full md:w-1/3 lg:w-1/4 p-4 bg-[var(--background)] rounded-lg shadow'>
                <img src={vet.image} alt={`Vet ${index + 1}`} className='rounded-full w-24 h-24 mx-auto mb-4' />
                <h3 className='text-xl font-semibold mb-2'>{vet.name}</h3>
                <p className='text-[var(--hero-text)]'>{vet.specialty}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section id='veterinarian' className='py-[7rem] bg-[--background] text-center'>
          <h2 className='text-[3rem] font-bold text-pink mb-[4rem] font-mont'>Meet Our Teams</h2>
          <div className='flex justify-center'>
            <div className='flex -space-x-4'>
              <div>
                <CardMingAnhAvatar />
              </div>
              <div>
                <CardThinhAnAvatar />
              </div>
              <div>
                <CardDinhDuongAvatar />
              </div>
              <div>
                <CardSongPhucAvatar />
              </div>
              <div>
                <CardDuyTanAvatar />
              </div>
              <div>
                <CardAnhKietAvatar />
              </div>
            </div>
          </div>
        </section>

        {/* Customer Rating Section */}
        <section id='testimonial' className='relative'>
          <ShaderGradientCanvas
            importedFiber={{ ...fiber, ...drei, ...reactSpring }}
            style={{
              position: 'absolute',
              top: 0,
              pointerEvents: 'none',
              userSelect: 'none',
              touchAction: 'none',
              width: '100%',
              height: '100%',
              borderRadius: '0.5rem', // Adds rounded corners
              overflow: 'hidden' // Ensures content doesn't overflow the rounded corners
            }}
          >
            <Gradient />
          </ShaderGradientCanvas>
          <div className='container px-4 py-24 relative'>
            <div className='text-center mb-12'>
              <p className='text-[#F9FAFB] text-[4rem] font-semibold mb-2 font-mont'>Pet Owners' Stories</p>
              <h2 className='text-[#F9FAFB] text-[1.5rem] font-bold'>
                Hear from our community of pet owners and their experiences with our services.
              </h2>
            </div>
            <MarqueeReview />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

function Gradient() {
  return (
    <ShaderGradient
      control='query'
      urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=on&bgColor1=%23000000&bgColor2=%23000000&brightness=1.8&cAzimuthAngle=180&cDistance=2.3&cPolarAngle=115&cameraZoom=1&color1=%23dd00ff&color2=%23FE8989&color3=%23ffa3ba&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=50&frameRate=10&grain=off&lightType=3d&pixelDensity=1.3&positionX=-0.5&positionY=0.1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=235&shader=defaults&toggleAxis=false&type=waterPlane&uAmplitude=0&uDensity=1.4&uFrequency=5.5&uSpeed=0.1&uStrength=2&uTime=0&wireframe=false'
    />
  );
}

export default Home;
