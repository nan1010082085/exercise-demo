import EPageHeader from '@/components/e-page-header';
import { defineComponent} from 'vue';
import styles from './index.module.scss';


const EContainer = defineComponent({
  name: 'EContainer',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(_, { slots }) {
    return () => {
      return (
        <div class={styles.widget}>
          <EPageHeader title={_.title}>{slots.header?.()}</EPageHeader>
          <div class={styles.container}>
            <div class={[styles.cards, 'scrollbar']}>{slots.default?.()}</div>
            <div class={styles.footer}>{slots.footer?.()}</div>
          </div>
          {slots.plugin?.()}
        </div>
      );
    };
  }
});

export default EContainer;
