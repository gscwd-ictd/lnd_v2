"use client";

import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { ChartData } from "@lms/utilities/types/chart";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

type CountByDepartment = { department: string; code: string; count: number };

export const AcceptanceCountByDeptChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["count-accepted-nominees"],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/stats/nominees/count/accepted`);
      return data;
    },
    onSuccess: (data: { totalCountByDepartment: Array<CountByDepartment> }) => {
      setChartData({
        labels: data.totalCountByDepartment.map((total: CountByDepartment) => {
          return total.code;
        }),
        datasets: [
          {
            label: "",
            data: data.totalCountByDepartment.map((total) => {
              return total.count;
            }),
            backgroundColor: ["rgb(65, 147, 169)"],
            hoverOffset: 2,
          },
        ],

        // label: string, data:Array<number>,backgroundColor: Array<string>, hoverOffset: number
      });
      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
            labels: {
              boxWidth: 0,
            },
          },
          title: {
            display: false,
            text: "Trainings 2024",
          },
        },
      });
    },
    onError: async () => {
      setChartData({
        labels: [],
        datasets: [
          {
            label: "Accepted",
            data: [],
            backgroundColor: ["rgb(65, 147, 169)"],
            hoverOffset: 2,
          },
        ],

        // label: string, data:Array<number>,backgroundColor: Array<string>, hoverOffset: number
      });
      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
            labels: {
              boxWidth: 0,
            },
          },
          title: {
            display: false,
            text: "Accepted Trainings by Department",
          },
        },
      });
    },
  });

  if (isLoading) return <Spinner size="large" borderSize={2} />;
  if (isError) return <>ERROR FETCHING</>;

  return <Bar options={chartOptions} data={chartData} />;
};
