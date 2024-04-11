import type { Preview } from '@storybook/vue3';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      canvas: { sourceState: 'none' },
      soucce: {
        language: 'typescript'
      }
    }
  }
};

export default preview;
