"use client";

import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

type DataProps = {
  accepted: number;
  declined: number;
};
ChartJS.register(...registerables);

export const AcceptanceDeclineRateChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

  const { data, isError, isLoading } = useQuery({
    retry: 2,
    queryKey: ["count-participants"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/stats/count/participants`);
      return data;
    },
    onSuccess: (rate: DataProps) => {
      setChartData({
        labels: ["Accepted", "Declined"],
        datasets: [
          {
            data: [rate.accepted, rate.declined],
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
    },
    onError: () => {
      setChartData({
        labels: ["Accepted", "Declined"],
        datasets: [
          {
            data: [0, 0],
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
    },
  });

  if (isLoading) return <Spinner size="large" borderSize={2} />;
  if (isError) return <>ERROR FETCHING</>;

  return <Pie options={chartOptions} data={chartData} />;
};
