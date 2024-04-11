import type { Meta, StoryObj } from '@storybook/vue3';

import EContainer from '@components/e-container';

const meta: Meta<typeof EContainer> = {
  component: EContainer
};

export default meta;
type Story = StoryObj<typeof EContainer>;

export const Basic: Story = {
  render: (args) => ({
    components: { EContainer },
    setup() {
      return () => {
        return <EContainer title={args.title}></EContainer>
      }
    }
  }),
  args: {
    title: '标题'
  }
};
