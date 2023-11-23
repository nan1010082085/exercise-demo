import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const useGlobalStore = defineStore('global', () => {
  const globalConfig = ref({});

  const breadcrumbHistory = ref<RouteRecordRaw[]>([]);

  const clearBreadcrumbHistory = () => {
    breadcrumbHistory.value = [];
  };

  const setBreadcrumbHistory = (data: RouteRecordRaw) => {
    // login remove history
    if (data.path === '/login') {
      breadcrumbHistory.value = [];
      return;
    }

    // 检查历史中是否存在该路由， 存在的位置
    if (breadcrumbHistory.value.some((item) => item.path === data.path)) {
      const index = breadcrumbHistory.value.findIndex((item) => item.path === data.path);
      breadcrumbHistory.value.splice(index + 1);
      return;
    }

    // push history
    if (breadcrumbHistory.value.length > 5) {
      breadcrumbHistory.value.shift();
      return;
    }
    breadcrumbHistory.value.push(data);
  };

  return {
    globalConfig,
    breadcrumbHistory,
    setBreadcrumbHistory,
    clearBreadcrumbHistory
  };
});
