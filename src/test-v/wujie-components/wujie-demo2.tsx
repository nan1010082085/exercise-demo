// wujie 加载打包后的子应用

import { defineComponent } from 'vue';
import styles from './wujie-demo.module.scss';

const WujieDemo2 = defineComponent({
  name: 'WujieDemo2',
  setup() {
    return () => (
      <div class={styles.wujie}>
        <p> wujie demo - after build </p>
        <p> build后的子应用 </p>

        <div class={styles.wujieConent}>
          <wujie-vue name="wujie-demo2" url={'http://localhost:4173/'} />
        </div>
      </div>
    );
  }
});

export default WujieDemo2;
