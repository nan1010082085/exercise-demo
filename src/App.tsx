import { defineComponent, ref } from 'vue';
import { defaultEnum } from '@/constants';

export default defineComponent({
  setup() {
    const msg = ref('11');
    console.log(defaultEnum);

    return () => {
      return (
        <>
          <div>{msg.value}</div>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
              <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
            </a>
          </div>
        </>
      );
    };
  }
});
