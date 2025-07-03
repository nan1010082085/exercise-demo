import type { Preview } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { setup } from '@storybook/vue3';

// 创建 Pinia 实例
const pinia = createPinia();
setup((app) => {
  app.use(pinia);
});

// 在 Storybook 应用中使用 Pinia

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
      source: {
        language: 'typescript'
      }
    }
  }
};

export default preview;
