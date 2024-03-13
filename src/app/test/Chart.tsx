"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(...registerables);

export const AcceptanceDeclineRateChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  useEffect(() => {
    setChartData({
      labels: ["Accepted", "Declined"],
      datasets: [
        {
          label: "Acceptance vs Decline Rate",
          data: [12, 2],

          backgroundColor: ["rgb(159, 90, 253)", "rgb(175, 65, 84)"],
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
          display: true,
          text: "Employee Acceptance Rate 2024",
        },
      },
    });
  }, []);

  return <Doughnut options={chartOptions} data={chartData} />;
};
