import { CardMiniStats } from "@lms/components/osprey/ui/card-mini-stats/view/CardMiniStats";
import { FunctionComponent } from "react";

export const CardTrainingsDone: FunctionComponent = () => {
  return (
    <CardMiniStats
      title="Total Trainings Done"
      className="shadow-sm"
      content="5"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          className="sm:w-10 sm:h-10 lg:w-14 lg:h-14 px-2 stroke-indigo-400 rounded-full hover:bg-gradient-to-r bg-gradient-to-tl from-indigo-800/90 via-indigo-500/90 to-indigo-800/90 fill-white shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      }
    />
  );
};
