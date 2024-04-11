import { computed, defineComponent, nextTick, onMounted, onUnmounted, reactive, ref, watch, type PropType } from 'vue';
import styles from './index.module.scss';
import useElementSize from '@/composables/useElement';
import { useElementBounding } from '@vueuse/core';

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

const userSelectNone: Record<string, 'none'> = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none',
}

const EWidgetRender = defineComponent({
  name: 'EFoundationSupport',
  props: {
    id: {
      type: String as PropType<string>,
      default: ''
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    page: {
      type: String as PropType<string | HTMLDivElement>,
      default: null
    },
    parent: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    active: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    zIndex: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 1
    },
    x: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    y: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    w: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
    h: {
      type: Number,
      validator(value: number) {
        return !isNaN(value);
      },
      default: 0
    },
  },
  emits: ['state', 'click', 'update:active', 'activated', 'deactivated', 'resizing'],
  setup(_, { emit, slots }) {
    let eventf = events.mouse
    const vel = ref<HTMLDivElement | null>(null);
    const { getPositionSize, getComputedSize } = useElementSize();

    const stylesheet = computed(() => {
      const { x, y, w, h } = _;
      return {
        width: `${w}px`,
        height: `${h}px`,
        transform: `translate(${x}px, ${y}px)`,
        zIndex: _.zIndex,
        ...(userSelectNone)
      };
    });

    const state = reactive({
      disabled: _.disabled,
      enabled: _.active,
      activated: false,
      deactivated: false,
      resizing: false,
      zIndex: _.zIndex,
    })

    const size = reactive({
      width: 0,
      height: 0,
    })

    let mouseDownPosition: {
      mouseX: number,
      mouseY: number,
      left: number,
      top: number,
      right: number | null,
      bottom: number | null
    } = {
      mouseX: 0,
      mouseY: 0,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }

    let bounds: {
      minLeft: number,
      maxLeft: number,
      minRight: number | null,
      maxRight: number | null,
      minTop: number,
      maxTop: number,
      minBottom: number | null,
      maxBottom: number | null
    } = {
      minLeft: 0,
      maxLeft: 0,
      minRight: null,
      maxRight: null,
      minTop: 0,
      maxTop: 0,
      minBottom: null,
      maxBottom: null
    }

    const position = reactive<{ left: number, top: number, right: number | null, bottom: number | null, z: number }>({
      left: _.x,
      top: _.y,
      right: null,
      bottom: null,
      z: _.zIndex
    })

    watch(
      () => _.active,
      (val) => {
        state.enabled = val;

        if (val) {
          emit('activated');
        } else {
          emit('deactivated');
        }
      },
    );

    watch(() => _.x, (val) => {
      position.left = val;
    })

    watch(() => _.y, (val) => {
      position.top = val;
    })

    const checkLimits = () => {
      let el = _.page instanceof HTMLDivElement ? _.page : document.querySelector(_.page) as HTMLDivElement;
      const { width, height } = useElementBounding(el);
      const { left, top } = getPositionSize(vel.value as HTMLDivElement);
      bounds = {
        minLeft: -left,
        maxLeft: width.value - left - size.width,
        minRight: null,
        maxRight: null,
        minTop: -top,
        maxTop: height.value - top - size.height,
        minBottom: null,
        maxBottom: null
      }
    }

    const checkResetLimits = () => {
      if (_.page) {
        checkLimits();
      }
    }

    const touchstart = (e: TouchEvent) => {
      if (state.disabled) return;
      eventf = events.touch;
      elementDown(e)
    }
    
    const mouseDown = (e: MouseEvent) => {
      eventf = events.mouse;
      emit('click', e);
      elementDown(e)
    }

    const elementDown = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent && e.which !== 1) return;

      if (state.disabled) {
        emit('activated', e.shiftKey)
        return
      }

      if (!state.enabled) {
        state.enabled = true;

        emit('activated', e.shiftKey)
        emit('update:active', true)
      }

      mouseDownPosition.mouseX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
      mouseDownPosition.mouseY = e instanceof MouseEvent ? e.pageY : e.touches[0].pageY;
      mouseDownPosition.left = position.left;
      mouseDownPosition.top = position.top;
      mouseDownPosition.right = position.right as number;
      mouseDownPosition.bottom = position.bottom as number;

      checkResetLimits();

      document.documentElement.addEventListener(eventf.move as 'mousemove' | 'touchmove', move, true);
      document.documentElement.addEventListener(eventf.stop as 'mouseup' | 'touchend', handleUp, true);
    }

    const move = (e: MouseEvent | TouchEvent) => {
      let [width, height] = getComputedSize(vel.value as HTMLDivElement);

      const tmpX = mouseDownPosition.mouseX - (e instanceof MouseEvent ? e.pageX : e.touches[0].pageX);
      const tmpY = mouseDownPosition.mouseY - (e instanceof MouseEvent ? e.pageY : e.touches[0].pageY);
      let left = mouseDownPosition.left - tmpX;
      let top = mouseDownPosition.top - tmpY;

      emit('resizing', {
        left,
        top,
        width,
        height
      });
      state.resizing = true;
    }

    const handleUp = (e: MouseEvent | TouchEvent) => {

      document.documentElement.removeEventListener(eventf.move as 'mousemove' | 'touchmove', move, true);
    }

    const resetMouseBindings = () => {
      mouseDownPosition = { mouseX: 0, mouseY: 0, top: 0, right: 0, bottom: 0, left: 0 };
      if (_.page) {
        checkLimits();
      }
    }

    onMounted(() => {
      nextTick(resetMouseBindings);
      const [width, height] = getComputedSize(vel.value as HTMLDivElement)
      size.width = width;
      size.height = height;

      if (_.active) {
        emit('activated');
      }

      // document.documentElement.addEventListener('mousedown', select, true)
    });

    onUnmounted(() => {
      document.documentElement.removeEventListener('mousemove', move, true)
    })

    return () => {
      return (
        <div
          id={_.id}
          ref={vel}
          class={[styles.w_wrapper, { [styles.active]: state.enabled }]}
          style={stylesheet.value}
          onClick={(e) => e.stopPropagation()}
          onMousedown={mouseDown}
          onTouchstart={touchstart}
        >
          {slots.default?.()}
        </div>
      );
    };
  }
});

export default EWidgetRender;
