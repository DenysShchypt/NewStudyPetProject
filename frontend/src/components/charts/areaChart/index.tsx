import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions, ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IAssetPriceData } from '../../../common/types/assets';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);
interface IAreaChartProps {
  data: IAssetPriceData[];
}
const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const AreaChart: FC<IAreaChartProps> = ({ data }) => {
  console.log(data);
  const values: ChartData<'line'> = {
    labels: data.map(el => new Date(el.time).getUTCDate()),
    datasets: [
      {
        label: 'Price',
        data: data.map(el => el.close),
        fill: 'start',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
          gradient.addColorStop(0, '#C1EF00');
          gradient.addColorStop(1, '#232323');
          return gradient;
        },
      },
    ],
  };
  return <Line options={options} data={values} width={300} height={100} />;
};

export default AreaChart;
