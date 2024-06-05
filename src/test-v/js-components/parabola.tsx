import { ElButton } from "element-plus";
import { defineComponent, h, onMounted, ref } from "vue";
import styles from './styles/parabola.module.scss'

class Ball {
  #vx = 0;
  #vy = 0;
  x = 0;
  y = 0;
  radius = 10;
  constructor(x: number, y: number, vx: number, vy: number) {
    this.init(x, y, vx, vy)
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.#vx;
    this.y += this.#vy;
    this.#vy += 0.2; // 模拟重力加速度，向下
  }

  init(x: number, y: number, vx: number, vy: number) {
    this.x = x;
    this.y = y;
    this.#vx = vx;
    this.#vy = vy;
  }
}

class Par2 {
  #aim;
  #rect = { x: 0, y: 0 };
  start = { x: 0, y: 0 };
  end = { x: 0, y: 0 };
  constructor(aim: HTMLDivElement, x: number, y: number) {
    this.#aim = aim;
    this.#rect.x = x;
    this.#rect.y = y;
  }

  endRect() {
    return this.#aim.getBoundingClientRect()
  }

  createBillDom() {
    let bill = document.createElement('div');
    let bill_i = document.createElement('i');
    bill.style.left = `${this.start.x - 10}px`;
    bill.style.top = `${this.start.y - 10}px`;
    bill.classList.add(styles.box2_bill);
    bill_i.classList.add(styles.box2_bill_i)
    bill_i.textContent = '+'
    bill.appendChild(bill_i);
    return {
      bill,
      bill_i
    };
  }

  init(el: Element, index: number) {
    const startRect = el.getBoundingClientRect();
    const endRect = this.endRect();
    this.end.x = endRect.x + 15;
    this.end.y = endRect.y + 15;
    this.start.x = startRect.x;
    this.start.y = startRect.y;
  }

  startJump() {
    const { bill, bill_i } = this.createBillDom()
    document.body.appendChild(bill);
    requestAnimationFrame(() => {
      this.jump(bill, bill_i)
      bill.addEventListener('transitionend', () => {
        document.body.removeChild(bill)
      }, { once: true })
    })
  }

  jump(el: HTMLDivElement, child_el: HTMLElement) {
    console.log(this.end.y - this.start.y)
    el.style.setProperty('transform', `translateX(-${this.start.x - this.end.x}px`)
    child_el.style.setProperty('transform', `translateY(${this.end.y - this.start.y}px)`)
  }
}

const Parabola = defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    // 当小球开始高度变化时
    // 需要计算小球 vx 移动距离
    let ball = new Ball(470, 10, -6, 0); // 初始化小球，向左下抛物线运动
    function animate() {
      let w = canvas.value?.width as number;
      let h = canvas.value?.height as number;
      const ctx = canvas.value?.getContext('2d') as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, w, h); // 清除画布
      ball.draw(ctx); // 绘制小球
      ball.update(); // 更新小球位置

      // 检查小球是否飞出边界
      if (ball.x + ball.radius < ball.radius || ball.y - ball.radius > h - ball.radius) {
        ctx.clearRect(0, 0, w, h);
        return; // 如果飞出边界，则停止动画
      }

      requestAnimationFrame(animate); // 请求下一帧动画
    }
    const onRun = () => {
      const cvs = canvas.value;
      if (!cvs) return;
      ball.init(470, 10, -5.5, 0)
      animate()
    }


    const box = ref<HTMLDivElement>()
    const aim = ref<HTMLDivElement>()
    let p2: Par2;
    const onRun2 = (ev: MouseEvent, index: number) => {
      p2.init(ev.target as Element, index)
      p2.startJump()
    }

    onMounted(() => {
      let boxRect = box.value!.getBoundingClientRect();
      let x = boxRect.x;
      let y = boxRect.y;
      p2 = new Par2(aim.value!, x, y);
    })

    return () => {
      return <div class={styles.container}>
        <div class={styles.box1}>
          <p>canvas实现</p>
          <ElButton onClick={onRun}>抛物线</ElButton>
          <canvas ref={canvas} class={styles.canvas} width="480" height="700"></canvas>
        </div>
        <div ref={box} class={styles.box2}>
          <p>css, js</p>
          <div class={styles.box2_item}>1
            <ElButton onClick={(e) => onRun2(e, 1)} type="primary" circle>1</ElButton>
          </div>
          <div class={styles.box2_item}>2
            <ElButton onClick={(e) => onRun2(e, 2)} type="primary" circle>1</ElButton>
          </div>
          <div class={styles.box2_item}>3
            <ElButton onClick={(e) => onRun2(e, 3)} type="primary" circle>1</ElButton>
          </div>
          <div ref={aim} class={styles.box2_footer}></div>
        </div>
      </div>
    }
  }
})

export default Parabola;
