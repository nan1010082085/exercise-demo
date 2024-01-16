import { defineComponent } from "vue";
import styles from './index.module.scss';


const RuleDrawer = defineComponent({
  name: 'RuleDrawer',
  setup() {
    return () => {
      return <div class={styles['rule-drawer']}></div>
    }
  }
})

export default RuleDrawer
