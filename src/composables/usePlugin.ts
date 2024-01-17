/**
 * @Author Yang (yang dong nan)
 * @Date 2023-11-23 11:17:42
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023-11-23 11:17:42
 * @Description
 */

import { ref } from 'vue';
import DebugGlobal, { type DebugGlobalProps } from '../plugins/debug';

const usePlugin = () => {
  const dragImage = ref();
  const debug = (option: DebugGlobalProps) => new DebugGlobal(option);

  const reserveCreateImage = () => {
    dragImage.value = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const linearGradient = ctx.createLinearGradient(0, 0, 50, 50);
    linearGradient.addColorStop(0, '#fff');
    linearGradient.addColorStop(0.5, '#fff');
    linearGradient.addColorStop(1, '#eee');
    ctx['fillStyle'] = linearGradient;
    ctx?.fillRect(0, 0, 50, 50);
    ctx['lineJoin'] = 'round';
    ctx['strokeStyle'] = linearGradient;
    ctx?.beginPath();
    ctx?.lineTo(0, 0);
    ctx?.lineTo(50, 0);
    ctx?.lineTo(0, 0);
    ctx?.lineTo(0, 50);
    ctx?.closePath();
    ctx?.stroke();
    dragImage.value.src = canvas.toDataURL('image/jpg');
  };

  return {
    debug,
    dragImage,
    reserveCreateImage
  };
};

export default usePlugin;
