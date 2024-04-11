"use client";

import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(...registerables);

export const TrainingStatusComparisonChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${url}/stats/training/count/status`);

      const test = [data.upcoming, data.submission, data.done];

      return test;
    },
  });

  useEffect(() => {
    setChartData({
      labels: ["For Submission", "Upcoming", "Done"],
      datasets: [
        {
          label: "Trainings",
          data: data!,
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
  }, [data]);

  return <Doughnut options={chartOptions} data={chartData} />;
};
