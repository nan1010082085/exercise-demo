<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import { useGlobalStore } from '../../../src/store/global-store';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'

// const globalStore = useGlobalStore();
const router = useRouter();

onMounted(() => {
  // 直接获取主应用静态数据
  // const routeInfo = window.microApp.router.current.get('my-app')
  // console.log('routeInfo', routeInfo)
  // // window.microApp.get
  console.log(window.microApp)
  const piniaStaticData = window.microApp.getData();
  console.log('data', piniaStaticData)
})

// window.microApp.addDataListener(() => {
//   console.log('data', window.microApp.getData())
// })

const onRouter = (path: string) => {
  router.push({name: path})
}

</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>-->
  <!-- <HelloWorld msg="Vite + Vue" />  -->
  <div>
    <button @click="onRouter('MyApp')">home</button>
    <button @click="onRouter('User')">user</button>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
