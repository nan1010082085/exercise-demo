import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { AttachAddon } from '@xterm/addon-attach';
import { FitAddon } from '@xterm/addon-fit';
import { debounce } from 'lodash-es';

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
    const openln = ref('connect \x1B[1;3;31mTermianl\x1B[0m $');
    // const socket = new WebSocket('');
    const fitAddon = new FitAddon();
    // const attachAddon = new AttachAddon(socket);
    const text = ref<string[]>([]);
    const code = ref<string | null>(null);

    const onClear = () => {
      term.clear();
      term.writeln(openln.value);
    };

    const onEnter = () => {
      // 换行 2 rows
      term.writeln('\x1B[B');
      // term.writeln('\x1B[C');
      term.writeln(openln.value);
    };

    const onBackspace = () => {
      const last = text.value.length - 1;
      text.value = text.value.splice(last, -1);
      term.write('\x1B[D');
      term.write('\x1B[K');
    };

    const onData = (data: string) => {
      // 回车
      if (code.value === 'Enter') return;
      // 退格
      if (code.value === 'Backspace') return;
      // 上下
      if (code.value === 'ArrowDown') return;
      if (code.value === 'ArrowUp') return;
      // console.log('data', text.value);
      term.write(data);
      text.value.push(data);
    };

    const onKey = (data: { key: string; domEvent: KeyboardEvent }) => {
      const { key, domEvent } = data;
      // console.log('on key >', key, domEvent);
      code.value = domEvent.code;
      switch (domEvent.code) {
        case 'Enter':
          onEnter();
          break;
        case 'Backspace':
          onBackspace();
          break;
      }
    };

    // 换行符结束后
    const onLineFeed = () => {
      console.log('term write ln', text.value.join(''));
      text.value = [];
    };

    // const onWriteParsed = () => {
    //   console.log('term write parsed');
    // };

    const initTerm = () => {
      term.loadAddon(fitAddon);
      terminalRef.value && term.open(terminalRef.value);
      term.writeln(openln.value);
      term.onData(onData);
      term.onKey(onKey);
      term.onLineFeed(debounce(onLineFeed, 100));
      // term.onWriteParsed(debounce(onWriteParsed, 100));
    };

    onMounted(() => {
      // term.loadAddon(attachAddon);
      initTerm();
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
