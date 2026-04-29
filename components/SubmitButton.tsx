'use client';

import { useFormStatus } from 'react-dom';
import { LuLoaderCircle } from 'react-icons/lu';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  label?: string;
  pendingLabel?: string;
  className?: string;
}

export default function SubmitButton({
  label = 'Submit',
  pendingLabel = 'Please wait',
  className
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-busy={pending} className={className}>
      {pending ? (
        <>
          <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
