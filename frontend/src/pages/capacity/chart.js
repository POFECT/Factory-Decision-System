import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(...registerables);

const RadarChart = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Sample Dataset 1',
        data: [10, 20, 15, 25, 30],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };
  const data2 = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Sample Dataset 2',
        data: [11, 21, 23, 24, 3],
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: 'radar',
    data: {
      labels: data.labels,
      datasets: [...data.datasets, ...data2.datasets],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Radar Chart',
        },
      },
      animation: {
        duration: 2000,
        easing: 'easeInOutQuart',
      },
    },
  };

  return <Radar data={config.data} options={config.options} />;
};

export default RadarChart;
