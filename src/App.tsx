import { KeepAlive, defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  setup() {
    return () => {
      return (
        <KeepAlive>
          <RouterView />;
        </KeepAlive>
      );
    };
  }
});
