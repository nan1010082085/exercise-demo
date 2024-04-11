import { defineComponent, inject } from "vue";
import styles from './index.module.scss';
import { ElButton } from "element-plus";
import { DrawerTypeKey } from "../inject.key";
import { ScaleToOriginal } from "@element-plus/icons-vue";

const TooolFooter = defineComponent({
  emits: [],
  setup() {
    const drawer = inject(DrawerTypeKey)

    const visible = () => {
      if (!drawer) return;
      drawer.value['ruler'] = !drawer?.value['ruler'];
    }

    return () => {
      return <div class={styles.toolFooter}>
        <ElButton type={drawer?.value['ruler'] ? 'primary' : 'default'} size={'small'} onClick={visible} icon={<ScaleToOriginal />}></ElButton>
      </div>
    }
  }
})

export default TooolFooter;
