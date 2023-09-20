import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Button } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';

const HomeComponent = defineComponent({
  setup() {
    const router = useRouter();

    const routerPush = (pathName: string) => {
      router.push({ name: pathName });
    };

    return () => {
      return (
        <div class={styles.wrapper}>
          home
          <div>
            <Button onClick={() => routerPush('PersonWork')}>PersonWork</Button>
          </div>
        </div>
      );
    };
  }
});

export default HomeComponent;
