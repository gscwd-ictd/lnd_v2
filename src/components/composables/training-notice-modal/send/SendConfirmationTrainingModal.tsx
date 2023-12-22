import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useTrainingNoticeDataTable } from "../../training-notice-data-table/hooks/use-training-notice-data-table";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import {
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";

type ToastType = {
  color: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content: string;
};

export const SendConfirmationTrainingModal: FunctionComponent = () => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const id = useTrainingNoticeStore((state) => state.id);
  const trainingNoticeId = useTrainingNoticeStore((state) => state.id);
  const courseContent = useTrainingNoticeStore((state) => state.courseContent);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);
  const selectedTrainingDesign = useTrainingNoticeStore((state) => state.selectedTrainingDesign);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const numberOfHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const slotDistribution = useTrainingNoticeStore((state) => state.slotDistribution);
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const location = useTrainingNoticeStore((state) => state.location);
  const bucketFiles = useTrainingNoticeStore((state) => state.bucketFiles);

  const {
    sendConfirmationModalIsOpen,
    setSendModalIsOpen,
    setConfirmCompleteModalIsOpen,
    setSendConfirmationModalIsOpen,
  } = useContext(TrainingNoticeContext);

  // toast options
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const queryClient = useQueryClient();

  const internalTrainingMutation = useMutation({
    onSuccess: async () => {
      setToastOptions("success", "Success", "Successfully sent to all managers!");
      setConfirmCompleteModalIsOpen(false);
      setSendConfirmationModalIsOpen(false);
      setSendModalIsOpen(false);
      const getUpdatedTrainingNotice = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedTrainingNotice.data.items);
    },
    onError: (error) => {
      setToastOptions("danger", "Error", `There is a problem with the request: ${error}`);
      // console.log(error);
    },
    mutationFn: async () => {
      const response = await axios.patch(`${url}/training-notices/internal`, {
        id,
        source: { id: selectedTrainingSource.id }, // updated
        trainingDesign: { id: selectedTrainingDesign.id },
        type: selectedTrainingType,
        courseContent,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id };
        }),
        location,
        slotDistribution: slotDistribution.map((slot) => {
          const employees = slot.employees.map((emp) => {
            return { employeeId: emp.employeeId };
          });

          return {
            supervisor: { supervisorId: slot.supervisor.supervisorId },
            numberOfSlots: slot.numberOfSlots,
            employees,
          };
        }),
        trainingStart: from,
        trainingEnd: to,
        numberOfHours,
        // deadlineForSubmission: dayjs().add(3, "day"),
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { id: tag.id };
        }),

        trainingRequirements,
      });

      return response.data;
    },
  });

  const externalTrainingMutation = useMutation({
    onSuccess: async () => {
      setToastOptions("success", "Success", "Successfully sent to all managers!");
      setConfirmCompleteModalIsOpen(false);
      setSendConfirmationModalIsOpen(false);
      setSendModalIsOpen(false);
      const getUpdatedTrainingNotice = await axios.get(`${url}/training-details?page=1&limit=1000`);

      queryClient.setQueryData(["training-notice"], getUpdatedTrainingNotice.data.items);
    },
    onError: (error) => {
      setToastOptions("danger", "Error", `There is a problem with the request: ${error}`);
      // console.log(error);
    },
    mutationFn: async () => {
      const response = await axios.patch(`${url}/training-notices/external`, {
        id,
        source: { id: selectedTrainingSource.id },
        // trainingDesign: selectedTrainingDesign?.id,
        type: selectedTrainingType,
        courseTitle,
        courseContent,
        trainingLspDetails: selectedFacilitators.map((faci) => {
          return { id: faci.id };
        }),
        location,
        bucketFiles,
        slotDistribution: slotDistribution.map((slot) => {
          const employees = slot.employees.map((emp) => {
            return { employeeId: emp.employeeId };
          });

          return {
            supervisor: { supervisorId: slot.supervisor.supervisorId },
            numberOfSlots: slot.numberOfSlots,
            employees,
          };
        }),
        trainingStart: from,
        trainingEnd: to,
        numberOfHours,
        // deadlineForSubmission: dayjs().add(3, "day"),
        numberOfParticipants,
        trainingTags: selectedTags.map((tag) => {
          return { id: tag.id };
        }),

        trainingRequirements,
      });

      return response.data;
    },
  });

  const handleSend = () => {
    if (selectedTrainingSource.name === "Internal") internalTrainingMutation.mutate();
    else if (selectedTrainingSource.name === "External") externalTrainingMutation.mutate();
  };

  return (
    <>
      <Modal
        isOpen={sendConfirmationModalIsOpen}
        setIsOpen={setSendConfirmationModalIsOpen}
        size="sm"
        animate={false}
        center
        isStatic
        withCloseBtn={false}
      >
        <ModalContent>
          <ModalContent.Title>
            <header className="pl-2">
              {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Action Needed</h3>
              </div>
            </header>
          </ModalContent.Title>

          <ModalContent.Body>
            <main className="px-2 space-y-4">
              {/* <TrainingRecommendations /> */}
              Send to All Managers?
            </main>
          </ModalContent.Body>

          <ModalContent.Footer>
            <div className="px-2 pt-2 pb-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button
                  size="small"
                  className="w-[5rem]"
                  type="button"
                  // onClick={() => setSendConfirmationModalIsOpen(true)}
                  onClick={handleSend}
                >
                  <span className="uppercase">Yes</span>
                </Button>
                <Button
                  size="small"
                  className="w-[5rem]"
                  variant="white"
                  onClick={() => {
                    setSendConfirmationModalIsOpen(false);
                  }}
                >
                  <span className="uppercase">No</span>
                </Button>
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <Toast
        duration={5000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
