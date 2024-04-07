import type { GridComponentOption, XAXisComponentOption, YAXisComponentOption } from 'echarts';
import type { BarSeriesOption } from 'echarts/charts';
import type {
  DatasetComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LegendComponentOption
  | GridComponentOption
  | TitleComponentOption
  | XAXisComponentOption
  | YAXisComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>;

export const option: ECOption = {
  legend: {},
  grid: {},
  yAxis: {},
  xAxis: {},
  series: []
};
