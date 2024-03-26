import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useState } from "react";

type TrainingByLsp = {
  id: string;
  title: string;
  from: string;
  to: string;
  rating: number;
};

type Star = {
  first: { isActive: boolean };
  second: { isActive: boolean };
  third: { isActive: boolean };
  fourth: { isActive: boolean };
  fifth: { isActive: boolean };
};

export const useLspTrainingsDataTable = () => {
  const helper = createColumnHelper<TrainingByLsp>();

  const setStarDefault = () => {
    return {
      first: { isActive: false },
      second: { isActive: false },
      third: { isActive: false },
      fourth: { isActive: false },
      fifth: { isActive: false },
    };
  };

  const [star, setStar] = useState<Star>(setStarDefault);

  const columns = [
    helper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    helper.accessor("from", {
      header: "Date From",
      cell: (info) => dayjs(info.getValue()).format("MMMM DD, YYYY"),
    }),
    helper.accessor("to", {
      header: "Date To",
      cell: (info) => dayjs(info.getValue()).format("MMMM DD, YYYY"),
    }),
    helper.accessor("rating", {
      header: "Rating",

      cell: (info) => (
        <div className="flex gap-2">
          {/* ONE */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6  ${
                (info.getValue() as number) >= 1 ? "fill-amber-500" : "fill-gray-400"
              } text-black"`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* TWO */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6  ${
                (info.getValue() as number) >= 2 ? "fill-amber-500" : "fill-gray-400"
              } text-black"`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* THREE */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6  ${
                (info.getValue() as number) >= 3 ? "fill-amber-500" : "fill-gray-400"
              } text-black"`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* FOUR */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6  ${
                (info.getValue() as number) >= 4 ? "fill-amber-500" : "fill-gray-400"
              } text-black"`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* FIVE */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-6 h-6  ${
                (info.getValue() as number) >= 5 ? "fill-amber-500" : "fill-gray-400"
              } text-black"`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ),
    }),
  ];
  return { columns };
};
