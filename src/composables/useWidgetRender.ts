/**
 * @Author Yang (yang dong nan)
 * @Date 2023-12-04 13:45:03
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-12-04 13:45:03
 * @Description 部件渲染操作函数
 */

import type { OffsetType, TouchType } from '@/components/e-widget-render';
import type { WidgetModels } from '../@types/widget';
import { isUndefinedOrNull } from '@/utils';
import { dashboardStore } from '@/store/dashboard-store';
import useElement from './useElement';

export interface ChangeTouchOption {
  // 鼠标在元素上位置 由 layer 计算得出
  offset: OffsetType;
  // 拖拽类型
  type: TouchType;
  //
  layer: { x: number; y: number };
  // 部件的 size
  size: { x: number; y: number; width: number; height: number };
}

export interface AuxiliaryResultType {
  x: number;
  y: number;
  len: number;
  algin: number;
}
export interface AuxiliaryResult {
  h: AuxiliaryResultType[];
  v: AuxiliaryResultType[];
}

const useWidgetRenderFunc = () => {
  const { getElementSize } = useElement();
  const changeTouch = (option: ChangeTouchOption) => {
    const { offset, type, layer, size } = option;
    const [x, y] = [layer.x - offset.l, layer.y - offset.t];
    let result = {};
    if (type.includes('l')) {
      const w = size.width - (x - size.x);
      const h = size.height - (y - size.y);
      switch (type) {
        case 'lt':
          result = { x, y, w, h };
          break;
        // 反向计算高度
        case 'lb':
          result = { x, w, h: y - size.y };
          break;
        case 'lc':
          result = { x, w };
          break;
        case 'ltc':
          result = { y, h };
          break;
      }
    }
    if (type.includes('r')) {
      const left = layer.x - (size.x + size.width) < 0;
      const top = layer.y - (size.y + size.height) < 0;
      const rbw = Math.abs(x - size.x);
      const rbh = Math.abs(y - size.y);
      const rw = size.width - Math.abs(size.x - x);
      const rh = size.height - Math.abs(size.y - y);
      switch (type) {
        // 与 rb 反向计算 y轴和高度
        case 'rt':
          result = left && top ? { y: rbh + size.y, w: rw, h: rh } : { y, w: rbw, h: size.height + rbh };
          break;
        case 'rb':
          result = left && top ? { w: rw, h: rh } : { w: rbw, h: rbh };
          break;
        case 'rc':
          result = left ? { w: rw } : { w: rbw };
          break;
        case 'rbc':
          result = top ? { h: rh } : { h: rbh };
          break;
      }
    }
    return result;
  };

  const changeTouchWidget = (widget: WidgetModels, option: ChangeTouchOption) => {
    const { x, y, w, h } = changeTouch(option) as { x: number; y: number; w: number; h: number };
    if (!isUndefinedOrNull(x)) widget.general.position.x = x;
    if (!isUndefinedOrNull(y)) widget.general.position.y = y;
    if (!isUndefinedOrNull(w)) widget.general.position.width = w;
    if (!isUndefinedOrNull(h)) widget.general.position.height = h;
  };

  // 获取辅助线坐标
  const getAuxiliary = (active: WidgetModels, widgets: WidgetModels[]): AuxiliaryResult => {
    const aSize = getElementSize(document.getElementById(active.id));
    const h: AuxiliaryResultType[] = [];
    const v: AuxiliaryResultType[] = [];
    if (!aSize) return { h, v };
    widgets
      .filter((w) => w.id !== active.id)
      .forEach((w) => {
        const wSize = getElementSize(document.getElementById(w.id));
        if (wSize) {
          let { x, y, width, height } = wSize;
          // 竖线(垂直)
          // 中心
          if (x + width / 2 === aSize.x + aSize.width / 2) {
            const top = y > aSize.y ? aSize.y : y;
            const len = y > aSize.y ? y - aSize.y + height : aSize.y - y + aSize.height;
            const left = x + width / 2;
            v.push({ algin: x, x: left, y: top, len });
          } else {
            // 左左对齐
            if (x === aSize.x) {
              const top = y > aSize.y ? aSize.y : y;
              const len = y > aSize.y ? y - aSize.y + height : aSize.y - y + aSize.height;
              const algin = x > aSize.x ? x : aSize.x;
              v.push({ algin, x, y: top, len });
            }
            // 左右对齐 右左对齐
            if (x + width === aSize.x || x === aSize.x + aSize.width) {
              const top = y > aSize.y ? aSize.y : y;
              const len = y > aSize.y ? y - aSize.y + height : aSize.y - y + aSize.height;
              const left = x > aSize.x ? x : aSize.x;
              const algin = x > aSize.x ? aSize.x : x + width;
              v.push({ algin, x: left, y: top, len });
            }
          }

          // 横线(水平)
          // 中心
          if (y + height / 2 === aSize.y + aSize.height / 2) {
            const left = x > aSize.x ? aSize.x : x;
            const len = x > aSize.x ? x - aSize.x + width : aSize.x - x + aSize.width;
            const top = y + height / 2;
            h.push({ algin: y, x: left, y: top, len: len });
          } else {
            // 上上对齐
            if (y === aSize.y) {
              const left = x > aSize.x ? aSize.x : x;
              const len = x > aSize.x ? x - aSize.x + width : aSize.x - x + aSize.width;
              h.push({ algin: y, x: left, y: y, len: len });
            }
            // 上底对齐 底上对齐
            if (y + height === aSize.y || y === aSize.y + aSize.height) {
              const left = x > aSize.x ? aSize.x : x;
              const len = x > aSize.x ? x - aSize.x + width : aSize.x - x + aSize.width;
              const top = y > aSize.y ? aSize.y + aSize.height : y + height;
              const algin = y > aSize.y ? aSize.y : y + height;
              h.push({ algin, x: left, y: top, len: len });
            }
          }
        }
      });
    return { h, v };
  };

  return {
    changeTouch,
    changeTouchWidget,
    getAuxiliary
  };
};

export default useWidgetRenderFunc;
