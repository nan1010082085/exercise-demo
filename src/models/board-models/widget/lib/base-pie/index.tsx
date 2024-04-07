import { defineComponent, onMounted, ref, type PropType, computed } from 'vue';
import styles from './styles/index.module.scss';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { option, type ECOption } from './config/default';
import widgetDefaultProps, { type widgetDefaultData } from '@/widget/constants/customProps';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

const basePie = defineComponent({
  props: {
    ...widgetDefaultProps
  },
  setup(_) {
    const instance = ref<echarts.EChartsType>();
    const chartOption = ref<ECOption>(option);
    const props = computed(() => _ as widgetDefaultData);

    const setData = () => {};

    onMounted(() => {
      instance.value = echarts.init(document.getElementById(props.value.widget.id));
    });

    return () => {
      return <div id={props.value.widget.id} class={styles.wrapper}></div>;
    };
  }
});

export default basePie;
