/**
 * @Author Yang (yang dong nan)
 * @Date 2023-12-04 13:45:03
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-12-04 13:45:03
 * @Description 部件渲染操作函数
 */

import type { OffsetType, TouchType } from '@/components/e-widget-render';
import type { WidgetModels } from './../constants/widget.models';
import { isUndefinedOrNull } from '@/utils';

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

const useWidgetRenderFunc = () => {
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

  return {
    changeTouch,
    changeTouchWidget
  };
};

export default useWidgetRenderFunc;
