import { defineComponent, onMounted, ref } from "vue";
import styles from './canvas.module.scss';

const CanvasComponent = defineComponent({
  name: 'CanvasComponent',
  setup() {
    const ctxRef = ref();
    const ctx = ref<CanvasRenderingContext2D | null>(null)

    const pix = window.devicePixelRatio;

    // reset size canvas
    const initSizeCanvas: () => CanvasRenderingContext2D = () => {
      const canvas = ctxRef.value;
      canvas.width = canvas.clientWidth * pix;
      canvas.height = canvas.clientHeight * pix;
      ctx.value = canvas.getContext('2d');
      return ctx.value as CanvasRenderingContext2D
    }

    const drawLine = (ctx: CanvasRenderingContext2D, fn: (ctx: CanvasRenderingContext2D) => void, option?: Record<any, boolean>) => {
      const { beginPath } = option ?? {};
      beginPath && ctx.beginPath();
      fn(ctx);
      ctx.stroke();
    }

    const curveTo = (ctx: CanvasRenderingContext2D, pos: number[], option?: Record<any, boolean>) => {
      const [x, y, x1, y1, x2, y2] = pos;
      ctx.beginPath();
      ctx.bezierCurveTo(x, y, x1, y1, x2, y2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#f0f';
      ctx.stroke();
    }

    const execute = () => {
      let ctx = initSizeCanvas();
      ctx.lineWidth = ctx.lineWidth * pix;
      drawLine(ctx, (ctx) => {
        ctx.moveTo(5, 5);
        ctx.lineTo(80, 80);
        ctx.lineTo(80, 20);
        ctx.lineTo(30, 50);
        // ctx.strokeStyle = '#ff0';
      })
      ctx.beginPath();
      ctx.rect(100, 100, 100, 100);
      ctx.strokeStyle = '#99f';
      ctx.stroke();
      curveTo(ctx, [30, 50, 50 * 5, 100 * 5, 80 * 5, 30 * 5])
    }


    onMounted(() => {
      execute();
    })

    return () => <canvas ref={ctxRef} class={styles.canvas}></canvas>
  }
});

export default CanvasComponent;
