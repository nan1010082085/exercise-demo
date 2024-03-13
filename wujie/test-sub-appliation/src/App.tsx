import { defineComponent, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import styles from './app.module.scss';

const wujie = window.$wujie;

export default defineComponent({
  name: 'App',
  setup() {

    console.log(wujie)

    return () => {
      return (
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" class={styles.logo} alt="Vite logo" />
            </a>
            <a href="https://vuejs.org/" target="_blank">
              <img src="./assets/vue.svg" class={[styles.logo, styles.vue]} alt="Vue logo" />
            </a>
          </div>
          <HelloWorld msg="Vite + Vue" />
        </>
      );
    };
  }
});
