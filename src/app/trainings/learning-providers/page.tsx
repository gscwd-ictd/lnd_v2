import { LspTabs } from "@lms/components/composables/lsp-tabs/LspTabs";
import { AddNewLspModal } from "../../../components/composables/lsp-modal/AddNewLspModal";
import { BreadCrumbs } from "@lms/components/osprey/ui/breadcrumbs/view/BreadCrumbs";

export default function LearningProviders() {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <AddNewLspModal />

        <BreadCrumbs // left-to-right
          crumbs={[
            { layerText: "Trainings", path: "/trainings/notice" },
            { layerText: "Providers", path: "" },
          ]}
        />
      </div>

      {/* <LspDataTable /> */}
      <LspTabs />
    </div>
  );
}
