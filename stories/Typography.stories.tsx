import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => (
  <div
    style={{
      width: '600px'
    }}
  >
    <h1>Headings</h1>
    <br />
    <h1 className="h1">The quick brown fox jumps over the lazy dog</h1>
    <h2 className="h2">The quick brown fox jumps over the lazy dog</h2>
    <h3 className="h3">The quick brown fox jumps over the lazy dog</h3>
    <h4 className="h4">The quick brown fox jumps over the lazy dog</h4>
    <h5 className="h5">The quick brown fox jumps over the lazy dog</h5>
    <h6 className="h6">The quick brown fox jumps over the lazy dog</h6>
    <br />
    <br />
    <h1>Texts</h1>
    <p className="text-small">
      Integer sagittis nunc et ex finibus, id maximus magna venenatis. Phasellus
      at sodales tellus. Suspendisse enim ante, sodales sit amet placerat id,
      rhoncus in lacus. Etiam gravida nec massa non semper. Fusce nisi libero,
      vulputate quis placerat sit amet, tristique porta nisi. Proin varius
      sapien in odio venenatis, a dictum ex porttitor. Fusce ultrices elit ut
      tellus feugiat, faucibus viverra nunc bibendum. Nunc scelerisque nibh eget
      dui commodo, sed faucibus nisi tincidunt. Nunc nec quam eget tellus mollis
      pharetra. Morbi auctor iaculis justo a ultricies.
    </p>
    <br />
    <p className="text-small">
      Curabitur aliquet tempus mi, eget fermentum felis. Nulla sagittis purus
      vestibulum massa aliquet eleifend. Vestibulum a nisl odio. Sed porta, urna
      quis cursus imperdiet, risus risus varius elit, molestie ullamcorper lacus
      eros non est. Integer sit amet ullamcorper urna. Integer nec vulputate
      purus. Donec dignissim metus vel turpis scelerisque tristique. In lacinia
      ligula a malesuada ultrices. Integer id neque nisl.
    </p>
  </div>
);

const meta = {
  title: 'Example/Typography/Texts',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
