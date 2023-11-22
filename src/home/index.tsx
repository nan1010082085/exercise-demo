import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Button } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

const HomeComponent = defineComponent({
  setup() {
    const router = useRouter();

    return () => {
      return (
        <div class={styles.wrapper}>
          home
        </div>
      );
    };
  }
});

export default HomeComponent;
