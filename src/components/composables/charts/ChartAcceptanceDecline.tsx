"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

export const AcceptanceDeclineRateChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  useEffect(() => {
    setChartData({
      labels: ["Accepted", "Declined"],
      datasets: [
        {
          data: [12, 2],
          backgroundColor: ["rgb(20, 205, 200)", "rgb(186, 228, 229)"],
          hoverOffset: 4,
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
          text: "Employee Acceptance Rate 2024",
        },
      },
    });
  }, []);

  return <Pie options={chartOptions} data={chartData} />;
};
