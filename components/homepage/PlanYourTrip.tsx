import Link from 'next/link';
import Heading from '@/components/ui/heading';

const cards = [
  {
    href: '/blog/2-days-in-milan',
    label: 'First time in Milan?',
    description: 'Start here',
    emoji: '👋'
  },
  {
    href: '/blog/what-to-eat-in-milan',
    label: 'What to Eat',
    description: 'Local food guide',
    emoji: '🍝'
  },
  {
    href: '/blog/public-transport-in-milan',
    label: 'Getting Around',
    description: 'Metro, trams & more',
    emoji: '🚇'
  },
  {
    href: '/blog/day-trips-from-milan',
    label: 'Day Trips',
    description: 'Escape the city',
    emoji: '🏞️'
  }
];

export default function PlanYourTrip() {
  return (
    <section className="bg-gray-50 border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Heading as="h2" className="text-xl text-center lg:text-4xl py-2 mb-8">
          Plan Your Trip
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ href, label, description, emoji }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center gap-2 bg-white border border-black/10 rounded-xl p-6 hover:shadow-md hover:border-red-300 transition-all group"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {emoji}
              </span>
              <span className="font-bold text-sm lg:text-base text-jet-black group-hover:text-red-700 transition-colors leading-tight">
                {label}
              </span>
              <span className="text-xs text-gray-500">{description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
