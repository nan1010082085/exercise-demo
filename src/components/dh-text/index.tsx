import { defineComponent } from 'vue';

const DhText = defineComponent({
  props: {},
  setup(_, { slots }) {
    return () => {
      return <div>{slots.default && slots.default()}</div>;
    };
  }
});

export default DhText;
