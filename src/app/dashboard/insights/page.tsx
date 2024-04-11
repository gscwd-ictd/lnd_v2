import { CardApprovedBenchmarking } from "@lms/components/composables/cards/CardApprovedBenchmarking";
import { CardApprovedOtherActivities } from "@lms/components/composables/cards/CardApprovedOtherActivities";
import { CardEmployee } from "@lms/components/composables/cards/CardEmployee";
import { CardTrainingsDone } from "@lms/components/composables/cards/CardTrainingsDone";
import { AcceptanceDeclineRateChart } from "@lms/components/composables/charts/ChartAcceptanceDecline";
import { AcceptanceCountByDeptChart } from "@lms/components/composables/charts/AcceptanceCountByDeptChart";
import { TrainingStatusComparisonChart } from "@lms/components/composables/charts/ChartTrainingStatus";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import { Card } from "@lms/components/osprey/ui/card/view/Card";
import { TrainingCalendar } from "@lms/components/osprey/ui/calendar/TrainingCalendar";

export default function DashboardInsights() {
  return (
    <div className="w-full p-2 sm:px-0 md:px-0">
      <div className="p-5">
        <div className="flex justify-end items-center  text-sm">
          <BreadCrumbs crumbs={[{ layerText: "Dashboard", path: "" }]} />
        </div>
      </div>
      <div className="gap-4 lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col p-6">
        <section className="sm:w-full md:w-full lg:w-[30%] flex flex-col gap-4">
          <CardEmployee />
          <Card className="flex min-h-[20rem] p-7 ">
            <span className="text-slate-700 font-medium tracking-wide">Calendar of Trainings</span>
            {/* <div className="items-center flex h-full justify-center text-gray-500 uppercase">
              No data to be displayed
            </div> */}
            <TrainingCalendar />
            {/* <CalendarChart /> */}
          </Card>
        </section>
        <section className="flex flex-col gap-4 sm:w-full lg:w-[70%] h-full">
          <div className="w-full grid-cols-3 gap-4 sm:flex sm:flex-col lg:flex lg:flex-row">
            <CardTrainingsDone />
            <CardApprovedBenchmarking />
            <CardApprovedOtherActivities />
          </div>
          <Card className="flex items-center justify-center min-h-[20rem] max-h-[33rem]  p-10">
            <span className="text-gray-600 font-sans tracking-wide">Accepted Trainings by Department</span>
            <AcceptanceCountByDeptChart />
          </Card>
        </section>
      </div>

      <div className="grid sm:grid-rows-2 lg:grid-cols-2 w-full gap-4 px-6">
        <Card className="flex items-center justify-center h-[30rem] p-10 ">
          <span className="text-gray-600 font-sans tracking-wide">Trainings Conducted</span>
          <TrainingStatusComparisonChart />
        </Card>

        <Card className="flex items-center justify-center h-[30rem] p-10">
          <span className="text-gray-600 font-sans tracking-wide">Employee Acceptance Rate</span>
          <AcceptanceDeclineRateChart />
        </Card>
      </div>
    </div>
  );
}
