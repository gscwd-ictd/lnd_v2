import { AcceptanceDeclineRateChart } from "@lms/components/composables/charts/ChartAcceptanceDecline";
import { TrainingStatusComparisonChart } from "@lms/components/composables/charts/ChartTrainingStatus";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import { Card } from "@lms/components/osprey/ui/card/view/Card";
import { InsightsBody } from "@lms/components/composables/insights/InsightsBody";
import { LspRankings } from "@lms/components/composables/insights/LspRankings";

export default function DashboardInsights() {
  return (
    <div className="w-full p-2 sm:px-0 md:px-0">
      <div className="p-5">
        <div className="flex justify-end items-center  text-sm">
          <BreadCrumbs crumbs={[{ layerText: "Dashboard", path: "" }]} />
        </div>
      </div>
      <InsightsBody />

      <div className="grid sm:grid-rows-2 lg:grid-cols-3 w-full gap-4 px-6">
        <Card className="flex items-center justify-center h-[30rem] px-8 py-10">
          <span className="text-gray-600 font-sans tracking-wide  ">LSP Rankings</span>
          <LspRankings />
        </Card>

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
