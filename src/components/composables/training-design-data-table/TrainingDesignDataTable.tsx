"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { TrainingDesign } from "@lms/lib/types/training-design.type";
import { FunctionComponent, useState } from "react";
import { useTrainingDesignDataTable } from "./hooks/use-training-design-data-table";
import { url } from "@lms/utilities/url/api-url";
import { DeleteTrainingDesignDialog } from "../training-design/modal/DeleteTrainingDesignDialog";

export const TrainingDesignDataTable: FunctionComponent = () => {
  const { columns, trainingDesignId, remove, setRemove } = useTrainingDesignDataTable();

  return (
    <>
      <DataTable<TrainingDesign>
        datasource={`${url}/training-designs`}
        columns={columns}
        queryKey={["training_designs"]}
        title="Training Design"
        subtitle="Training design and other details for the upcoming training programs"
      />
      <DeleteTrainingDesignDialog id={trainingDesignId!} remove={remove} setRemove={setRemove} />
    </>
  );
};
