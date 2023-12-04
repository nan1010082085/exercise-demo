import type { DashboardModels } from '@/constants/dashboard.models';
import type { WidgetModels } from '@/constants/widget.models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import dashboardBase from '@/assets/default-json/dashboard.base.json';

export const dashboardStore = defineStore('dashboard', () => {
  const board = ref<DashboardModels>(dashboardBase);

  const createdBoard = (data: DashboardModels) => {
    board.value = data;
  };

  const getWidget = (id: string) => {
    return board.value.widgets.find((item) => item.id === id);
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
    createdBoard,
    getWidget,
    addWidget,
    delWidget
  };
});
