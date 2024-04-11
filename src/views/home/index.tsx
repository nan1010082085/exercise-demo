import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';

const HomeComponent = defineComponent({
  name: 'HomeComponent',
  setup() {

    return () => {
      return (
        <div class={styles.wrapper}>

        </div>
      );
    };
  }
});

export default HomeComponent;
