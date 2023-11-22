import styels from './index.module.scss';
import { defineComponent } from 'vue';

const EUser = defineComponent({
  setup() {
    return () => {
      return <div>user</div>;
    };
  }
});

export default EUser;
