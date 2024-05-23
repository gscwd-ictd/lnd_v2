import { AcceptanceDeclineRateChart } from "@lms/components/composables/charts/ChartAcceptanceDecline";
import { TrainingStatusComparisonChart } from "@lms/components/composables/charts/ChartTrainingStatus";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";
import { Card } from "@lms/components/osprey/ui/card/view/Card";
import { InsightsBody } from "@lms/components/composables/insights/InsightsBody";
import { LspRankings } from "@lms/components/composables/insights/LspRankings";

export default function DashboardInsights() {
  return (
    <div className="w-full p-2 sm:px-2 md:px-2 lg:px-6 gap-2 flex flex-col">
      <section className="p-6">
        <div className="flex justify-end items-center  text-sm">
          <BreadCrumbs crumbs={[{ layerText: "Dashboard", path: "" }]} />
        </div>
      </section>

      {/* Top part */}
      <InsightsBody />

      <section className="grid sm:grid-rows-2 lg:grid-cols-3 w-full gap-2">
        <Card className="flex items-center justify-center h-[30rem]  p-6 bg-white">
          <span className="text-gray-600 font-sans tracking-wide">Learning Service Provider Ranking</span>
          <LspRankings />
        </Card>

        <Card className="flex items-center justify-center h-[30rem] px-10 py-8 bg-white">
          <span className="text-gray-600 font-sans tracking-wide">Trainings Conducted</span>
          <TrainingStatusComparisonChart />
        </Card>

        <Card className="flex items-center justify-center h-[30rem] px-10 py-8 bg-white">
          <span className="text-gray-600 font-sans tracking-wide">Employee Acceptance Rate</span>
          <AcceptanceDeclineRateChart />
        </Card>
      </section>
    </div>
  );
}
