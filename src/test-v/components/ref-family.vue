<script setup lang="ts">
import { ref, reactive, isRef, unref, toRef, type Ref } from "vue"

const initial = ref(10)
const count = ref(0)

// 挑战 1: 更新 ref
function update(value: number) {
  // 实现...
  count.value = value;
}

/**
 * 挑战 2: 检查`count`是否为一个 ref 对象
 * 确保以下输出为1
*/
console.log(
  isRef(count) ? 1 : 0
  // impl ? 1 : 0
)

/**
 * 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身
 * 确保以下输出为true
*/
function initialCount(value: number | Ref<number>) {
  // 确保以下输出为true
  value = isRef(value) ? unref(value) : value;
  return value === 10;
}

const v = initialCount(initial)
console.log(v)

/**
 * 挑战 4:
 * 为源响应式对象上的某个 `property` 新创建一个 `ref`。
 * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。
 * 确保以下输出为true
*/
const state = reactive({
  foo: 1,
  bar: 2,
})

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo') // 修改这里的实现...

// 修改引用将更新原引用
fooRef.value++
console.log(state.foo === 2)

// 修改原引用也会更新`ref`
// state.foo++
// console.log(fooRef.value === 3)

</script>

<template>
  <div>
    <h1>msg</h1>
    <code>* 挑战 1: 更新 ref</code>
    <p>
      <span class="count-class" @click="update(count - 1)">-</span>
      {{ count }}
      <span class="count-class" @click="update(count + 1)">+</span>
    </p>
    <code>* 挑战 2: 检查`count`是否为一个 ref 对象</code><br />
    <code>* 确保以下输出为1</code>
    <p>{{ count }}</p>
    <code>* 挑战 3: 如果参数是一个 ref，则返回内部值，否则返回参数本身</code><br />
    <code>* 确保以下输出为true</code>
    <p>initialCount(initial) => {{ v }}</p>
    <code>* 挑战 4:</code><br />
    <code>* 为源响应式对象上的某个 `property` 新创建一个 `ref`。</code><br />
    <code> * 然后,`ref` 可以被传递，它会保持对其源`property`的响应式连接。</code><br />
    <code>* 确保以下输出为true</code>
    <p>{{ state.foo === 2 }}</p>
    <!-- <code> * 修改原引用也会更新`ref` </code>
    <p>{{ fooRef }}</p> -->
  </div>
</template>

<style lang="scss" scoped>
.count-class {
  cursor: pointer;
  padding: 5px 10px;
}
</style>
