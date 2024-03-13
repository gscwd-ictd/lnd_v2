export type Dataset = {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor: string | Array<string>;
  hoverOffset?: number;
};

export type ChartData = {
  labels: Array<string>;
  datasets: Array<Dataset>;
};

export type LegendChart = {
  position: "top";
};

export type TitleChart = {
  display: boolean;
  text: string;
};

export type PluginsChart = {
  legend: LegendChart;
  title?: TitleChart;
};

export type ChartOptions = {
  responsive: boolean;
  plugins: PluginsChart;
};
