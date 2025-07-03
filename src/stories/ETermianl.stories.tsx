import type { Meta, StoryObj, StoryContext } from '@storybook/vue3';
import ETermianl from '@components/e-termianl/inedx';

const meta: Meta<typeof ETermianl> = {
  component: ETermianl,
  parameters: {
    docs: {
      description: {
        component: '终端模拟器组件，基于xterm.js实现'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ETermianl>;

const parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        return code.replace(/undefined/, 'ETermianl')
      }
    }
  },
}

export const Primary: Story = {
  render: () => ({
    components: { ETermianl },
    setup() {
      return () => {
        return <div style={{height: '400px'}}><ETermianl /></div>
      }
    }
  }),
  parameters
};