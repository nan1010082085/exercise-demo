import { defineComponent, getCurrentInstance, onServerPrefetch } from 'vue';
import styles from './micro.module.scss';

const MicroContainer = defineComponent({
  name: 'MicroContainer',
  setup() {
    const instance = getCurrentInstance();
    const pinia = instance?.appContext.config.globalProperties.$pinia;
    // console.log(pinia)
    // onServerPrefetch(() => {
    //   console.log(pinia)
    // })

    return () => <div class={styles['micro-container']}>
      MicroContainer
      <div class={styles['micro-content']}>
        <micro-app name={'micro-app-vue-demo'} url={'http://localhost:7000/'} data={pinia?.state} />
      </div>
    </div>;
  }
});

export default MicroContainer;
