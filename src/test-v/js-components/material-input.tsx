import { defineComponent } from "vue";
import styles from './styles/material-input.module.scss';

const MaterialInput = defineComponent({
  setup() {
    return () => {
      return <div class={styles['input-box']}>
        <input required id="username" type="text" size="32"></input>
        <span></span>
        <label for="username">User Name</label>
      </div>
    }
  }
})

export default MaterialInput
