import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => (
  <>
    <h1 className="h1">The quick brown fox jumps over the lazy dog</h1>
    <h2 className="h2">The quick brown fox jumps over the lazy dog</h2>
    <h3 className="h3">The quick brown fox jumps over the lazy dog</h3>
    <h4 className="h4">The quick brown fox jumps over the lazy dog</h4>
    <h5 className="h5">The quick brown fox jumps over the lazy dog</h5>
    <h6 className="h6">The quick brown fox jumps over the lazy dog</h6>
  </>
);

const meta = {
  title: 'Example/Typography/Headings',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
