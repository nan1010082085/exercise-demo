import type { Meta, StoryObj } from '@storybook/vue3';

import EPageHeader from '@components/e-page-header';

const meta: Meta<typeof EPageHeader> = {
  component: EPageHeader
};

export default meta;
type Story = StoryObj<typeof EPageHeader>;

export const Basic: Story = {
  render: (args) => ({
    components: { EPageHeader },
    setup() {
      return () => {
        return <EPageHeader title={args.title}></EPageHeader>
      }
    }
  }),
  args: {
    title: '标题'
  }
};
