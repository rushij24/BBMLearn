import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { cn } from '../lib/utils';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

interface SkillMatrixProps {
  skills: {
    category: string;
    skills: Array<{
      name: string;
      level: number;
    }>;
  }[];
}

const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills }) => {
  // Process skills data for the radar chart
  const categories = skills.map(category => category.category);
  
  // Calculate average skill level for each category
  const categoryAverages = skills.map(category => {
    const sum = category.skills.reduce((acc, skill) => acc + skill.level, 0);
    return Math.round(sum / category.skills.length);
  });

  const data = {
    labels: categories,
    datasets: [
      {
        data: categoryAverages,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 0.8)',
        pointBackgroundColor: 'rgba(99, 102, 241, 0.8)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          backdropColor: 'transparent',
          font: {
            family: 'Inter, sans-serif',
            size: 8,
          },
          stepSize: 20,
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          family: 'Inter, sans-serif',
          size: 12,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 11,
        },
        padding: 5,
        boxPadding: 2,
        callbacks: {
          label: (context: any) => {
            return `Score: ${context.raw}%`;
          }
        }
      },
    },
  };

  return (
    <div className={cn("flex justify-center items-center")}>
      <div className={cn("")}>
        <Radar data={data} options={options} height={320} width={320}  />
      </div>
    </div>
  );
};

export default SkillMatrix; 