<template>
  <div class="wrapper">
    <div>指令</div>
    <div>vScroll</div>
    <div v-scroll="handleScroll" class="scroll">
      <div v-for="item in list">{{ item }}</div>
    </div>
    <pre>{{ scrollResult }}</pre>

    <div class="line"></div>
    <div>vResizeOb</div>
    <ElButton type="primary" @click="handleResizeSize">改变大小</ElButton>
    <div v-resize-ob="handleResizeOb" ref="resizeRef" class="resizeob"></div>

    <pre>{{ resizeResult }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, type DirectiveBinding } from 'vue';
const vScroll = {
  scroll: ref(),
  mounted(el: Element, binding: DirectiveBinding) {
    el.addEventListener('scroll', (ev) => {
      const { target, } = ev;
      binding.value({ target });
    });
  },
  unmounted(el: Element) {
    el.removeEventListener('scroll', handleScroll);
  },
}


const vResizeOb = {
  reob: ref<ResizeObserver>(),
  mounted(el: Element, binding: DirectiveBinding) {
    const reob = vResizeOb.reob
    reob.value = new ResizeObserver((entries) => {
      const { contentRect, target } = entries[0];
      binding.value({ rect: contentRect, target });
    });
    reob.value.observe(el);
  },
  unUnmounted() {
    vResizeOb.reob.value?.disconnect();
  },
}

const list = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
].reverse())
const scrollResult = ref()

const resizeRef = ref()
const reize = ref([
  [100, 200],
  [200, 200],
  [300, 300],
  [300, 100],
  [200, 150]
])
const resizeResult = ref('')

let log = console.log;
const handleResizeSize = () => {
  let max = reize.value?.length;
  let i = parseInt(`${Math.max(1, Math.random() * max)}`);
  let [w, h] = reize.value[i];
  resizeRef.value.style.width = w + 'px';
  resizeRef.value.style.height = h + 'px';
}

const handleScroll = (ev: any) => {
  log(ev);
  scrollResult.value = JSON.stringify(ev)
}

const handleResizeOb = (ev: { rect: DOMRectReadOnly; target: Element }) => {
  resizeResult.value = JSON.stringify(ev)
}

</script>

<style scoped>
.wrapper {
  padding: 10px;
  position: relative;
}

.scroll {
  width: 150px;
  height: 200px;
  background: gray;
  overflow: auto;
  transform: translateX(calc(150px / 2)) rotateX(0deg) rotateY(0deg) rotateZ(90deg);
  transform-origin: 50%;

  div {
    margin: 10px;
    width: 100px;
    height: 120px;
    background: #fff;
    color: #333;
    transform: rotate(-90deg)
  }
}

.line {
  margin: 10px 0;
  width: 100%;
  height: 1px;
  background-color: gray;
}

.resizeob {
  width: 100px;
  height: 200px;
  background: gray;
}
</style>
