import { Catamaran } from 'next/font/google';
import { forwardRef, HTMLAttributes } from 'react';
const catamaran = Catamaran({ subsets: ['latin'] });

type HeadingTypes = HTMLAttributes<HTMLElement>;

export type HeadingProps = {
  as?: React.ElementType;
} & HeadingTypes;

const Heading: React.ForwardRefRenderFunction<HTMLElement, HeadingProps> = (
  { as = 'strong', children, className, ...props },
  ref
) => {
  const Wrapper = as;

  return (
    <Wrapper
      className={`font-black ${catamaran.className} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

export default forwardRef(Heading);
