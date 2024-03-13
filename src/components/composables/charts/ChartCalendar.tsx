"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export const CalendarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);
  const [labels, setLabels] = useState();

  useEffect(() => {
    setChartData({
      labels: ["Office A", "Office B", "Office C"],
      datasets: [
        {
          label: "Tag A",
          data: [1, 3, 2],
          backgroundColor: ["rgb(190, 220, 227)", "rgb(190, 220, 227)", "rgb(190, 220, 227)"],
          hoverOffset: 2,
        },
        {
          label: "Tag B",
          data: [4, 2, 15],
          backgroundColor: ["rgb(20, 205, 200)", "rgb(20, 205, 200)", "rgb(20, 205, 200)"],
          hoverOffset: 2,
        },
        {
          label: "Tag C",
          data: [11, 6, 1],
          backgroundColor: ["rgb(65, 147, 169)", "rgb(65, 147, 169)", "rgb(65, 147, 169)"],
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

  return <Bar options={chartOptions} data={chartData} />;
};
