
<script setup lang='ts'>
import { ref } from "vue"

/**
 * 实现一个切换状态的可组合函数
 * 确保该功能正常工作
*/
function useToggle(value: boolean) {
  const state = ref(value)

  const toggle = () => {
    state.value = !state.value;
  }

  return [
    state,
    toggle,
  ]
}

const [state, toggle] = useToggle(false)

</script>

<template>
  <div>
    <span>* 实现一个切换状态的可组合函数</span><br />
    <span>* 确保该功能正常工作</span>
  </div>
  <p>State: {{ state ? 'ON' : 'OFF' }}</p>
  <t-button @click="toggle">
    Toggle state
  </t-button>
</template>
