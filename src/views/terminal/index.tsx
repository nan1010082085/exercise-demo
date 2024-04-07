import { defineComponent } from 'vue';
import styles from './index.module.scss';
import ETermianl from '@/components/e-termianl/inedx';
import TermToobar from './toolbar';

const TerminalView = defineComponent({
  name: 'TerminalView',
  setup() {
    return () => {
      return (
        <div class={styles.terminalView}>
          {/* <TermToobar /> */}
          <div class={styles['term-content']}>
            <ETermianl />
          </div>
        </div>
      );
    };
  }
});

export default TerminalView;

export interface TerminalViewInstance extends InstanceType<typeof TerminalView> {}
