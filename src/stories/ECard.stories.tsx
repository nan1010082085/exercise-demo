import type { Meta, StoryObj, StoryContext } from '@storybook/vue3';
import ECard, { type ECardInstance } from '@components/e-card';

const meta: Meta<ECardInstance> = {
  component: ECard,
  argTypes: {
    imageClick: {
      control: 'function',
      description: '内容点击事件',
      table: {
        defaultValue: { summary: '(data) => void' },
        type: {
          summary: 'Function'
        }
      }
    },
    look: {
      control: 'click',
      description: '查看按钮',
      table: {
        defaultValue: { summary: '(data) => void' },
        type: {
          summary: 'Function'
        }
      }
    },
    edit: {
      control: 'function',
      description: '编辑按钮',
      table: {
        defaultValue: { summary: '(data) => void' },
        type: {
          summary: 'Function'
        }
      }
    },
    del: {
      control: 'function',
      description: '删除按钮',
      table: {
        defaultValue: { summary: '(data) => void' },
        type: {
          summary: 'Function'
        }
      }
    },
    data: {
      control: 'object',
      description: '数据集合',
      table: {
        defaultValue: { summary: 'object' },
        type: {
          summary: 'Obejct'
        }
      }
    },
    title: {
      control: 'text',
      description: '标题',
      table: {
        defaultValue: { summary: '' },
        type: {
          summary: 'String'
        }
      }
    },
    footer: {
      control: 'boolean',
      description: '底部内容',
      table: {
        defaultValue: { summary: 'true' },
        type: {
          summary: 'Boolean'
        }
      }
    },
    lookBtn: {
      control: 'boolean',
      description: '是否显示查看按钮',
      table: {
        defaultValue: { summary: 'true' },
        type: {
          summary: 'Boolean'
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ECard>;

const parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        return code.replace(/undefined/, 'ECard')
      }
    }
  },
}

/**
 * @description Typescript tsx
 * @param {*} data
 * @param {*} title
 * @param {*} footer
 * @param {*} lookBtn
 */
export const Parimry: Story = {
  render: (args) => ({
    components: { ECard },
    setup() {
      return () => {
        return <ECard title={args.title} footer={args.footer} lookBtn={args.lookBtn}>
          <div>内容</div>
        </ECard>
      }
    }
  }),
  args: {
    data: {
      name: '名称'
    },
    title: '标题',
    footer: true,
    lookBtn: true
  },
  parameters
};

export const Footer: Story = {
  render: (args) => ({
    components: { ECard },
    setup() {
      return () => {
        return <ECard title={args.title} footer={args.footer}>
          <div>内容</div>
        </ECard>
      }
    }
  }),
  args: {
    title: '标题',
    footer: false,
  },
  parameters
};

export const LookBtn: Story = {
  render: (args) => ({
    components: { ECard },
    setup() {
      return () => {
        return <ECard title={args.title} lookBtn={args.lookBtn}>
          <div>内容</div>
        </ECard>
      }
    }
  }),
  args: {
    title: '标题',
    lookBtn: false,
  },
  parameters
};
