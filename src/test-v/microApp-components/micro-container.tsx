import { defineComponent } from 'vue';
import styles from './micro.module.scss';

const MicroContainer = defineComponent({
  name: 'MicroContainer',
  setup() {
    return () => <div class={styles['micro-container']}>
      MicroContainer
      <div class={styles['micro-content']}>
        <micro-app name={'micro-app-vue-demo'} url={'http://localhost:4173/'} />
      </div>
    </div>;
  }
});

export default MicroContainer;
