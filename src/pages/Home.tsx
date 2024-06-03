import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ImageCard from "@/components/navigation/ImageCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import petcare from "@/assets/petcare.jpg";
import logo from "@/assets/Paw2.svg";
import CustomCalendar from "@/components/calendar/CustomCalendar";
import { APPOINTMENT } from "@/Route/router-const";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen p-0 m-0 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow mx-auto p-4 -ml-5 -mr-5">
        {/* Hero Section */}
        <section
          id="hero"
          className="bg-gradient-to-r from-pink-500 to-pink-700 py-20 mt-8"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Welcome to Pet Health Management
                </h1>
                <p className="text-lg md:text-xl text-white mb-8">
                  Manage your pets' health and appointments easily with our
                  top-notch veterinary services.
                </p>
                <Button
                  color="primary"
                  className="bg-white text-pink-700 hover:bg-pink-200"
                >
                  <Link
                    to={`/${APPOINTMENT}`}
                    className="text-pink-700 hover:text-white"
                  >
                    Book an Appointment
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={logo}
                  alt="Hero"
                  className="rounded-lg shadow-lg w-full h-auto md:h-96"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section id="welcome" className="text-center mb-8 mt-16">
          <h1 className="text-4xl font-bold mb-2 text-pink">
            Welcome to Pet Health Management
          </h1>
          <p className="text-lg">
            Manage your pets' health and appointments easily.
          </p>
        </section>

        {/* Category Section */}
        <section
          id="category"
          className="mb-16 flex gap-10 justify-center items-center text-center"
        >
          <ImageCard imgSrc={petcare}>
            <h3 className="text-xl font-bold mb-2">Booking</h3>
            <div className="space-x-4 mt-4">
              <h4 className="">We offer the best veterinarians</h4>
            </div>
          </ImageCard>
          <ImageCard imgSrc={petcare}>
            <h3 className="text-xl font-bold mb-2">Pet Hospitalization</h3>
            <div className="space-x-4 mt-4">
              <h4 className="">We offer the best hospitalization</h4>
            </div>
          </ImageCard>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16 p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex justify-center gap-4">
            <div className="m-2">
              <img
                className="rounded-md"
                src="https://nextui.org/images/hero-card-complete.jpeg"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-9">
              <p className="text-lg font-bold mb-2">About Us</p>
              <h2 className="text-2xl mb-4">
                We take care of your pets' condition and provide top-tier
                treatment
              </h2>
              <p className="text-base mb-4">
                Simply dummy text of the printing and typesetting industry.
                Lorem has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley.
              </p>
              {/* Animated Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section
          id="booking"
          className="flex justify-center items-center gap-11 p-4 bg-custom-gray rounded-lg shadow border-l-4 border-pink text-center pb-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-pink mb-4">
              Book an Appointment
            </h2>
            <p className="text-lg mb-4">
              Schedule an appointment with our experienced veterinarians today.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none"
            >
              <Link to={`${APPOINTMENT}`} className="text-white">
                Book Now
              </Link>
            </motion.button>
          </div>
          <div>
            <CustomCalendar />
          </div>
        </section>

        {/* Veterinarian Section */}
        <section
          id="veterinarian"
          className="mb-16 p-4 bg-gray-100 rounded-lg shadow text-center"
        >
          <h2 className="text-3xl font-bold text-pink mb-4">
            Meet Our Veterinarians
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Vet 1"
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dr. Jane Doe</h3>
              <p className="text-base">Specialist in Small Animals</p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Vet 2"
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dr. Johnny Sins</h3>
              <p className="text-base">Expert in Exotic Pets</p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img
                src="https://via.placeholder.com/150"
                alt="Vet 3"
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Dr. Alice Brown</h3>
              <p className="text-base">Veterinary Surgeon</p>
            </div>
          </div>
        </section>

        {/* Customer Rating Section */}
        <section
          id="testimonial"
          className="relative bg-cover bg-center"
          style={{ backgroundImage: `url(${petcare})` }}
        >
          <div className="hero__overlay bg-black/60 absolute inset-0"></div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="testimonial__title text-center mb-8">
              <p className="xd_subtitle text-teal text-xl font-semibold mb-2">
                Testimonial
              </p>
              <h2 className="text-white text-3xl font-bold">
                What Our Customer Saying?
              </h2>
            </div>
            <div className="splide splide--loop splide--ltr splide--draggable is-active is-overflow is-initialized">
              <div className="splide__track">
                <ul className="splide__list">
                  <li className="splide__slide">
                    <div className="testimonial wrp bg-white p-8 rounded-lg shadow-md">
                      <img
                        src={logo}
                        alt=""
                        className="rounded-full w-16 h-16 mx-auto mb-4"
                      />
                      <div className="product__rating flex justify-center mb-4">
                        <span className="fa fa-star checked text-yellow-400"></span>
                        <span className="fa fa-star checked text-yellow-400"></span>
                        <span className="fa fa-star checked text-yellow-400"></span>
                        <span className="fa fa-star text-gray-400"></span>
                        <span className="fa fa-star text-gray-400"></span>
                      </div>
                      <p className="text-gray-700 text-center mb-4">
                        Simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum simply dummy text of the printing
                        and typesetting industry. Lorem Ipsum has been.
                      </p>
                      <h3 className="text-xl font-semibold text-center mb-2">
                        Sara Taylor
                      </h3>
                      <p className="text-gray-600 text-center">Consumer</p>
                    </div>
                  </li>
                  {/* Add more slides here if needed */}
                </ul>
              </div>
              <ul className="splide__pagination splide__pagination--ltr flex justify-center mt-4">
                <li role="presentation">
                  <Button
                    className="splide__pagination__page bg-gray-300 rounded-full w-3 h-3 mx-1"
                    type="button"
                    role="tab"
                  ></Button>
                </li>
                {/* Add more pagination buttons here if needed */}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
