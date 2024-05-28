// src/components/RevenueChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface RevenueChartProps {
  appointmentsRevenue: number;
  hospitalizationRevenue: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ appointmentsRevenue, hospitalizationRevenue }) => {
  const data = {
    labels: ['Appointments', 'Hospitalization'],
    datasets: [
      {
        label: 'Revenue',
        data: [appointmentsRevenue, hospitalizationRevenue],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Revenue Breakdown',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
