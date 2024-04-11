"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(...registerables);

export const AcceptanceDeclineRateChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${url}/stats/nominees/count/accepted`);
    },
  });

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
