import type { Meta, StoryObj, StoryContext } from '@storybook/vue3';
import EWidgetRender from '@components/e-widget-render';
import type { WidgetModels } from '@/@types/widget';

const meta: Meta<typeof EWidgetRender> = {
  component: EWidgetRender,
  argTypes: {
    widget: {
      control: 'object',
      description: '组件数据模型',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'WidgetModels' }
      }
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'Boolean' }
      }
    },
    parent: {
      control: 'boolean',
      description: '是否为父级容器',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'Boolean' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: '组件渲染器，用于渲染可拖拽的组件实例'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof EWidgetRender>;

const parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        return code.replace(/undefined/, 'EWidgetRender')
      }
    }
  },
}

const mockWidget: WidgetModels = {
  id: 'widget-1',
  general: {
    position: {
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      z: 1
    }
  }
} as WidgetModels;

export const Primary: Story = {
  render: (args) => ({
    components: { EWidgetRender },
    setup() {
      return () => {
        return (
          <div style={{position: 'relative', height: '400px', border: '1px solid #ccc'}}>
            <EWidgetRender {...args}>
              <div style={{width: '100%', height: '100%', background: '#e6f7ff', border: '1px solid #1890ff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                组件内容
              </div>
            </EWidgetRender>
          </div>
        )
      }
    }
  }),
  args: {
    widget: mockWidget,
    disabled: false,
    parent: false
  },
  parameters
};

export const Disabled: Story = {
  render: (args) => ({
    components: { EWidgetRender },
    setup() {
      return () => {
        return (
          <div style={{position: 'relative', height: '400px', border: '1px solid #ccc'}}>
            <EWidgetRender {...args}>
              <div style={{width: '100%', height: '100%', background: '#f5f5f5', border: '1px solid #d9d9d9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                禁用状态
              </div>
            </EWidgetRender>
          </div>
        )
      }
    }
  }),
  args: {
    widget: mockWidget,
    disabled: true,
    parent: false
  },
  parameters
};