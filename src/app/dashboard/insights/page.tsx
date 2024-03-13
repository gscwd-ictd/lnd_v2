import { CardApprovedBenchmarking } from "@lms/components/composables/cards/CardApprovedBenchmarking";
import { CardApprovedOtherActivities } from "@lms/components/composables/cards/CardApprovedOtherActivities";
import { CardEmployee } from "@lms/components/composables/cards/CardEmployee";
import { CardTrainingsDone } from "@lms/components/composables/cards/CardTrainingsDone";
import { AcceptanceDeclineRateChart } from "@lms/components/composables/charts/ChartAcceptanceDecline";
import { CalendarChart } from "@lms/components/composables/charts/ChartCalendar";
import { TrainingStatusComparisonChart } from "@lms/components/composables/charts/ChartTrainingStatus";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import { Card } from "@lms/components/osprey/ui/card/view/Card";

export default function DashboardInsights() {
  return (
    <div className="w-full p-2 sm:px-0 md:px-0">
      <div className="p-5"></div>
      <div className="gap-4 lg:flex lg:flex-row md:flex md:flex-col sm:flex sm:flex-col p-6">
        <section className="sm:w-full md:w-full lg:w-[30%] flex flex-col gap-4">
          <CardEmployee />
          <Card className="flex items-center justify-center h-[20rem] p-10 ">
            <span className="text-gray-600 font-sans tracking-wide">Training Tags</span>
            <CalendarChart />
          </Card>
        </section>
        <section className="flex flex-col gap-4 sm:w-full lg:w-[70%] h-full">
          <div className="w-full grid-cols-3 gap-4 sm:flex sm:flex-col lg:flex lg:flex-row">
            <CardTrainingsDone />
            <CardApprovedBenchmarking />
            <CardApprovedOtherActivities />
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <Card className="flex items-center justify-center h-[30rem] p-10 ">
              <span className="text-gray-600 font-sans tracking-wide">Trainings Conducted</span>
              <TrainingStatusComparisonChart />
            </Card>

            <Card className="flex items-center justify-center h-[30rem] p-10">
              <span className="text-gray-600 font-sans tracking-wide">Employee Acceptance</span>
              <AcceptanceDeclineRateChart />
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
