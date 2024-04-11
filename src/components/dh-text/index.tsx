import { defineComponent } from 'vue';

const DhText = defineComponent({
  name: 'DhText',
  props: {},
  setup(_, { slots }) {
    return () => {
      return <div>{slots.default?.()}</div>;
    };
  }
});

export default DhText;
