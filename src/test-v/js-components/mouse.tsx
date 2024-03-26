import { defineComponent, onMounted, ref, computed } from 'vue';
import styles from './mouse.module.scss';

type MouseType = 'page' | 'client' | 'screen';

const MounseCom = defineComponent({
  setup() {
    const registerListener = (
      target: HTMLDivElement,
      type: string,
      handler: EventListenerOrEventListenerObject,
      options?: any
    ) => {
      target.addEventListener(type, handler, options);
      return () => target.removeEventListener(type, handler, options);
    };

    const target = ref<HTMLDivElement>();

    const initValue = { x: 0, y: 0 };

    const x = ref(initValue.x);
    const y = ref(initValue.y);

    const outside = ref(true);
    const type = 'page';
    const UseMouseExtractor: Record<MouseType, (e: MouseEvent | Touch) => [x: number, y: number] | null> = {
      page: (event) => [event.pageX, event.pageY],
      client: (event) => [event.clientX, event.clientY],
      screen: (event) => [event.screenX, event.screenY]
    };
    const extractor = UseMouseExtractor[type];

    const pageInElement = (target: HTMLDivElement | undefined) => {
      let option = {
        left: 0,
        top: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
      if (target) {
        option = target.getBoundingClientRect();
      }
      return option;
    };

    const computedStyle = computed(() => {
      const { left, top } = pageInElement(target?.value);
      return {
        transform: `translate3d(${x.value - left}px, ${y.value - top}px, 0)`
      };
    });


    onMounted(() => {
      if (target.value) {
        registerListener(
          target.value,
          'mousemove',
          (e: any) => {
            outside.value = false;
            const result = extractor(e);
            if (result) {
              [x.value, y.value] = result;
            }
          },
          {
            passive: true
          }
        );

        registerListener(
          target.value,
          'mouseleave',
          (e: any) => {
            outside.value = true;
          },
          {
            passive: true
          }
        );
      }
    });

    return () => (
      <div class={styles.box} ref={target}>
        mouse
        <p>outside: {outside.value ? 'true' : 'false'}</p>
        <p>pgae-x: {x.value}</p>
        <p>page-y: {y.value}</p>
        <p>element-x: {x.value - pageInElement(target.value).left}</p>
        <p>element-y: {y.value - pageInElement(target.value).top}</p>
        <div class={styles.boxInner} style={computedStyle.value}></div>
      </div>
    );
  }
});

export default MounseCom;
