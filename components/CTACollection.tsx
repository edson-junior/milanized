import { cn } from '@/lib/utils';
import CTA from './CTA';
import { Button } from './ui/button';

interface CTAsProps {
  _type: string;
  _key: string;
  ctas: Cta[];
  markDefs: null;
}

interface Cta {
  _type: string;
  link: Link;
  style: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  _key: string;
}

interface Link {
  type: string;
  internal: Internal | null;
  _type: string;
  label: string;
  external?: string;
  blank?: boolean;
}

interface Internal {
  metadata: Metadata;
}

interface Metadata {
  slug: string;
}

export default function CTACollection({ ctas }: CTAsProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {ctas.map((cta) => (
        <Button
          asChild
          variant={cta.style}
          className={cn(
            cta.style === 'default' && 'bg-emerald-500 hover:bg-emerald-700',
            'rounded-lg font-semibold py-6 w-full lg:w-72'
          )}
          key={cta._key}
        >
          <CTA link={cta.link}>{cta.link.label}</CTA>
        </Button>
      ))}
    </div>
  );
}
