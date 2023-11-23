import { Dialog } from 'tdesign-vue-next';
import { defineComponent } from 'vue';

const EDialog = defineComponent({
  props: {},
  emits: [],
  setup(_, { emit, expose, slots }) {
    const open = () => {};

    expose({ open });

    return () => {
      return <Dialog></Dialog>;
    };
  }
});

export type EDialogInstance = InstanceType<typeof EDialog> & { open: () => void };

export default EDialog;
