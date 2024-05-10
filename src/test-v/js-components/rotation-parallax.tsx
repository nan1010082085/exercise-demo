import { defineComponent } from "vue";
import styles from "./styles/rotation-parallax.module.scss";

const RoationParallax = defineComponent({
  setup() {
    return () => {
      return <div class={styles.container}>
        <div class={styles.item}>
          <img src="/test-v/images/1.jpg" alt="" />
        </div>
        <div class={styles.item}>
          <img src="/test-v/images/2.jpg" alt="" />
        </div>
        <div class={styles.item}>
          <img src="/test-v/images/3.jpg" alt="" />
        </div>
        <div class={styles.item}>
          <img src="/test-v/images/4.jpg" alt="" />
        </div>
        <div class={styles.item}>
          <img src="/test-v/images/5.gif" alt="" />
        </div>
      </div>
    }
  }
})

export default RoationParallax;
