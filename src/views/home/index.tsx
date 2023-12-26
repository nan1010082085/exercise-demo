import { defineComponent, ref } from 'vue';
import styles from './index.module.scss';
import dayjs from 'dayjs'

const HomeComponent = defineComponent({
  name: 'HomeComponent',
  setup() {

    return () => {
      return (
        <div class={styles.wrapper}>
          grid-template-columns
          <div class={styles.testGrid}>
            <div class={styles.testGridItem}>1</div>
            <div class={styles.testGridItem}>1</div>
            <div class={styles.testGridItem}>1</div>
            <div class={styles.testGridItem}>1</div>
            <div class={styles.testGridItem}>1</div>
            <div class={styles.testGridItem}>1</div>
          </div>
        </div>
      );
    };
  }
});

export default HomeComponent;
