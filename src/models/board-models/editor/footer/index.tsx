import { defineComponent, inject } from "vue";
import styles from './index.module.scss';
import { DrawerTypeKey } from "../inject.key";
import { mdiRulerSquare } from '@mdi/js';
import { Button, Space } from "tdesign-vue-next";

const TooolFooter = defineComponent({
  emits: [],
  setup() {
    const drawer = inject(DrawerTypeKey)

    const visible = () => {
      if (!drawer) return;
      drawer.value['ruler'] = !drawer?.value['ruler'];
    }

    return () => {
      return <Space align="center" class={styles.toolFooter}>
        <Button theme={drawer?.value['ruler'] ? 'primary' : 'default'} size={'small'} onClick={visible}>
          <svg-icon type='mdi' size={16} path={mdiRulerSquare} />
        </Button>
      </Space>
    }
  }
})

export default TooolFooter;
