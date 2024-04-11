const useElementSize = () => {
  const getPositionSize = (el: HTMLElement | HTMLDivElement | null) => {
    let position = { left: 0, top: 0 };
    if (!el) return position;
    const tran = el.style.transform.match(/^translate\((.+)\)/) ?? [];
    const [x, y] = tran[1].split(',').map((str) => Number(str.replace(/px/, '')));
    position.left += x;
    position.top += y;
    return position;
  };

  const getComputedSize = (el: HTMLElement | HTMLDivElement | null): [number, number] => {
    if (!el) return [0, 0];
    const style = window.getComputedStyle(el);
    return [parseFloat(style.getPropertyValue('width')), parseFloat(style.getPropertyValue('height'))];
  };

  const resetToBounbs = (val: number, min: number | null, max: number | null) => {
    console.log(val, min, max);
    if (min !== null && val < min) {
      return min;
    }
    if (max !== null && val > max) {
      return max;
    }
    return val;
  };

  return {
    getPositionSize,
    getComputedSize,
    resetToBounbs
  };
};

export interface ElRect {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export type ParentElRect = ElRect;

export default useElementSize;
