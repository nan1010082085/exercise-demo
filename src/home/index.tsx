import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Button, DialogPlugin } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import useDialog from '@/composables/useDialog';

const HomeComponent = defineComponent({
  setup() {
    const router = useRouter();
    const dialogStore = useDialog();

    const onConfirm = () => {
      dialogStore.confirm('11', '222');
    };

    return () => {
      return (
        <div class={styles.wrapper}>
          home
          <Button onClick={onConfirm}>on Confirm</Button>
        </div>
      );
    };
  }
});

export default HomeComponent;
