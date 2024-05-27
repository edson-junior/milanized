import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const Sidebar = () => {
  return (
    <>aqui vai o saidebar</>
    // <aside className="flex-1 md:flex-none md:w-1/3 lg:w-1/4">
    //   <Heading as="h2" size="xl" paddingBottom="2">
    //     Related post
    //   </Heading>
    //   <Card maxW="sm" marginBottom="8">
    //     <CardBody>
    //       {/* <Image
    //         src={featuredImage?.url}
    //         width={featuredImage?.width}
    //         height={featuredImage?.height}
    //         alt={featuredImage?.alternativeText || ''}
    //       /> */}
    //       <Stack mt="6" spacing="3">
    //         <Heading size="md">Living room Sofa</Heading>
    //         <Text>
    //           This sofa is perfect for modern tropical spaces, baroque inspired
    //           spaces, earthy toned spaces and for people who love a chic design
    //           with a sprinkle of vintage design.
    //         </Text>
    //       </Stack>
    //     </CardBody>

    //     <CardFooter>
    //       <Heading as="span" size="sm">
    //         April 16, 2024
    //       </Heading>
    //     </CardFooter>
    //   </Card>

    //   <div>
    //     <Heading as="h2" size="xl" py="2">
    //       Latest posts
    //     </Heading>

    //     <div className="pb-4">
    //       <Heading as="h4" size="md" paddingBottom="2">
    //         5 super benefits to studying at Nyenrode Business University
    //       </Heading>
    //       KATRIEN NIVERA 🇵🇭
    //     </div>

    //     <div className="pb-4">
    //       <Heading as="h4" size="md" paddingBottom="2">
    //         17 ideas that make the Dutch sustainability super-heroes JUNI
    //       </Heading>
    //       MOLTUBAK
    //     </div>

    //     <div className="pb-4">
    //       <Heading as="h4" size="md" paddingBottom="2">
    //         Watch out! Important timetable changes announced for 3 Dutch
    //         stations
    //       </Heading>
    //       LIANA PEREIRA 🇱🇰
    //     </div>

    //     <div className="pb-4">
    //       <Heading as="h4" size="md" paddingBottom="2">
    //         I had to pay €4 to use a toilet on King’s Day — and I’m pissed
    //       </Heading>
    //       {`SARAH O'LEARY 🇮🇪 - MAY 2, 2024`}
    //     </div>

    //     <div>
    //       <Heading as="h4" size="md" paddingBottom="2">
    //         The best phone plans for students in the Netherlands
    //       </Heading>
    //       LYNA MEYRER 🇱🇺 - MAY 1, 2024
    //     </div>
    //   </div>
    // </aside>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Sidebar',
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() }
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
