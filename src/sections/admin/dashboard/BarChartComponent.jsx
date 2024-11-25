import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = () => {
     const stackedChartData = {
          labels: ['Dự án 1', 'Dự án 2', 'Dự án 3', 'Dự án 4', 'Dự án 5', 'Dự án 6', 'Dự án 7', 'Dự án 8'],
          datasets: [
               {
                    label: 'Đã gửi',
                    data: [5, 6, 2, 3, 1, 4, 2, 3],
                    backgroundColor: '#808080',
               },
               {
                    label: 'Đang thực hiện',
                    data: [4, 5, 1, 2, 3, 3, 2, 1],
                    backgroundColor: '#0000ff',
               },
               {
                    label: 'Xem xét',
                    data: [2, 3, 1, 2, 2, 1, 3, 2],
                    backgroundColor: '#ffcc00',
               },
               {
                    label: 'Hoàn thành',
                    data: [1, 5, 2, 3, 4, 3, 4, 2],
                    backgroundColor: '#00ff00',
               },
          ],
     };

     const stackedChartOptions = {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          scales: {
               x: {
                    beginAtZero: true,
               },
               y: {
                    beginAtZero: true,
               },
          },
          plugins: {
               legend: {
                    position: 'top',
               },
          },
          stacked: true,
     };

     return (
          <div>
               <Bar data={stackedChartData} options={stackedChartOptions} />
          </div>
     );
};

export default BarChartComponent;
