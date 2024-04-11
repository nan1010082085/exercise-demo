import type { DashboardModels } from '@/@types/board';
import type { WidgetModels } from '@/@types/widget';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const dashboardStore = defineStore('dashboard', () => {
  const board = ref<DashboardModels | null>(null);
  const widgets = ref<Map<string, WidgetModels>>(new Map());
  const active = ref<WidgetModels[]>([]);

  const createdBoard = (data: DashboardModels) => {
    board.value = data;

    /// set widgets
    if (data.widgets.length) {
      data.widgets.forEach((item) => {
        widgets.value.set(item.id, item);
      });
    }
  };

  const getWidgets = () => {
    return board.value?.widgets;
  };

  const getWidget = (id: WidgetModels['id']) => {
    if (widgets.value.has(id)) {
      return widgets.value.get(id);
    }
    return null;
  };

  // 添加部件
  const add = (widget: WidgetModels) => {
    widgets.value.set(widget.id, widget);
    board.value?.widgets.push(widget);
  };

  const delWidget = (widgetId: string) => {
    if (widgets.value.has(widgetId)) {
      widgets.value.delete(widgetId);
    }
    // board.value.widgets = board.value.widgets.filter((item) => item.id !== widgetId);
  };

  /**
   * @description 激活部件
   * @param widget 部件
   * @param shiftKey 是否shift键
   */
  const activated = (widget: WidgetModels, shiftKey: boolean = false) => {
    if (active.value.some((item) => item.id === widget.id)) return;
    if (!shiftKey) {
      active.value = [];
    }
    active.value.push(widget);
  };

  const deactivated = () => {
    active.value = [];
    console.log('deactivated');
  };

  const scroll = (data: { scrollLeft: number; scrollTop: number }) => {
    if (board.value) board.value.general.scroll = data;
  };

  return {
    board,
    widgets,
    active,
    createdBoard,
    getWidgets,
    getWidget,
    add,
    delWidget,
    activated,
    deactivated,
    scroll
  };
});
