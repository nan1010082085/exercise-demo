import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { Button, Space } from 'tdesign-vue-next';

const TermToobar = defineComponent({
  name: 'TermToobar',
  setup() {
    return () => {
      return (
        <div class={styles.termToobar}>
          <Space size={'small'}>
            <Button>1</Button>
            <Button>2</Button>
          </Space>
        </div>
      );
    };
  }
});

export default TermToobar;

export interface TermToobarInstance extends InstanceType<typeof TermToobar> {}
