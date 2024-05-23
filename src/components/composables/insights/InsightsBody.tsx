"use client";
import { Card } from "@lms/components/osprey/ui/card/view/Card";
import { CardEmployee } from "../cards/CardEmployee";
import { TrainingCalendar } from "@lms/components/osprey/ui/calendar/TrainingCalendar";
import { CardTrainingsDone } from "../cards/CardTrainingsDone";
import { CardDoneBenchmarking } from "../cards/CardDoneBenchmarking";
import { CardDoneOtherTraining } from "../cards/CardDoneOtherTraining";
import { AcceptanceCountByDeptChart } from "../charts/AcceptanceCountByDeptChart";
import { FunctionComponent } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const InsightsBody: FunctionComponent = () => {
  const { data: allTrainings } = useQuery({
    queryKey: ["get-all-trainings-done"],
    queryFn: async () => {
      const getAllTrainings = await axios.get(`${url}/stats/count/all`, { withCredentials: true });
      return getAllTrainings;
    },
  });
  return (
    <>
      <div className="gap-2 lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col w-full flex">
        <section className="sm:w-full md:w-full lg:w-1/3 flex flex-col gap-2">
          <CardEmployee />
          <Card className="h-[23.2rem] p-7 bg-white ">
            <span className="text-slate-700 font-medium tracking-wide text-center w-full">Calendar of Trainings</span>
            <TrainingCalendar />
          </Card>
        </section>
        <section className="flex flex-col gap-2 sm:w-full lg:w-2/3 h-full">
          <div className="w-full grid-cols-3 gap-2 sm:flex sm:flex-col lg:flex lg:flex-row">
            <CardTrainingsDone value={allTrainings?.data ? allTrainings?.data.training : <Spinner size="xs" />} />
            <CardDoneBenchmarking value={allTrainings?.data ? allTrainings?.data.benchmark : <Spinner size="xs" />} />
            <CardDoneOtherTraining
              value={allTrainings?.data ? allTrainings?.data.otherTraining : <Spinner size="xs" />}
            />
          </div>
          <Card className="flex items-center justify-center h-[33rem] p-10 bg-white">
            <span className="text-gray-600 font-sans tracking-wide">Accepted Trainings by Department</span>
            <AcceptanceCountByDeptChart />
          </Card>
        </section>
      </div>
    </>
  );
};
