import { computed, defineComponent, ref, watchPostEffect, type PropType } from "vue";
import { dashboardStore } from "@/store/dashboard-store";

const RulerYAxis = defineComponent({
  props: {
    grid: {
      type: Array as PropType<number[]>,
      default: () => [0, 0],
      required: true
    }
  },
  emits: [],
  setup(props, { emit }) {
    const boardStore = dashboardStore();
    const maxHieght = ref<number>(0)
    const scrollTop = computed(() => boardStore.board?.general.scroll.scrollTop as number || 0);
    const cvsRef = ref<HTMLCanvasElement>();
    const m = 25;

    watchPostEffect(() => {
      maxHieght.value = boardStore.board?.general.position.height as number;
      if (cvsRef.value) {
        cvsRef.value.width = m;
        cvsRef.value.height = maxHieght.value + m;
      }
      init();
    })

    const mark = (cvs: CanvasRenderingContext2D) => {
      const g = props.grid[1] || 10;
      const x = 6;
      const len = parseInt(String(maxHieght.value / g));
      for (let i = 0; i < len; i++) {
        let pos = i * g;
        cvs.font = `10px Arial`;
        cvs.textAlign = 'center';
        cvs.textBaseline = 'middle';
        let lineX = i % 10 === 0 ? m / 2 : i % 5 === 0 ? m / 1.6 : m / 1.3;
        let strokeStyle = i % 10 === 0 ? '#000' : i % 5 === 0 ? '#303133' : '#8b8b8b';
        let aixs = -Math.PI / 2;
        let text = `${pos}`;
        cvs.beginPath();
        cvs.moveTo(m, pos);
        cvs.lineTo(lineX, pos);
        cvs.strokeStyle = strokeStyle;
        cvs.stroke();
        cvs.save();
        if (i % 10 === 0 || i % 5 === 0) {
          cvs.translate(x, i !== 0 ? pos : pos + x / 2)
          cvs.rotate(aixs);
          cvs.fillText(text, 0, 0);
          cvs.restore();
        }
      }
    }

    const init = () => {
      const cvs = cvsRef.value?.getContext('2d');
      if (!cvs) return;
      cvs.beginPath();
      // bg
      cvs.fillStyle = '#fff';
      cvs.fillRect(0, 0, 100, maxHieght.value);
      // line
      cvs.fillStyle = '#000';
      cvs.lineWidth = 1;
      cvs.moveTo(m, 0)
      cvs.lineTo(m, maxHieght.value)
      cvs.stroke();
      mark(cvs);
    }

    return () => {
      return <canvas ref={cvsRef} style={{
        transform: `translateY(-${scrollTop.value}px)`
      }}></canvas>
    }
  }
})

export default RulerYAxis;
