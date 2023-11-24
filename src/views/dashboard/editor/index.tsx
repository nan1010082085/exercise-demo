import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import styles from './index.module.scss';
import useDialog from '@/composables/useDialog';

const Editor = defineComponent({
  setup() {
    const { confirm } = useDialog();
    onBeforeRouteLeave((to, form, next) => {
      confirm('确定要离开吗？', '离开后不会保存已编辑的操作！').then(({ trigger }) => {
        if (trigger === 'confirm') {
          next();
        }
        next(false);
      });
    });

    return () => {
      return <div class={styles.editor}></div>;
    };
  }
});

export default Editor;
