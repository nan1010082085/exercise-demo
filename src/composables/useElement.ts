const useElement = () => {
  const getElementSize = (el: Element | null) => {
    if (!el) return;
    const style = getComputedStyle(el);
    const w = style.getPropertyValue('width');
    const h = style.getPropertyValue('height');
    const transform = style.getPropertyValue('transform');
    const axis = transform.replace(/[a-z()]+/g, '').split(', ');
    return {
      x: isNaN(Number(axis[4])) ? 0 : Number(axis[4]),
      y: isNaN(Number(axis[5])) ? 0 : Number(axis[5]),
      width: Number(w.replace('px', '')),
      height: Number(h.replace('px', ''))
    };
  };

  const getElRect = (el: Element | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    return {
      x: rect.x,
      y: rect.y,
      w: rect.width,
      h: rect.height
    };
  };

  const getParentSize = (el: Element | null) => {
    // const parent = document.querySelector('.main-wrapper');
    // const parentSize = getElementSize(parent);
    // return parentSize;
  };

  return {
    getElementSize,
    getParentSize
  };
};

export default useElement;
