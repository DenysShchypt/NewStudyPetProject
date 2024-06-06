import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IAssetPriceResponses } from '../../../common/types/assets';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
interface IAreaChartProps {
  data: IAssetPriceResponses[];
}

const LineChart: FC<IAreaChartProps> = ({ data }) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: new Date().toLocaleDateString('en-us', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        color: 'white',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Period of time',
          color: '#A9FFA7',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
          color: '#A9FFA7',
        },
      },
    },
  };

  const value: ChartData<'line'> = {
    labels: data.flatMap(el =>
      el.data.Data.map(el =>
        moment(new Date(el.time * 1000)).format(' DD.MM.YY'),
      ),
    ),
    datasets: [
      {
        label: data[0].name,
        data: data.flatMap(el =>
          el.data.Data.map(el => parseFloat(el.close.toFixed(2))),
        ),
        borderColor:
          data[0].name === 'BTC' ? 'rgb(255, 153, 0)' : 'rgb(53, 162, 235)',
        backgroundColor: 'rgb(255, 255, 255)',
      },
    ],
  };
  return <Line data={value} options={options} width="100%" height="20%" />;
};

export default LineChart;
