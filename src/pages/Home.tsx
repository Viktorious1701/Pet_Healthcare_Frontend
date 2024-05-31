import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ImageCard from "@/components/navigation/ImageCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import petcare from "@/assets/petcare.jpg";
import logo from "@/assets/Paw2.svg";
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen p-0 m-0">
      <Navbar />
      <main className="flex-grow mx-auto p-4 -ml-5 -mr-5">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-700 py-20 mt-8">
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
                    to="/calendar"
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
                  className="rounded-lg shadow-lg w-full h-auto md:h-96 "
                />
              </div>
            </div>
          </div>
        </section>
        {/* Welcome Section */}
        <section className="text-center mb-8 mt-16">
          <h1 className="text-4xl font-bold mb-2 text-pink">
            Welcome to Pet Health Management
          </h1>
          <p className="text-lg">
            Manage your pets' health and appointments easily.
          </p>
        </section>

        {/* Category Section */}
        <section className="mb-16 flex gap-4 justify-around items-center">
          <ImageCard imgSrc={petcare}>
            <h3 className="text-xl font-bold mb-2">Booking</h3>
            <div className="space-x-4 mt-4">
              <h4 className="">We offer the best veterinarians</h4>
            </div>
          </ImageCard>
          <ImageCard imgSrc={petcare}>
            <h3 className="text-xl font-bold mb-2">Pet Hospitalization</h3>

            <div className="space-x-4 mt-4">
              <h4 className="">We offer the best veterinarians</h4>
            </div>
          </ImageCard>
        </section>

        {/* About Section */}
        <section className="mb-16 p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex justify-center gap-4">
            <div className="m-2">
              <img
                className="rounded-md"
                src="https://nextui.org/images/hero-card-complete.jpeg"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-center">
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
        <section className="mb-16 p-4 bg-white rounded-lg shadow border-l-4 border-pink">
          <h2 className="text-3xl font-bold text-pink mb-4">
            Book an Appointment
          </h2>
          <p className="text-lg mb-4">
            Schedule an appointment with our experienced veterinarians today.
          </p>
          <Button color="primary">
            <Link to="/appointments/book" className="text-white">
              Book Now
            </Link>
          </Button>
        </section>

        {/* Existing Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink">
            <h2 className="text-2xl font-semibold mb-2">
              Upcoming Appointments
            </h2>
            {/* Replace with dynamic content */}
            <p>No upcoming appointments.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-pink">
            <h2 className="text-2xl font-semibold mb-2">
              Recent Medical Records
            </h2>
            {/* Replace with dynamic content */}
            <p>No recent records.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
