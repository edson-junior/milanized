import { LuCheckCheck, LuTriangleAlert } from 'react-icons/lu';
import { sendContactEmail } from '@/app/actions/contact';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from './SubmitButton';
import TurnstileWidget from './TurnstileWidget';

interface ContactFormProps {
  success?: boolean;
  errorType?: string;
}

export default function ContactForm({ success, errorType }: ContactFormProps) {
  return (
    <>
      {success && (
        <div role="alert" aria-atomic="true" className="flex gap-2 py-4 px-4 mb-4 font-semibold rounded border-green-500 border-2 bg-green-300 text-green-800">
          <LuCheckCheck size={24} />
          {`Your message has been sent! We'll be in touch ASAP!`}
        </div>
      )}
      {errorType === 'captcha' && (
        <div role="alert" aria-atomic="true" className="flex gap-2 py-4 px-4 mb-4 font-semibold rounded border-red-500 border-2 bg-red-100 text-red-800">
          <LuTriangleAlert size={24} />
          Security check failed. Please try again.
        </div>
      )}
      {errorType === 'send' && (
        <div role="alert" aria-atomic="true" className="flex gap-2 py-4 px-4 mb-4 font-semibold rounded border-red-500 border-2 bg-red-100 text-red-800">
          <LuTriangleAlert size={24} />
          Something went wrong sending your message. Please try again later.
        </div>
      )}
      {errorType === 'validation' && (
        <div role="alert" aria-atomic="true" className="flex gap-2 py-4 px-4 mb-4 font-semibold rounded border-red-500 border-2 bg-red-100 text-red-800">
          <LuTriangleAlert size={24} />
          Please fill in all required fields correctly.
        </div>
      )}

      {!success && <form action={sendContactEmail}>
        <div className="grid gap-4 mb-5">
          <Label htmlFor="name">
            Name <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            className="w-full text-base font-medium"
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            autoComplete="name"
            required
            minLength={2}
          />
        </div>

        <div className="grid gap-4 mb-5">
          <Label htmlFor="email">
            Email <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            className="w-full text-base font-medium"
            type="email"
            name="email"
            id="email"
            placeholder="example@domain.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="grid gap-4 mb-5">
          <Label htmlFor="message">
            Your message <span className="text-red-500 font-bold">*</span>
          </Label>
          <Textarea
            rows={4}
            name="message"
            id="message"
            placeholder="Type your message here."
            className="w-full text-base font-medium"
            required
            maxLength={2000}
          />
        </div>

        <TurnstileWidget />
        <SubmitButton />
      </form>}
    </>
  );
}
