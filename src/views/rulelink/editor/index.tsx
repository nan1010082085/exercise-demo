import { defineComponent } from 'vue';
import styles from './index.module.scss';

const EditorRule = defineComponent({
  name: 'EditorRule',
  setup() {
    return () => {
      return <div class={styles['editor-rule']}></div>;
    };
  }
});

export default EditorRule;
