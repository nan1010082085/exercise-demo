import { Shape } from '@antv/x6';
import { register } from '@antv/x6-vue-shape';

/**
 * 注册自定义节点
 */
export const customRegister = () => {
  // 创建html片段节点
  const htmlNode = (className: string) => {
    return Shape.HTML.register({
      shape: 'html-text',
      // width: 100,
      // height: 100,
      html() {
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = `Shape = Html <br/> HTML-DIV-TEXT`;
        return div;
      }
    });
  };

  /**
   * 创建vue组件节点
   * @param component Vue组件 defineComponent 创建
   * @returns 返回创建实例
   */
  const vueNode = (component: any) => {
    console.log(component)
    return register({
      shape: String(component.name).toLowerCase(),
      width: 100,
      height: 100,
      component: component
    });
  };

  return {
    htmlNode,
    vueNode
  };
};
