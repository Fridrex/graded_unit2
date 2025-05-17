import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'BPC/BTC Exchange Rate',
    },
  },
};

const labels = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'];

export const data = {
  labels,
  datasets: [
    {
      label: 'BPC/BTC',
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: 'rgb(99, 255, 182)',
      backgroundColor: 'rgba(99, 255, 143, 0.5)',
    },
  ],
};

const Chart = () => {
  return <Line options={options} data={data} />;
};

export default Chart;
