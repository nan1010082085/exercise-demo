import type { Meta, StoryObj, StoryContext } from '@storybook/vue3';
import EBreadcrumb from '@components/e-breadcrumb';

const meta: Meta<typeof EBreadcrumb> = {
  component: EBreadcrumb,
  parameters: {
    docs: {
      description: {
        component: '面包屑导航组件，用于显示当前页面在网站中的位置'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof EBreadcrumb>;

const parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        return code.replace(/undefined/, 'EBreadcrumb')
      }
    }
  },
}

export const Primary: Story = {
  render: () => ({
    components: { EBreadcrumb },
    setup() {
      return () => {
        return <EBreadcrumb />
      }
    }
  }),
  parameters
};
