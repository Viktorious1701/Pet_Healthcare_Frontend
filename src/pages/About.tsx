import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import hero from "@/assets/about-us-dog.png";
import grooming from "@/assets/grooming.jpg";
import daycare from "@/assets/dog-daycare.png";
import boarding from "@/assets/dog-boarding.png";

const SECTION_DATA = [
  {
    title: "Our Services",
    items: [
      {
        image: grooming,
        alt: "Grooming",
        title: "Grooming",
        description:
          "Professional grooming services to keep your pet looking their best.",
      },
      {
        image: boarding,
        alt: "Boarding",
        title: "Boarding",
        description:
          "Safe and comfortable boarding facilities for when you're away.",
      },
      {
        image: daycare,
        alt: "Daycare",
        title: "Daycare",
        description:
          "Engaging daycare services to keep your pet happy and social.",
      },
    ],
  },
  {
    title: "",
    images: [
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
      "https://placehold.co/400x300",
    ],
  },
];

const Section = ({
  title,
  items,
}: {
  title: string;
  items: Array<{
    image: string;
    alt: string;
    title: string;
    description: string;
  }>;
}) => (
  <section className="bg-[var(--background)] py-2">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-shadow">
        {title}
      </h2>
      <div className="flex justify-around flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center m-4">
            <img
              src={item.image}
              alt={item.alt}
              className="mb-4 w-[18rem] md:w-[23rem] h-[12rem] md:h-[15rem] shadow-lg rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GallerySection = ({
  title,
  images,
}: {
  title: string;
  images: string[];
}) => (
  <section className="bg-[--background]">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Pet ${index + 1}`}
            className="rounded-lg shadow-lg"
          />
        ))}
      </div>
    </div>
  </section>
);

const About = () => (
  <div className="min-h-screen bg-[--background] text-[--hero-text]">
    <Navbar />
    <div className=" pt-[6rem]">
      {/* Hero Section */}
      <section id="hero" className="bg-[--background] py-[8rem]">
        <div className="px-4">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="mb-8 md:mb-0">
              <h1 className="text-6xl md:text-[8rem] font-bold text-[--hero-text] mb-4 text-center font-mont">
                About Us
              </h1>
              <p className="text-lg md:text-[1.4rem] text-[--hero-text] mb-8 mt-[3rem] text-center font-roboto">
                Welcome to our pet care service! We're dedicated to top-tier
                care for your furry friends, ensuring they're happy, healthy,
                and safe.
              </p>
              <img
                src={hero}
                alt="Hero"
                className="w-[110rem] h-auto mt-[5rem] rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    {SECTION_DATA.map((data, index) => (
      <Section key={index} title={data.title} items={data.items ?? []} />
    ))}
    <div className="mb-[4rem]">
      <GallerySection
        title="Pet Gallery"
        images={SECTION_DATA[1].images ?? []}
      />
    </div>
    <Footer />
  </div>
);

export default About;
