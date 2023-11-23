import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Drawer } from 'tdesign-vue-next';

const EDrawer = defineComponent({
  props: {},
  emits: [],
  setup(_, { emit, slots, expose }) {
    return () => {
      return <Drawer class={styles['e-drawer']}></Drawer>;
    };
  }
});

type EDrawerInstance = InstanceType<typeof EDrawer> & {
  open: () => void;
  close: () => void;
};

export type { EDrawerInstance };

export default EDrawer;
