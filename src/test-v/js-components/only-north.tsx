import { Fragment, defineComponent, onMounted, ref } from 'vue'
import img1 from '@public/test-v/only_north/1.png';
import img2 from '@public/test-v/only_north/2.png';
import img3 from '@public/test-v/only_north/3.png';
import img4 from '@public/test-v/only_north/4.png';
import img5 from '@public/test-v/only_north/5.png';
import img6 from '@public/test-v/only_north/6.png';
import img7 from '@public/test-v/only_north/7.png';
import img8 from '@public/test-v/only_north/8.png';
import img9 from '@public/test-v/only_north/9.png';
import img10 from '@public/test-v/only_north/10.png';
import img11 from '@public/test-v/only_north/11.png';
import img12 from '@public/test-v/only_north/12.png';

const source = [
  { name: '巫师', color: '#9a75a6', tColor: '#fff', img: img1 },
  { name: '小粉', color: '#e8c3c9', tColor: 'black', img: img2 },
  { name: '蜗牛', color: ['#000', '#7b19c1'], tColor: '#fff', img: img3 },
  { name: '阿追', color: '#6ff1c8', tColor: 'black', img: img4 },
  { name: '龙哥', color: 'black', tColor: '#fff', img: img5 },
  { name: '老王', color: ['#000', 'rgba(255, 0, 0, 1)'], tColor: '#fff', img: img6 },
  { name: '宝姐', color: '#e6a50e', tColor: '#fff', img: img7 },
  { name: '涛哥', color: 'black', tColor: '#fff', img: img8 },
  { name: '大E', color: 'black', tColor: '#fff', img: img9 },
  { name: '文龙', color: '#A8E1F2FF', tColor: '#000', img: img10 },
  { name: '123', color: 'black', tColor: '#fff', img: img11 },
  { name: '月老', color: '#328cf3', tColor: '#fff', img: img12 },
]

const OnlyNorth = defineComponent({
  name: 'OnlyNorth',
  setup() {
    const canvasRef = ref<HTMLCanvasElement>()
    onMounted(() => {
      const canvas = canvasRef.value as HTMLCanvasElement;
      canvas.width = 700 * window.devicePixelRatio;
      canvas.height = 650 * window.devicePixelRatio;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200; // 圆盘半径
      let images: HTMLImageElement[] = [];
      let angle = 0; // 初始角度
      let maxLen = source.length;

      // 加载所有图片
      let loadedImages = 0;
      for (let i = 0; i < maxLen; i++) {
        images[i] = new Image();
        images[i].src = source[i].img;
        images[i].onload = () => {
          if (++loadedImages === maxLen - 1) {
            draw();
          }
        };
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

        // 绘制圆盘
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // 绘制图标
        for (let i = 0; i < maxLen; i++) {
          const x = centerX + (radius * Math.cos(angle + 2 * Math.PI * i / maxLen));
          const y = centerY + (radius * Math.sin(angle + 2 * Math.PI * i / maxLen));
          ctx.drawImage(images[i], x - 25, y - 25, 50, 50); // 假设每个图片的大小为 50x50
          ctx.beginPath();
          let r_x = x - 25, r_y = y - 46
          if (typeof source[i].color !== 'string') {
            // 创建线性渐变 (x0, y0) 到 (x1, y1)
            const c = source[i].color;
            let linearGradient = ctx.createLinearGradient(r_x, r_y, r_x + 50, r_y + 20); // 从左到右
            // 添加颜色停靠点
            linearGradient.addColorStop(0.3, c[0]);
            linearGradient.addColorStop(1, c[1]);
            // 应用渐变色
            ctx.fillStyle = linearGradient;
          } else {
            ctx.fillStyle = source[i].color as string;
          }
          ctx.fillRect(r_x, r_y, 50, 20)
          ctx.closePath();
          ctx.beginPath();
          ctx.fillStyle = source[i].tColor;
          ctx.font = '16px Arial';
          ctx.fillText(source[i].name, x, y - 30)
          ctx.textAlign = 'center';
        }

        // 绘制文本
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.fillText('only north', centerX, centerY + 10);

        // 更新角度并重新绘制
        angle += 0.01;
        requestAnimationFrame(draw);
      }
    })

    return () => {
      return <Fragment>
        <canvas ref={canvasRef}></canvas>
      </Fragment>
    }
  }
})

export default OnlyNorth;
