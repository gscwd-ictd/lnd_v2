"use client";

import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { ChartData, ChartOptions } from "@lms/utilities/types/chart";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chart, Chart as ChartJS, registerables } from "chart.js";
import { Suspense, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

// const BarChart = new Chart(ctx, {
//   data: {
//     datasets: [
//       {
//         label: " Tag A",
//         data: [1, 3, 2],
//         backgroundColor: ["rgb(190, 220, 227)", "rgb(190, 220, 227)", "rgb(190, 220, 227)"],
//         hoverOffset: 2,
//       },
//       {
//         label: "Tag B",
//         data: [4, 2, 15],
//         backgroundColor: ["rgb(20, 205, 200)", "rgb(20, 205, 200)", "rgb(20, 205, 200)"],
//         hoverOffset: 2,
//       },
//       {
//         label: "Tag C",
//         data: [11, 6, 1],
//         backgroundColor: ["rgb(65, 147, 169)", "rgb(65, 147, 169)", "rgb(65, 147, 169)"],
//         hoverOffset: 2,
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: false,
//         text: "Trainings 2024",
//       },
//     },
//   },
//   type: "bar",
// });

// export const CalendarChart = () => {
//   const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
//   const [chartOptions, setChartOptions] = useState<ChartOptions>({} as ChartOptions);

//   useEffect(() => {
//     setChartData({
//       labels: ["Office A", "Office B", "Office C"],
//       datasets: [
//         {
//           label: "Tag A",
//           data: [1, 3, 2],
//           backgroundColor: ["rgb(190, 220, 227)", "rgb(190, 220, 227)", "rgb(190, 220, 227)"],
//           hoverOffset: 2,
//         },
//         {
//           label: "Tag B",
//           data: [4, 2, 15],
//           backgroundColor: ["rgb(20, 205, 200)", "rgb(20, 205, 200)", "rgb(20, 205, 200)"],
//           hoverOffset: 2,
//         },
//         {
//           label: "Tag C",
//           data: [11, 6, 1],
//           backgroundColor: ["rgb(65, 147, 169)", "rgb(65, 147, 169)", "rgb(65, 147, 169)"],
//           hoverOffset: 2,
//         },
//       ],
//     });
//     setChartOptions({
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top" as const,
//         },
//         title: {
//           display: false,
//           text: "Trainings 2024",
//         },
//       },
//     });
//   }, []);

//   return <Bar options={chartOptions} data={chartData} />;
// };

type CountByDepartment = { department: string; code: string; count: number };

export const AcceptanceCountByDeptChart = () => {
  const [chartData, setChartData] = useState<ChartData>({ datasets: [], labels: ["test"] } as ChartData);
  const [chartOptions, setChartOptions] = useState({});

  useQuery({
    queryKey: ["test"],
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

  return <Bar options={chartOptions} data={chartData} />;
};
