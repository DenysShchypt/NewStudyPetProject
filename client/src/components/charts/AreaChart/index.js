import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
const options = {
    responsive: true,
    scales: {
        x: {
            display: false,
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
};
const AreaChart = ({ data }) => {
    const values = {
        labels: data.map(el => {
            const timeDay = el.time * 1000;
            return new Date(timeDay).toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }),
        datasets: [
            {
                label: 'Price',
                data: data.map(el => el.close),
                fill: 'start',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 50, 0, 180);
                    gradient.addColorStop(0, '#C1EF00');
                    gradient.addColorStop(1, '#232323');
                    return gradient;
                },
            },
        ],
    };
    return _jsx(Line, { options: options, data: values, width: 300, height: 125 });
};
export default AreaChart;
