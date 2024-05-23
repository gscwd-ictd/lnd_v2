"use client";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from "react";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { useLspTrainingsDataTable } from "../hooks/use-lsp-trainings-data-table";
import { LspSource, useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { TrainingOrgLspRatingContext } from "../../lsp-data-table/OrganizationLspDataTable";
import { url } from "@lms/utilities/url/api-url";
import { isEmpty } from "lodash";
import { useOrganizationLspDataTable } from "../../lsp-data-table/hooks/use-organization-lsp-data-table";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ViewTrainingsByLspModalProps = {
  id: string;
  trainingIsOpen: boolean;
  setTrainingIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ViewOrgTrainingsByLspModal: FunctionComponent<ViewTrainingsByLspModalProps> = ({
  setTrainingIsOpen,
  trainingIsOpen,
}) => {
  const { columns } = useLspTrainingsDataTable();
  const name = useLspDetailsStore((state) => state.name);
  const { setRatingIsOpen, setRating } = useContext(TrainingOrgLspRatingContext);
  const id = useLspDetailsStore((state) => state.id);
  const setId = useLspDetailsStore((state) => state.setId);
  const setTrainingId = useTrainingNoticeStore((state) => state.setId);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const setCourseContent = useTrainingNoticeStore((state) => state.setCourseContent);
  const setStatus = useTrainingNoticeStore((state) => state.setStatus);
  const setLspSource = useTrainingNoticeStore((state) => state.setLspSource);

  const { data: averageRating } = useQuery({
    queryKey: ["average-rating-by-lsp-id", id],
    enabled: !!id,
    queryFn: async () => {
      const getAverageRatingByLspId = await axios.get(`${url}/lsp/${id}/rating/average`);
      return getAverageRatingByLspId;
    },
  });

  return (
    <>
      <Modal
        isOpen={trainingIsOpen}
        setIsOpen={setTrainingIsOpen}
        size="xl"
        animate={false}
        isStatic
        onClose={() => {
          // setId(null);
          setId("");
          reset();
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="px-2">
              <h3 className="font-sans text-xl font-medium">Trainings by {name}</h3>
              {averageRating?.data?.average !== null ? (
                <div className="flex justify-start">
                  <div className="font-medium text-gray-500">
                    Average Rating:{" "}
                    <span
                      className={
                        averageRating?.data?.average > 0 && averageRating?.data?.average <= 1
                          ? "text-red-600"
                          : averageRating?.data?.average > 1 && averageRating?.data?.average <= 2
                          ? "text-orange-700"
                          : averageRating?.data?.average > 2 && averageRating?.data?.average <= 3
                          ? "text-amber-500"
                          : averageRating?.data?.average > 3 && averageRating?.data?.average <= 4
                          ? "text-yellow-600"
                          : averageRating?.data?.average > 4 && averageRating?.data?.average <= 5
                          ? "text-green-600"
                          : "text-emerald-600"
                      }
                    >
                      {averageRating?.data?.average}
                    </span>
                  </div>
                </div>
              ) : (
                <div className=" flex justify-start">
                  <div className="font-medium text-gray-800">No trainings done</div>
                </div>
              )}
            </header>
          </ModalContent.Title>

          {id ? (
            <>
              <DataTable
                columns={columns}
                datasource={`${url}/lsp/${id}/rating`}
                // datasource={`${url}/lsp/q?type=individual&page=1&limit=40`}
                // datasource={`${process.env.NEXT_PUBLIC_LND_FE_URL}/api/test-lsp-trainings`}
                queryKey={["lsp-trainings", id!]}
                // title=""

                onRowClick={(row) => {
                  // setId(row.original.id);
                  setTrainingId(row.original.id);
                  setRatingIsOpen(true);
                  setRating(row.original.rating ?? 0);

                  setCourseContent(row.original.courseContent);
                  setLocation(row.original.location);
                  setNumberOfHours(row.original.numberOfHours);
                  setCourseTitle(row.original.courseTitle);
                  setNumberOfParticipants(row.original.numberOfParticipants);
                  setStatus(row.original.status);
                  setTrainingEnd(dayjs(row.original.trainingEnd).format("YYYY-MM-DD"));
                  setSelectedTags(row.original.trainingTags);
                  setSelectedFacilitators(row.original.trainingLspDetails);
                  setTrainingStart(dayjs(row.original.trainingStart).format("YYYY-MM-DD"));
                  setLspSource(row.original.source === "External" ? LspSource.EXTERNAL : LspSource.INTERNAL);
                }}
              />
            </>
          ) : (
            <Spinner />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
