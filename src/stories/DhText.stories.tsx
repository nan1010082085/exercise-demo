import type { Meta, StoryContext, StoryObj } from '@storybook/vue3';

import DhText from '@/components/dh-text';

const meta: Meta<typeof DhText> = {
  component: DhText,
};

export default meta;
type Story = StoryObj<typeof DhText>;

export const Basic: Story = {
  render: () => ({
    components: { DhText },
    setup() {
      return () => {
        return <DhText>测试文字</DhText>
      }
    }
  }),
  parameters: {
    docs: {
      source: {
        transform: (code: string, storyContext: StoryContext) => {
          return `<DhText>测试文字</DhText>`
        }
      }
    }
  }
};
