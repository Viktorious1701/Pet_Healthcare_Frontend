import Footer from '@/components/navigation/Footer';
import Navbar from '@/components/navigation/Navbar';
import React from 'react';

const Contact = () => (
  <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    <Navbar />
    <section className="bg-white dark:bg-zinc-800 py-4 mt-[12rem] mb-[4rem] flex flex-col justify-center items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="mb-8">Get in touch with us for any inquiries or to schedule an appointment.</p>
            <form className="mb-8 flex flex-col items-center">
              <input type="text" placeholder="Your Name" className="w-full md:w-96 px-4 py-2 rounded border border-zinc-300 focus:outline-none focus:ring focus:border-pink-500 mb-4" required />
              <input type="email" placeholder="Your Email" className="w-full md:w-96 px-4 py-2 rounded border border-zinc-300 focus:outline-none focus:ring focus:border-pink-500 mb-4" required />
              <textarea placeholder="Your Message" className="w-full md:w-96 px-4 py-2 rounded border border-zinc-300 focus:outline-none focus:ring focus:border-pink-500 h-32 resize-none mb-4" required />
              <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300">Submit</button>
            </form>
          </div>
        </section>
        <Footer />
  </div>

);

export default Contact;
