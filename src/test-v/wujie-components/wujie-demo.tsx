// wujie 加载运行时的子应用

import { defineComponent } from 'vue';
import styles from './wujie-demo.module.scss';

const WujieDemo = defineComponent({
  setup() {
    return () => {
      return (
        <div class={styles.wujie}>
          <p> wujie demo - brfore build </p>
          <p> 运行时子应用 </p>

          <div class={styles.wujieConent}>
            <wujie-vue name={'wujie-demo2'} url={'http://localhost:6700/'} />
          </div>
        </div>
      );
    };
  }
});

export default WujieDemo;
