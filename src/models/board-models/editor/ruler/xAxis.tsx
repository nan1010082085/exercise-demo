import { computed, defineComponent, ref, watchPostEffect, type PropType } from "vue";
import { dashboardStore } from "@/store/dashboard-store";

const RulerXAxis = defineComponent({
  props: {
    grid: {
      type: Array as PropType<number[]>,
      default: () => [10, 10],
      required: true
    }
  },
  emits: [],
  setup(props, { emit }) {
    const boardStore = dashboardStore();
    const maxWidth = ref<number>(0)
    const scrollLeft = computed(() => boardStore.board?.general.scroll.scrollLeft as number || 0);
    const cvsRef = ref<HTMLCanvasElement>();
    const m = 25;

    watchPostEffect(() => {
      maxWidth.value = boardStore.board?.general.position.width as number;
      if (maxWidth.value) {
        if (cvsRef.value) {
          cvsRef.value.width = Math.floor(maxWidth.value * window.devicePixelRatio);
          cvsRef.value.height = Math.floor(m * window.devicePixelRatio);
        }
        init();
      }
    })

    const mark = (cvs: CanvasRenderingContext2D) => {
      const g = props.grid[0] || 10;
      const y = 10;
      const len = parseInt(String(maxWidth.value / g));
      for (let i = 0; i < len; i++) {
        let lineY = i % 10 === 0 ? m / 2 : i % 5 === 0 ? m / 1.6 : m / 1.3;
        let strokeStyle = i % 10 === 0 ? '#000' : i % 5 === 0 ? '#303133' : '#8b8b8b';
        let pos = i * g;
        cvs.font = `10px Arial`;
        cvs.fillStyle = '#000';
        cvs.lineWidth = 1;
        cvs.beginPath();
        cvs.moveTo(pos, m);
        cvs.lineTo(pos, lineY);
        cvs.strokeStyle = strokeStyle;
        cvs.stroke();
        if (i !== 0) cvs.textAlign = 'center';
        if (i % 10 === 0 || i % 5 === 0) cvs.fillText(`${pos}`, pos, y);
      }
    }

    const init = () => {
      const cvs = cvsRef.value?.getContext('2d');
      if (!cvs) return;
      cvs.beginPath();
      cvs.fillStyle = '#fff';
      cvs.fillRect(0, 0, maxWidth.value, m);
      // line
      cvs.fillStyle = '#000';
      cvs.lineWidth = 1;
      cvs.moveTo(0, m)
      cvs.lineTo(maxWidth.value, m)
      cvs.stroke();
      mark(cvs);
    }

    return () => {
      return <canvas ref={cvsRef} style={{
        transform: `translateX(-${scrollLeft.value}px)`
      }}></canvas>
    }
  }
})

export default RulerXAxis;
