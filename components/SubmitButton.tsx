'use client';

import { useFormStatus } from 'react-dom';
import { LuLoaderCircle } from 'react-icons/lu';
import { Button } from '@/components/ui/button';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <LuLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}
