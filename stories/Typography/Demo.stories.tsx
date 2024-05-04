import { Heading, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => (
  <>
    <Heading as="h1" size="4xl" py="3">
      Font pairing made simple
    </Heading>

    <Heading as="h2" size="2xl" py="2">
      Generate font combinations with deep learning
    </Heading>

    <Heading as="h3" size="lg" py="2">
      Generate font combinations with deep learning
    </Heading>

    <div
      style={{
        width: '600px'
      }}
    >
      <Text py="2">
        Integer sagittis nunc et ex finibus, id maximus magna venenatis.
        Phasellus at sodales tellus. Suspendisse enim ante, sodales sit amet
        placerat id, rhoncus in lacus. Etiam gravida nec massa non semper. Fusce
        nisi libero, vulputate quis placerat sit amet, tristique porta nisi.
        Proin varius sapien in odio venenatis, a dictum ex porttitor. Fusce
        ultrices elit ut tellus feugiat, faucibus viverra nunc bibendum. Nunc
        scelerisque nibh eget dui commodo, sed faucibus nisi tincidunt. Nunc nec
        quam eget tellus mollis pharetra. Morbi auctor iaculis justo a
        ultricies.
      </Text>
      <br />
      <Text py="2">
        Curabitur aliquet tempus mi, eget fermentum felis. Nulla sagittis purus
        vestibulum massa aliquet eleifend. Vestibulum a nisl odio. Sed porta,
        urna quis cursus imperdiet, risus risus varius elit, molestie
        ullamcorper lacus eros non est. Integer sit amet ullamcorper urna.
        Integer nec vulputate purus. Donec dignissim metus vel turpis
        scelerisque tristique. In lacinia ligula a malesuada ultrices. Integer
        id neque nisl.
      </Text>
    </div>
  </>
);

const meta = {
  title: 'Example/Typography/Demo',
  component: Typography,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};
