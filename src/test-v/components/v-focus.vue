<script setup lang='ts'>
import { computed, ref, type DirectiveBinding } from "vue"

const state = ref(false)


/**
 * 实现一个自定义指令,让元素获取焦点
 * 确保当切换`state`时,元素随着状态值获取/失去焦点
 *
*/
const VFocus = {
  updated: (el: HTMLInputElement, binding: DirectiveBinding) => binding.value ? el.focus() : el.blur()
}



setInterval(() => {
  state.value = !state.value
}, 2000)

</script>

<template>
  <ul>
    <li> 实现一个自定义指令,让元素获取焦点</li>
    <li> 确保当切换`state`时,元素随着状态值获取/失去焦点</li>
  </ul>
  <div>state: {{ state }}</div>
  <br />
  <input v-focus="state" type="text">
</template>
