import type { Meta, StoryObj } from '@storybook/vue3';

import DhText from '@/components/dh-text';

const meta: Meta<typeof DhText> = {
  component: DhText
};

export default meta;
type Story = StoryObj<typeof DhText>;

export const Default: Story = {
  render: () => ({
    components: { DhText },
    template: '<DhText>sss</DhText>'
  })
};
