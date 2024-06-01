import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import ImageCard from "@/components/navigation/ImageCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import petcare from "@/assets/petcare.jpg";
import logo from "@/assets/Paw2.svg";
import CustomCalendar from "@/components/calendar/CustomCalendar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen p-0 m-0 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow mx-auto p-4 -ml-5 -mr-5">
        {/* Hero Section */}
        <section id="hero" className="bg-gradient-to-r from-pink-500 to-pink-700 py-20 mt-8 ">
          <div className="container mx-auto px-4 ">
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
                    to="/appointments"
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
        <section id="welcome" className="text-center mb-8 mt-16">
          <h1 className="text-4xl font-bold mb-2 text-pink">
            Welcome to Pet Health Management
          </h1>
          <p className="text-lg">
            Manage your pets' health and appointments easily.
          </p>
        </section>

        {/* Category Section */}
        <section id="category" className="mb-16 flex gap-10 justify-center items-center text-center">
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
        <br />
        <br />
        <br />
        <br />
        {/* Booking Section */}
        <section id="booking" className="flex justify-center items-center gap-11 p-4 bg-custom-gray rounded-lg shadow border-l-4 border-pink text-center  pb-10 ">
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
              <Link to="/appointments" className="text-white">
                Book Now
              </Link>
            </motion.button>
          </div>
          <div>
            <CustomCalendar />
          </div>

        </section>
        <br />
        <br />
        <br /> 
        <br />
        {/* Veterinarian Section */}
        <section id="veterinarian" className="mb-16 p-4 bg-gray-100 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-pink mb-4">Meet Our Veterinarians</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Vet 1" className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dr. Jane Doe</h3>
              <p className="text-base">Specialist in Small Animals</p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Vet 2" className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dr. Johnny Sins</h3>
              <p className="text-base">Expert in Exotic Pets</p>
            </div>
            <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Vet 3" className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dr. Alice Brown</h3>
              <p className="text-base">Veterinary Surgeon</p>
            </div>
          </div>
        </section>

        {/* Customer Rating Section */}
        <section id="rating" className="mb-16 p-4 bg-gray-100 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-pink mb-4">Customer Ratings</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">4.8</span>
              <div className="flex ml-2">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.199 2.625 9.578 2.625 9.728 2.927L12.053 7.606L17.25 8.209C17.581 8.247 17.707 8.658 17.474 8.893L13.978 12.278L14.868 17.431C14.933 17.769 14.549 17.988 14.267 17.79L9.999 14.854L5.732 17.79C5.45 17.988 5.066 17.769 5.131 17.431L6.022 12.278L2.526 8.893C2.293 8.658 2.419 8.247 2.75 8.209L7.947 7.606L10.272 2.927H9.049Z"></path></svg>
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.199 2.625 9.578 2.625 9.728 2.927L12.053 7.606L17.25 8.209C17.581 8.247 17.707 8.658 17.474 8.893L13.978 12.278L14.868 17.431C14.933 17.769 14.549 17.988 14.267 17.79L9.999 14.854L5.732 17.79C5.45 17.988 5.066 17.769 5.131 17.431L6.022 12.278L2.526 8.893C2.293 8.658 2.419 8.247 2.75 8.209L7.947 7.606L10.272 2.927H9.049Z"></path></svg>
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.199 2.625 9.578 2.625 9.728 2.927L12.053 7.606L17.25 8.209C17.581 8.247 17.707 8.658 17.474 8.893L13.978 12.278L14.868 17.431C14.933 17.769 14.549 17.988 14.267 17.79L9.999 14.854L5.732 17.79C5.45 17.988 5.066 17.769 5.131 17.431L6.022 12.278L2.526 8.893C2.293 8.658 2.419 8.247 2.75 8.209L7.947 7.606L10.272 2.927H9.049Z"></path></svg>
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.199 2.625 9.578 2.625 9.728 2.927L12.053 7.606L17.25 8.209C17.581 8.247 17.707 8.658 17.474 8.893L13.978 12.278L14.868 17.431C14.933 17.769 14.549 17.988 14.267 17.79L9.999 14.854L5.732 17.79C5.45 17.988 5.066 17.769 5.131 17.431L6.022 12.278L2.526 8.893C2.293 8.658 2.419 8.247 2.75 8.209L7.947 7.606L10.272 2.927H9.049Z"></path></svg>
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927C9.199 2.625 9.578 2.625 9.728 2.927L12.053 7.606L17.25 8.209C17.581 8.247 17.707 8.658 17.474 8.893L13.978 12.278L14.868 17.431C14.933 17.769 14.549 17.988 14.267 17.79L9.999 14.854L5.732 17.79C5.45 17.988 5.066 17.769 5.131 17.431L6.022 12.278L2.526 8.893C2.293 8.658 2.419 8.247 2.75 8.209L7.947 7.606L10.272 2.927H9.049Z"></path></svg>
              </div>
            </div>
            <p className="text-lg mb-4">Based on 500+ reviews</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-custom-pink text-white py-2 px-4 rounded-md shadow-md hover:bg-opacity-80 focus:outline-none"
            >
              Read Reviews
            </motion.button>
          </div>
        </section>

        {/* Existing Sections */}
        <section id="existing" className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
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
