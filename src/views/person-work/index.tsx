import { defineComponent, ref } from 'vue';
import { useThrottledRefHistory } from '@vueuse/core';

const PersonWork = defineComponent({
  name: 'PersonWork',
  setup() {
    const def = ref({ a: 1 });

    const { history, undo, redo } = useThrottledRefHistory(def, { deep: true, throttle: 1000 });



    return () => {
      return <div>
        <div>PersonWork</div>

        <div>
          {history.value}
        </div>
      </div>;
    };
  }
});

export default PersonWork;
