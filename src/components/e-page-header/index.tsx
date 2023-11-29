/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-29 16:42:33
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-29 16:42:33
 * @Description 内容头部
 */


import { computed, defineComponent, type PropType } from 'vue';
import styles from './index.module.scss';

const EPageHeader = defineComponent({
  name: 'EPageHeader',
  props: {
    title: {
      type: String as PropType<string>
    }
  },
  setup(_, { slots }) {
    const title = computed(() => _.title);

    return () => {
      return (
        <div class={styles['pager-wrapper']}>
          <div class={styles.title}>{title.value}</div>
          <div class={styles.content}>{slots.default?.()}</div>
        </div>
      );
    };
  }
});

export default EPageHeader;
