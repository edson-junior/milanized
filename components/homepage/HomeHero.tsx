import Heading from '../ui/heading';

export default function HomeHero() {
  return (
    <section data-testid="home-hero">
      <div className="text-black h-full flex-col max-w-7xl mx-auto px-4 py-16 lg:py-32 relative">
        <Heading
          as="h1"
          className="inline-block text-3xl lg:text-5xl mb-6 lg:mb-4 lg:leading-[1.2]"
        >
          Maximize your Milan experience!
        </Heading>
        <p className="text-lg max-w-4xl lg:text-2xl lg:leading-10">
          Milanized is an online guide to all things Milan and more. Here you
          can find the resources you need for the perfect trip, look up
          information on life in Milan in general, and much more.
        </p>
      </div>
    </section>
  );
}
