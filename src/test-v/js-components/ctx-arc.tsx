import { defineComponent, onMounted, ref } from "vue";

const colorsRGBA = [
  'rgba(255, 0, 0, 1)',     // 红色
  'rgba(255, 165, 0, 1)',   // 橙色
  'rgba(255, 255, 0, 1)',   // 黄色
  'rgba(0, 128, 0, 1)',     // 绿色
  'rgba(0, 0, 255, 1)',     // 蓝色
  'rgba(75, 0, 130, 1)',    // 靛蓝色
  'rgba(128, 0, 128, 1)'    // 紫色
];

const CvsArc = defineComponent({
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    onMounted(() => {
      const canvas = canvasRef.value as HTMLCanvasElement;
      canvas.width = 800 * window.devicePixelRatio;
      canvas.height = 300 * window.devicePixelRatio;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      let x_c = canvas.width / 2;
      let y_c = canvas.height / 2;
      let r = 100;
      function draw(dot: any[]) {
        for (let i = 0; i < dot.length; i++) {
          const max = dot[i];
          const color = colorsRGBA[Math.floor(Math.random() * i)] as string;
          let angle = (i / 100) * 2 * Math.PI;
          // 计算每个点的坐标
          let x = x_c + r * Math.cos(angle);
          let y = y_c + r * Math.sin(angle);
          // 绘制点
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI); // 2为点的半径
          ctx.fill();
          // 从每个点绘制直线
          let lineEndX = x + max * Math.cos(angle);
          let lineEndY = y + max * Math.sin(angle);
          ctx.beginPath();
          ctx.moveTo(x, y); // 点的中心
          ctx.lineTo(lineEndX, lineEndY); // 直线的结束坐标
          ctx.strokeStyle = color;
          ctx.stroke(); // 执行绘制
        }
      }

      let arr = Array.from({ length: 100 }).map((() => Math.random() * 100));
      draw(arr)
    })

    return () => {
      return <canvas ref={canvasRef}></canvas>
    }
  }
})

export default CvsArc;
