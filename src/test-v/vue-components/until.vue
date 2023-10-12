<script setup lang='ts'>
import { isRef, ref, unref, watch, watchEffect, type Ref } from "vue"

const count = ref(0)

const timer = ref()

/**
 * 实现`until`函数
*/

function until(initial: Ref<number>) {
  function toBe(value: number) {
    return new Promise<void>((resolve) => {
      // watch
      // const val = isRef(initial) ? unref(initial) : initial
      // const unwatch = watch(initial, newVal => {
      //   if (newVal === value) {
      //     unwatch();
      //     resolve()
      //   }
      // })

      // watchEffect 立即运行一个函数
      // const unwatch = watchEffect(() => {
      //   响应式追踪 initial 依赖
      //   const val = isRef(initial) ? unref(initial) : initial
      //   if (val === value) {
      //   if (initial.value === value) {
      //     unwatch();
      //     resolve();
      //   }
      // })
    })
  }

  return {
    toBe,
  }
}

async function increase() {
  tiemrFun()
  count.value = 0
  timer.value = setInterval(() => {
    count.value++
  }, 1000)
  await until(count).toBe(3)
  console.log(count.value === 3) // 确保输出为true
}

function tiemrFun() {
  clearInterval(timer.value)
  count.value = 0;
}

</script>
<template>
  <div>有些时候，我们需要依赖于异步的返回结果做一些后续处理，until函数在这种场景下非常有用，你能实现它吗 ? 让我们来试试吧 👇:</div>
  <br />
  <div>
    count {{ count }}

    <p>count.value === 3 {{ count === 3 }}</p>
  </div>
  <t-space>
    <t-button @click="increase">click</t-button>
    <t-button theme="default" @click="tiemrFun">clear</t-button>
  </t-space>
</template>
