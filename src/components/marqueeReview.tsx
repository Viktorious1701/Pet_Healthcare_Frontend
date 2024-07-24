import { cn } from '@/lib/utils';
import Marquee from '@/components/magicui/marquee';
import { Star, StarHalf } from 'lucide-react';

const reviews = [
  {
    "name": "Alice",
    "username": "@alice",
    "body": "The pet health care service here is simply incredible. I can't believe my eyes!",
    "img": "https://avatar.vercel.sh/alice",
    "rating": 4.5
  },
  {
    "name": "Bob",
    "username": "@bob",
    "body": "I'm absolutely blown away by the fantastic pet care here!",
    "img": "https://avatar.vercel.sh/bob",
    "rating": 4.0
  },
  {
    "name": "Charlie",
    "username": "@charlie",
    "body": "The service is beyond words. Truly amazing for my pets.",
    "img": "https://avatar.vercel.sh/charlie",
    "rating": 3.5
  },
  {
    "name": "Diana",
    "username": "@diana",
    "body": "I have no words. This pet care service is fantastic.",
    "img": "https://avatar.vercel.sh/diana",
    "rating": 5.0
  },
  {
    "name": "Kevin",
    "username": "@kevin",
    "body": "I don't get the hype. The pet health care is quite underwhelming.",
    "img": "https://avatar.vercel.sh/kevin",
    "rating": 3.5
  },
  {
    "name": "Laura",
    "username": "@laura",
    "body": "The pet health care didn't meet my expectations at all. Very disappointed.",
    "img": "https://avatar.vercel.sh/laura",
    "rating": 3
  },
  {
    "name": "Mike",
    "username": "@mike",
    "body": "I found the pet care service to be quite boring and unoriginal.",
    "img": "https://avatar.vercel.sh/mike",
    "rating": 2.5
  },
  {
    "name": "Nina",
    "username": "@nina",
    "body": "Not impressed with the pet health care. I've seen better.",
    "img": "https://avatar.vercel.sh/nina",
    "rating": 4
  },
  {
    "name": "Hank",
    "username": "@hank",
    "body": "The pet health care is outstanding. Just wow!",
    "img": "https://avatar.vercel.sh/hank",
    "rating": 4.5
  },
  
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center mt-[0.2rem]">
      {[...Array(5)].map((_, index) => (
        <span key={index}>
          {index < fullStars ? (
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ) : index === fullStars && hasHalfStar ? (
            <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="w-4 h-4 text-gray-300" />
          )}
        </span>
      ))}
    </div>
  );
};

interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  body: string;
  rating?: number; // Make rating optional
}

const ReviewCard: React.FC<ReviewCardProps> = ({ img, name, username, body, rating }) => {
  return (
    <figure
      className={cn(
        'relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6',
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center gap-3'>
        <img className='rounded-full' width='48' height='48' alt='' src={img} />
        <div className='flex flex-col'>
          <figcaption className='text-lg font-medium dark:text-white'>
            {name}
          </figcaption>
          <p className='text-sm font-medium dark:text-white/40'>{username}</p>
          {rating !== undefined && <StarRating rating={rating} />} {/* Conditionally render StarRating */}
        </div>
      </div>
      <blockquote className='mt-4 text-base'>{body}</blockquote>
    </figure>
  );
};

export function MarqueeReview() {
  return (
    <div className='relative flex h-[600px] w-[115%] ml-[-6rem] flex-col items-center justify-center overflow-hidden rounded-lg border bg-[--background] md:shadow-xl'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className='[--duration:20s]'>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-[--background]'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-[--background]'></div>
    </div>
  );
}
