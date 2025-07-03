import type { Meta, StoryObj, StoryContext } from '@storybook/vue3';
import EPdfFile from '@components/e-pdf-file';

const meta: Meta<typeof EPdfFile> = {
  component: EPdfFile,
  argTypes: {
    source: {
      control: 'text',
      description: 'PDF文件的URL地址',
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'String' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'PDF文件预览组件，支持在线预览PDF文档'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof EPdfFile>;

const parameters = {
  docs: {
    source: {
      transform: (code: string, storyContext: StoryContext) => {
        return code.replace(/undefined/, 'EPdfFile')
      }
    }
  },
}

export const Primary: Story = {
  render: (args) => ({
    components: { EPdfFile },
    setup() {
      return () => {
        return <EPdfFile source={args.source} />
      }
    }
  }),
  args: {
    source: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
  },
  parameters
};

export const EmptySource: Story = {
  render: (args) => ({
    components: { EPdfFile },
    setup() {
      return () => {
        return <EPdfFile source={args.source} />
      }
    }
  }),
  args: {
    source: ''
  },
  parameters
};