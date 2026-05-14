import Link from 'next/link';
import {
  LuBuilding2,
  LuBus,
  LuCalendarDays,
  LuMap,
  LuMapPin,
  LuUtensils
} from 'react-icons/lu';
import Heading from '@/components/ui/heading';

const categories = [
  {
    href: '/blog/best-attractions-in-milan',
    label: 'Things To Do',
    icon: <LuMapPin className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-red-200 text-red-700',
    cardBg: 'bg-red-50 hover:bg-red-100'
  },
  {
    href: '/blog/what-to-eat-in-milan',
    label: 'Food & Drink',
    icon: <LuUtensils className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-yellow-200 text-yellow-600',
    cardBg: 'bg-yellow-50 hover:bg-yellow-100'
  },
  {
    href: '/blog/hidden-gems-of-milan',
    label: 'Hidden Gems',
    icon: <LuBuilding2 className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-blue-200 text-blue-700',
    cardBg: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    href: '/blog/day-trips-from-milan',
    label: 'Day Trips',
    icon: <LuMap className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-green-200 text-green-700',
    cardBg: 'bg-green-50 hover:bg-green-100'
  },
  {
    href: '/blog/public-transport-in-milan',
    label: 'Getting Around',
    icon: <LuBus className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-purple-200 text-purple-700',
    cardBg: 'bg-purple-50 hover:bg-purple-100'
  },
  {
    href: '/blog/christmas-in-milan',
    label: 'Events',
    icon: <LuCalendarDays className="w-5 h-5" aria-hidden="true" />,
    iconBg: 'bg-orange-200 text-orange-700',
    cardBg: 'bg-orange-50 hover:bg-orange-100'
  }
];

export default function ExploreByCategory() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Heading as="h2" className="text-xl text-center lg:text-4xl py-2 mb-8">
        Explore Milan By Category
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(({ href, label, icon, iconBg, cardBg }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-3 border border-black/10 rounded-xl p-5 hover:shadow-md transition-all text-center group ${cardBg}`}
          >
            <span className={`p-2 rounded-lg ${iconBg}`}>{icon}</span>
            <span className="text-sm font-semibold text-jet-black group-hover:text-red-700 transition-colors leading-tight">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
