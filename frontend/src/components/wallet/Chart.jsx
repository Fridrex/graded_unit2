/**
 * @file Chart.jsx
 * @description A component that renders a line chart using react-chartjs-2.
 * It displays a simulated exchange rate for BPC/BTC over several months.
 * Data is currently generated using faker.js for demonstration.
 */

import {
  Chart as ChartJS, // Core Chart.js library
  CategoryScale, // For categorical x-axes (e.g., months)
  LinearScale, // For numerical y-axes
  PointElement, // For drawing points on the line
  LineElement, // For drawing the line itself
  Title, // For the chart title
  Tooltip, // For displaying tooltips on hover
  Legend, // For the chart legend
} from 'chart.js';
import { Line } from 'react-chartjs-2'; // Line chart component from react-chartjs-2
import { faker } from '@faker-js/faker'; // Library to generate fake data

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

/**
 * @constant options
 * @description Configuration options for the line chart.
 * - `responsive`: Makes the chart responsive to container size.
 * - `plugins`: Configuration for chart plugins like legend and title.
 * @type {object}
 */
export const options = {
  responsive: true, // Chart will resize with its container
  plugins: {
    legend: {
      position: 'top', // Position of the legend (e.g., 'top', 'bottom', 'left', 'right')
    },
    title: {
      display: true, // Show the chart title
      text: 'BPC/BTC Exchange Rate (Simulated)', // Text for the chart title
      font: {
        // Optional: customize title font
        size: 16,
      },
    },
  },
  scales: {
    // Optional: customize scales
    y: {
      beginAtZero: true, // Start y-axis at 0
      title: {
        display: true,
        text: 'BTC per BPC', // Y-axis title
      },
    },
    x: {
      title: {
        display: true,
        text: 'Month', // X-axis title
      },
    },
  },
};

// Labels for the x-axis (months)
const labels = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'];

/**
 * @constant data
 * @description Data object for the line chart.
 * - `labels`: The labels for the x-axis.
 * - `datasets`: An array of dataset objects, each representing a line on the chart.
 * - `label`: The name of the dataset (appears in legend and tooltip).
 * - `data`: An array of numerical data points corresponding to the labels.
 * Here, it's generated randomly using faker.js.
 * - `borderColor`: Color of the line.
 * - `backgroundColor`: Fill color under the line (with alpha for transparency).
 * @type {object}
 */
export const data = {
  labels, // X-axis labels (months)
  datasets: [
    {
      label: 'BPC/BTC', // Name of this dataset
      // Generate random integer data for each label
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: 'rgb(99, 255, 182)', // Line color
      backgroundColor: 'rgba(99, 255, 143, 0.5)', // Fill color under the line
      tension: 0.1, // Optional: line tension for curve smoothness
    },
    // Example of a second dataset if needed:
    // {
    //   label: 'Another Metric',
    //   data: labels.map(() => faker.number.int({ min: 0, max: 800 })),
    //   borderColor: 'rgb(255, 99, 132)',
    //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
    // },
  ],
};

/**
 * @function Chart
 * @description A simple functional component that renders the Line chart
 * with the predefined options and data.
 * @returns {JSX.Element} The Line chart component.
 */
const Chart = () => {
  // Renders the Line chart component from react-chartjs-2
  return <Line options={options} data={data} />;
};

export default Chart;
