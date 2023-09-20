import { defineComponent } from 'vue';
import styles from './index.module.scss';

const Login = defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.wrapper}>
          <div> logo </div>
          <div class={styles.formWrapper}> form content </div>
          <div> footer </div>
        </div>
      );
    };
  }
});

export default Login;
