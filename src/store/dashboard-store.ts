import type { DashboardModels } from '@/constants/dashboard.models';
import type { WidgetModels } from '@/constants/widget.models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import dashboardBase from '@/assets/default-json/dashboard.base.json';

export const dashboardStore = defineStore('dashboard', () => {
  const board = ref<DashboardModels>(dashboardBase);

  const created = (data: DashboardModels) => {
    board.value = data;
  };

  // 添加部件
  const addWidget = (widget: WidgetModels) => {
    board.value.widgets.push(widget);
  };

  const delWidget = (widgetId: string) => {
    board.value.widgets = board.value.widgets.filter((item) => item.id !== widgetId);
  };

  return {
    board,
    created,
    addWidget,
    delWidget
  };
});
