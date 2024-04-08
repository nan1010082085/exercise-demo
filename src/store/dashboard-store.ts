import type { DashboardModels } from '@/@types/board';
import type { WidgetModels } from '@/@types/widget';
import { defineStore } from 'pinia';
import { ref, toValue, type Ref } from 'vue';
import dashboardBase from '@/assets/default-json/dashboard.base.json';

export const dashboardStore = defineStore('dashboard', () => {
  const body = ref();
  const board = ref<DashboardModels>(dashboardBase);

  const addBody = (el: Ref<HTMLDivElement | undefined>) => {
    body.value = toValue(el)
  }

  const createdBoard = (data: DashboardModels) => {
    board.value = data;
  };

  const getWidgets = () => {
    return board.value.widgets;
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
    body,
    board,
    addBody,
    createdBoard,
    getWidgets,
    getWidget,
    addWidget,
    delWidget
  };
});
