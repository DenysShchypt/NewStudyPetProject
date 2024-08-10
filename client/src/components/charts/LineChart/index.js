import { jsx as _jsx } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
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
    const value = {
        labels: data.data.Data.map(el => moment(new Date(el.time * 1000)).format(' DD.MM.YY')),
        datasets: [
            {
                label: data.name,
                data: data.data.Data.map(el => parseFloat(el.close.toFixed(2))),
                borderColor: data.name === 'BTC' ? 'rgb(255, 153, 0)' : 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(255, 255, 255)',
            },
        ],
    };
    return _jsx(Line, { data: value, options: options, width: "100%", height: "20%" });
};
export default LineChart;
