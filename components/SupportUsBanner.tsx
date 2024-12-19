import { Button } from './ui/button';
import Heading from './ui/heading';

export default function SupportUsBanner() {
  return (
    <section className="max-w-screen-lg rounded border-0 border-l-4 border-spacing-2 border-green-700 bg-green-50 p-6 mb-6">
      <div className="max-w-screen-sm">
        <Heading
          as="strong"
          className="block text-lg lg:text-2xl py-0 lg:py-2 mb-2 scroll-m-20"
        >
          If you enjoyed our content, please consider supporting us!
        </Heading>

        <p>
          With your support, we are able to continue creating high-quality,
          informative content, plus new features and future updates such that
          this website continues to grow.
        </p>
        <div className="flex flex-wrap items-center mt-8">
          <Button
            asChild
            className="bg-green-700 action max-sm:w-full hover:bg-green-700/80"
          >
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://buymeacoffee.com/milanized"
            >
              Support us! ❤️
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
