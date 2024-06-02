import Footer from '@/components/navigation/Footer'
import Navbar from '@/components/navigation/Navbar'

const SECTION_DATA = [
  {
    title: 'Our Services',
    items: [
      {
        image: 'https://placehold.co/100x100',
        alt: 'Grooming',
        title: 'Grooming',
        description: 'Professional grooming services to keep your pet looking their best.',
      },
      {
        image: 'https://placehold.co/100x100',
        alt: 'Boarding',
        title: 'Boarding',
        description: "Safe and comfortable boarding facilities for when you're away.",
      },
      {
        image: 'https://placehold.co/100x100',
        alt: 'Daycare',
        title: 'Daycare',
        description: 'Engaging daycare services to keep your pet happy and social.',
      },
    ],
  },
  {
    title: '',
    images: [
      'https://placehold.co/400x300',
      'https://placehold.co/400x300',
      'https://placehold.co/400x300',
      'https://placehold.co/400x300',
      'https://placehold.co/400x300',
      'https://placehold.co/400x300',
    ],
  },
]

const Section = ({ title, items }: { title: string, items: Array<{ image: string, alt: string, title: string, description: string }> }) => (
  <section className="bg-white dark:bg-zinc-800 py-4">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      <div className="flex justify-around flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center m-4">
            <img src={item.image} alt={item.alt} className="mb-4" />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const GallerySection = ({ title, images }: { title: string, images: string[] }) => (
  <section className="bg-zinc-100 dark:bg-zinc-900">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Pet ${index + 1}`} className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  </section>
)

const About = () => (
  <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
    <Navbar />
    <div className="pt-[8rem]">
      <Section
        title="Pamper Your Pet"
        items={[{
          image: 'https://placehold.co/800x400', alt: 'Hero Image',
          title: '',
          description: ''
        }]}
      />
    </div>
    {SECTION_DATA.map((data, index) => (
      <Section key={index} title={data.title} items={data.items ?? []} />
    ))}
    <GallerySection title="Pet Gallery" images={SECTION_DATA[1].images ?? []} />
    <Footer />
  </div>
)

export default About;
