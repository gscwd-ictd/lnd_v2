"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(...registerables);

export const TrainingStatusComparisonChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  useEffect(() => {
    setChartData({
      labels: ["For Submission", "Upcoming", "Done"],
      datasets: [
        {
          label: "Trainings",
          data: [12, 9, 17],
          backgroundColor: ["rgb(190, 220, 227)", "rgb(65, 147, 169)", "rgb(20, 205, 200)"],
          hoverOffset: 2,
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: false,
          text: "Trainings 2024",
        },
      },
    });
  }, []);

  return <Doughnut options={chartOptions} data={chartData} />;
};
