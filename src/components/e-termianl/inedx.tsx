import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

const ETermianl = defineComponent({
  name: 'eTerminal',
  setup() {
    const terminalRef = ref<HTMLDivElement>();
    const term = new Terminal({
      rows: 20,
      cols: 80,
      cursorBlink: true,
      cursorStyle: 'block',
      theme: {
        background: '#000000',
        foreground: '#ffffff',
        cursor: '#ffffff'
      }
    });
    const openln = ref('connect \x1B[1;3;31mxterm.js\x1B[0m $');
    // const socket = new WebSocket('');
    const fitAddon = new FitAddon();
    // const attachAddon = new AttachAddon(socket);
    const keyCodeResult = ref<string | null>(null);

    const onClear = () => {
      term.clear();
      term.writeln(openln.value);
    };

    const onData = (data: string) => {
      if (keyCodeResult.value) {
        term.write(keyCodeResult.value);
        term.writeln(openln.value);
        return;
      }
      data.trim() && term.write(data);
    };

    const onKey = (data: { key: string; domEvent: KeyboardEvent }) => {
      const { key, domEvent } = data;
      console.log('on key >', key, domEvent);
      switch (domEvent.code) {
        case 'Enter':
          keyCodeResult.value = `\r\n`;
          break;
        default:
          keyCodeResult.value = null;
      }
    };

    const initContent = () => {
      term.loadAddon(fitAddon);
      terminalRef.value && term.open(terminalRef.value);
      term.writeln(openln.value);
      term.onData(onData);
      term.onKey(onKey);
    };

    onMounted(() => {
      // term.loadAddon(attachAddon);
      initContent();
    });

    return () => {
      return (
        <div style={styles.eterminal}>
          <div ref={terminalRef}></div>
        </div>
      );
    };
  }
});

export default ETermianl;

export interface ETermianlInstance extends InstanceType<typeof ETermianl> {}
