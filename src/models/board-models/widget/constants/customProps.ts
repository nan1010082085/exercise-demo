import type { BaseGeneralModels } from '@/constants/base.models';
import type { WidgetModels } from '@/constants/widget.models';
import { type PropType } from 'vue';

export interface widgetDefaultData {
  size: BaseGeneralModels['position'];
  widget: WidgetModels;
}

const widgetDefaultProps = {
  size: {
    type: Object as PropType<any>,
    default: () => ({
      width: 100,
      height: 100
    })
  },
  widget: {
    type: Object as PropType<WidgetModels>,
    required: true
  },
  data: {
    type: Object as PropType<any>,
    default: () => []
  }
};

export default widgetDefaultProps;
