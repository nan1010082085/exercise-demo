import { computed, defineComponent, type PropType } from 'vue';
import styles from './index.module.scss';

const EPageHeader = defineComponent({
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
