// wujie 非组件加载子应用
import { defineComponent, onMounted, ref } from 'vue';
import { startApp } from 'wujie';
import styles from './wujie-demo.module.scss';

const WujieDemo3 = defineComponent({
  name: 'WujieDemo3',
  setup() {
    const wujieEl = ref();


    onMounted(() => {
      startApp({ el: wujieEl.value, name: 'wujie-demo3', url: 'http://localhost:4173/' });
      // startApp({ el: wujieEl.value, name: 'wujie-demo3', url: 'http://localhost:6700/' });
    });

    return () => {
      return (
        <div class={styles.wujie}>
          <p> 加载自定义子应用 </p>
          <p> 给定加载 dom  build后预览项目</p>
          <p> 当前地址 http://localhost:4173/</p>

          <div class={styles.wujieConent}>
            <div class={styles.wujieCustomElement} ref={wujieEl}></div>
          </div>
        </div>
      );
    };
  }
});

export default WujieDemo3;
