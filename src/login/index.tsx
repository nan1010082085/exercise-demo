import { defineComponent } from 'vue';
import styles from './index.module.scss';

const Login = defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.wrapper}>
          <div class={styles.formWrapper}>111</div>
        </div>
      );
    };
  }
});

export default Login;
