const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL ?? '';

export interface NavChild {
  href: string;
  text: string;
}

export interface NavLink {
  href?: string;
  text: string;
  children?: NavChild[];
}

export const travelTipsGroups: { heading: string; links: NavChild[] }[] = [
  {
    heading: 'Getting Around',
    links: [
      {
        href: `${BASE_URL}/blog/public-transport-in-milan`,
        text: 'Public Transport'
      },
      { href: `${BASE_URL}/blog/driving-in-milan`, text: 'Driving in Milan' },
      {
        href: `${BASE_URL}/blog/beaches-near-milan`,
        text: 'Beaches Near Milan'
      }
    ]
  },
  {
    heading: 'Things To Do',
    links: [
      {
        href: `${BASE_URL}/blog/best-attractions-in-milan`,
        text: 'Best Attractions'
      },
      { href: `${BASE_URL}/blog/hidden-gems-of-milan`, text: 'Hidden Gems' },
      { href: `${BASE_URL}/blog/best-parks-in-milan`, text: 'Best Parks' }
    ]
  },
  {
    heading: 'Food & Drink',
    links: [
      {
        href: `${BASE_URL}/blog/best-places-for-aperitivo-in-milan`,
        text: 'Best Aperitivo Spots'
      },
      {
        href: `${BASE_URL}/blog/what-to-eat-in-milan`,
        text: 'What to Eat in Milan'
      },
      {
        href: `${BASE_URL}/blog/best-vegetarian-restaurants-in-milan`,
        text: 'Vegetarian Restaurants'
      }
    ]
  },
  {
    heading: 'Day Trips',
    links: [
      {
        href: `${BASE_URL}/blog/day-trips-from-milan`,
        text: 'Day Trips from Milan'
      },
      { href: `${BASE_URL}/blog/day-trip-in-lake-como`, text: 'Lake Como' },
      { href: `${BASE_URL}/blog/2-days-in-cinque-terre`, text: 'Cinque Terre' }
    ]
  },
  {
    heading: 'Practical Info',
    links: [
      { href: `${BASE_URL}/blog/2-days-in-milan`, text: '2 Days in Milan' },
      {
        href: `${BASE_URL}/blog/where-to-stay-in-milan-with-family`,
        text: 'Where to Stay'
      },
      {
        href: `${BASE_URL}/blog/10-must-have-apps-for-a-seamless-experience-in-milan`,
        text: 'Best Apps for Milan'
      }
    ]
  }
];

export const links: NavLink[] = [
  {
    text: 'Travel Tips',
    children: travelTipsGroups.flatMap((g) => g.links)
  },
  { href: `${BASE_URL}/blog`, text: 'Articles' },
  { href: `${BASE_URL}/about`, text: 'About' },
  { href: `${BASE_URL}/contact`, text: 'Contact' }
];
