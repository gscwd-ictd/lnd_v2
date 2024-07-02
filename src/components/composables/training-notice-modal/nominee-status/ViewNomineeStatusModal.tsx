import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import {
  TrainingNoticeContext,
  useTrainingNoticeToastOptions,
} from "../../training-notice-data-table/TrainingNoticeDataTable";
import { EmployeeWithSupervisor, TrainingNominationDetails, TrainingStatus } from "@lms/utilities/types/training";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { ViewNomineesDataTable } from "@lms/components/osprey/ui/local-table/data-table/view/ViewNomineesDataTable";
import {
  EmployeeSelectProps,
  Nominee,
  Supervisor,
  useViewNomineesStatusDataTable,
} from "./data-table/use-view-nominees-status-data-table";
import { ViewNominationStatusModal } from "./ViewNominationStatusModal";
import { HiCheckCircle, HiTag } from "react-icons/hi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { RevolvingDot } from "react-loader-spinner";

type SelectProp = {
  value: string;
  label: string;
};

type ViewNomineeState = {
  selectedStandInTrainee: SelectProp;
  setSelectedStandInTrainee: (selectedStandInTrainee: SelectProp) => void;
  viewDistributionModalIsOpen: boolean;
  setViewDistributionModalIsOpen: Dispatch<SetStateAction<boolean>>;
  nominationDetails: Array<TrainingNominationDetails>;
  setNominationDetails: Dispatch<SetStateAction<Array<TrainingNominationDetails>>>;
};

const ViewNomineesContext = createContext<ViewNomineeState>({} as ViewNomineeState);

export const ViewNomineeStatusModal: FunctionComponent = () => {
  const setTrainingId = useTrainingNoticeStore((state) => state.setId);

  const [availableSlots, setAvailableSlots] = useState<number>(0);
  const [initialAvailableSlots, setInitialAvailableSlots] = useState<number>(0);
  const [totalSlots, setTotalSlots] = useState<number>(0);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [nominationDetails, setNominationDetails] = useState<Array<TrainingNominationDetails>>([]);
  const [viewDistributionModalIsOpen, setViewDistributionModalIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const [selectedStandInTrainee, setSelectedStandInTrainee] = useState<SelectProp>({} as SelectProp);
  const [selectedSupervisor, setSelectedSupervisor] = useState<SelectProp>({} as SelectProp);
  const [selectedEmployees, setSelectedEmployees] = useState<Array<EmployeeSelectProps>>([]);

  const {
    columns,
    standInTrainees,
    reason,
    nominee,
    supervisor,
    supervisors,
    viewAuxModalIsOpen,
    confirmAddTraineesAlertIsOpen,
    viewAdditionalTraineesModalIsOpen,
    employees,
    acceptedEmployees,
    countEmployees,
    declinedEmployees,
    nominatedEmployees,
    setAcceptedEmployees,
    setCountEmployees,
    setDeclinedEmployees,
    setNominatedEmployees,
    setEmployees,
    setSupervisors,
    setViewAdditionalTraineesModalIsOpen,
    setConfirmAddAlertTraineesIsOpen,
    setViewAuxModalIsOpen,
    setReason,
    setSupervisor,
    setStandInTrainees,
    setNominee,
  } = useViewNomineesStatusDataTable();

  const { id, nomineeStatusIsOpen, setNomineeStatusIsOpen, setEmployeesWithStatus } = useContext(TrainingNoticeContext);
  const trainingId = useTrainingNoticeStore((state) => state.id);
  const status = useTrainingNoticeStore((state) => state.status);
  const setStatus = useTrainingNoticeStore((state) => state.setStatus);

  const { setToastOptions } = useTrainingNoticeToastOptions();

  // per training notice query
  const {
    isLoading,
    isFetching,
    data: trainingData,
  } = useQuery({
    queryKey: ["training-nominees", trainingId],
    enabled: nomineeStatusIsOpen !== false,
    staleTime: 2,
    retryOnMount: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,

    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}/nominees`);
      return data;
    },
    onSuccess: (data) => {
      setEmployeesWithStatus(
        data.nominees.sort((a: EmployeeWithSupervisor, b: EmployeeWithSupervisor) =>
          a.name! > b.name! ? -1 : a.name! < b.name! ? 1 : -1
        )
      );
      setAcceptedEmployees(data.countStatus.accepted);
      setDeclinedEmployees(data.countStatus.declined);
      setNominatedEmployees(data.countStatus.pending);
      setCountEmployees(data.numberOfParticipants);
    },
  });

  // get training status
  useQuery({
    queryKey: ["training-details", trainingId],
    enabled: nomineeStatusIsOpen !== false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}`);
      return data;
    },
    onSuccess: (data) => {
      setStatus(data.status);
    },
  });

  // find stand in nominees by distribution id
  useQuery({
    enabled: !!viewAuxModalIsOpen && !!supervisor.distributionId,
    queryKey: ["standin-nominees", supervisor.distributionId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/distributions/${supervisor.distributionId}/standin`);
      return data;
    },
    onSuccess: (data) => {
      setTotalSlots(data.slots);
      setInitialAvailableSlots(data.availableSlots);
      setAvailableSlots(data.availableSlots);
      setStandInTrainees(data.standin);
    },
    onError: () => {
      setTotalSlots(0);
      setAvailableSlots(0);
      setInitialAvailableSlots(0);
      setStandInTrainees([]);
    },
  });

  // find supervisors under training
  useQuery({
    refetchOnWindowFocus: false,
    enabled: !!viewAdditionalTraineesModalIsOpen && !!trainingId,
    queryKey: ["training-supervisors", trainingId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${trainingId}/distributions/supervisors`);
      return data;
    },
    onSuccess: async (data) => {
      setSupervisors(data.supervisors);
      setAvailableSlots(data.availableSlot);
      setInitialAvailableSlots(data.availableSlot);
    },
    onError: () => {
      setSupervisors([]);
    },
  });

  // find employees under supervisor for a specific training
  useQuery({
    enabled: !!viewAdditionalTraineesModalIsOpen && !!selectedSupervisor.value,
    queryKey: ["training-employees", trainingId, selectedSupervisor.value],
    queryFn: async () => {
      const { data } = await axios.get(
        `${url}/training/${trainingId}/distributions/supervisors/${selectedSupervisor.value}`
      );
      return data;
    },
    onSuccess: (data) => {
      setEmployees(data);
    },
    onError: () => setEmployees([]),
  });

  // submit stand in
  const standInMutation = useMutation({
    mutationFn: async () => {
      const newNomineeFromStandin = await axios.post(
        `${url}/training/distributions/standin`,
        {
          nomineeId: nominee.nomineeId,
          standinId: selectedStandInTrainee.value,
        },
        { withCredentials: true }
      );

      return newNomineeFromStandin;
    },
    onSuccess: async () => {
      setToastOptions("success", "Success", "You have swapped an auxiliary to a nominee.");

      // fetch the updated table of nominees per training
      const getUpdatedViewNominees = await axios.get(`${url}/training/${trainingId}/nominees`);
      setAcceptedEmployees(getUpdatedViewNominees.data.countStatus.accepted);
      setDeclinedEmployees(getUpdatedViewNominees.data.countStatus.declined);
      setNominatedEmployees(getUpdatedViewNominees.data.countStatus.pending);
      setCountEmployees(getUpdatedViewNominees.data.numberOfParticipants);
      queryClient.setQueryData(["training-nominees", trainingId], getUpdatedViewNominees.data.nominees);
      queryClient.setQueryData(["view-training-nominees-table", trainingId], getUpdatedViewNominees.data.nominees);

      const getUpdatedStandinNominees = await axios.get(
        `${url}/training/distributions/${supervisor.distributionId}/standin`
      );
      // queryClient.setQueryData(['standin-nominees',supervisor.distributionId],getUpdatedStandinNominees.data)
      setStandInTrainees(getUpdatedStandinNominees.data.standin);
      setSelectedStandInTrainee({ label: "", value: "" });
      setLoading(true);

      setViewAuxModalIsOpen(false);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again in a few seconds.");
    },
  });

  // submit additional trainees mutation
  const addtlTraineesMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${url}/training/additional-trainees`, {
        trainingId,
        supervisorId: selectedSupervisor.value,
        employees: selectedEmployees.map((employee) => {
          return { employeeId: employee.value.employeeId };
        }),
      });

      return data;
    },
    onSuccess: async () => {
      // get and set new data table details
      const getUpdatedTrainingNomineeDetails = await axios.get(`${url}/training/${trainingId}/nominees`);
      queryClient.setQueryData(["training-nominees", trainingId], getUpdatedTrainingNomineeDetails.data.nominees);
      queryClient.setQueryData(
        ["view-training-nominees-table", trainingId],
        getUpdatedTrainingNomineeDetails.data.nominees
      );

      setEmployeesWithStatus(
        getUpdatedTrainingNomineeDetails.data.nominees.sort((a: EmployeeWithSupervisor, b: EmployeeWithSupervisor) =>
          a.name! > b.name! ? -1 : a.name! < b.name! ? 1 : -1
        )
      );
      setAcceptedEmployees(getUpdatedTrainingNomineeDetails.data.countStatus.accepted);
      setDeclinedEmployees(getUpdatedTrainingNomineeDetails.data.countStatus.declined);
      setNominatedEmployees(getUpdatedTrainingNomineeDetails.data.countStatus.pending);
      setCountEmployees(getUpdatedTrainingNomineeDetails.data.numberOfParticipants);

      // close modal
      setConfirmAddAlertTraineesIsOpen(false);
      setViewAdditionalTraineesModalIsOpen(false);
      setSelectedSupervisor({ label: "", value: "" });
      setSelectedEmployees([]);
      setToastOptions("success", "Success", "You have added new trainees for this training");
    },
    onError: () => {
      setConfirmAddAlertTraineesIsOpen(false);
      setToastOptions("danger", "Error", "Something went wrong. Please try again in a few seconds");
    },
  });

  // on change employees
  const onChangeEmployees = (value: MultiValue<EmployeeSelectProps>, actionTypes: ActionMeta<EmployeeSelectProps>) => {
    setSelectedEmployees(
      value.map((employee) => {
        return { value: employee.value, label: employee.label };
      })
    );
    if (actionTypes.action === "remove-value") setAvailableSlots((currentSlots) => currentSlots + 1);
    else if (actionTypes.action === "select-option") setAvailableSlots((currentSlots) => currentSlots - 1);

    if (actionTypes.action === "clear") {
      setSelectedEmployees([]);
      setAvailableSlots(initialAvailableSlots);
    }
  };

  // on change supervisor
  const onChangeSupervisor = (value: SingleValue<SelectProp>, actionTypes: ActionMeta<SelectProp>) => {
    setSelectedSupervisor({ label: value?.label!, value: value?.value! });
    setLoading(true);
    if (actionTypes.action === "select-option") setSelectedEmployees([]);
    if (actionTypes.action === "clear") {
      setSelectedEmployees([]);
      setSelectedSupervisor({ label: "", value: "" });
    }
    setAvailableSlots(initialAvailableSlots);
  };

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingId) && !isEmpty(id)) {
      setTrainingId(id);
    }
  }, [id, trainingId]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [loading]);

  return (
    <>
      <ViewNomineesContext.Provider
        value={{
          selectedStandInTrainee,
          viewDistributionModalIsOpen,
          nominationDetails,
          setNominationDetails,
          setViewDistributionModalIsOpen,

          setSelectedStandInTrainee,
        }}
      >
        {/* View Nominee Status Modal */}
        <Modal
          isOpen={nomineeStatusIsOpen}
          setIsOpen={setNomineeStatusIsOpen}
          size="lg"
          animate={false}
          isStatic
          onClose={() => {
            setTrainingId(null);
            setEmployeesWithStatus([]);
            setNomineeStatusIsOpen(false);
            setAcceptedEmployees(0);
            setDeclinedEmployees(0);
            setNominatedEmployees(0);
          }}
        >
          <ModalContent>
            <ModalContent.Title>
              <header className="pl-2">
                {/* <p className="text-xs font-medium text-indigo-500">test</p> */}
                <div className="flex items-start gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">Training Nominee Status</h3>
                </div>
                {/* <p className="text-sm text-gray-400">Details are as follows</p> */}
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-500 font-medium text-md">
                    <span className="text-gray-700 font-semibold">{acceptedEmployees}</span> out of{" "}
                    <span className="text-gray-700 font-semibold">{countEmployees}</span> accepted
                  </div>
                </div>
              </header>
            </ModalContent.Title>

            <ModalContent.Body>
              <main className="px-2 relative min-h-[28rem]">
                {(isLoading || isFetching) && !loading ? (
                  <div className="flex justify-center w-full h-full items-center overflow-hidden absolute bg-gray-100 opacity-50">
                    <div className="flex flex-col justify-center gap-2">
                      <Spinner size="large" borderSize={4} />
                      <span className="text-lg font-medium">Loading . . . </span>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-end justify-between static ">
                  <div className="flex flex-col border-4 border-dashed border-zinc-200 bg-zinc-50  w-[12rem] py-2 px-4 rounded">
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-green-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{acceptedEmployees} accepted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-gray-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{nominatedEmployees} pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                          className=" fill-red-500"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 uppercase">{declinedEmployees} declined</span>
                    </div>
                  </div>
                  {acceptedEmployees !== countEmployees &&
                    nominatedEmployees === 0 &&
                    declinedEmployees >= 1 &&
                    status === TrainingStatus.ON_GOING_NOMINATION && (
                      <Button variant="soft" size="small" onClick={() => setViewAdditionalTraineesModalIsOpen(true)}>
                        Additional Trainees
                      </Button>
                    )}
                </div>
                <div className="rounded border mt-4">
                  <ViewNomineesDataTable
                    columns={columns}
                    datasource={`${url}/training/${id}/nominees`}
                    queryKey={["view-training-nominees-table", id!]}
                  />
                  {/* <RevolvingDot /> */}
                </div>
              </main>
            </ModalContent.Body>

            <ModalContent.Footer>
              <div className="px-2 pt-2 pb-3">
                <div className="flex items-center justify-between w-full gap-2">
                  <Button
                    size="default"
                    variant="soft"
                    onClick={() => {
                      // setNomineeStatusIsOpen(false);
                      // setTrainingId(null);
                      // setEmployeesWithStatus([]);
                      // setAcceptedEmployees(0);
                      // setDeclinedEmployees(0);
                      // setNominatedEmployees(0);
                      setViewDistributionModalIsOpen(true);
                    }}
                  >
                    Slot Distribution Status
                  </Button>
                  <Button
                    size="small"
                    variant="white"
                    onClick={() => {
                      setNomineeStatusIsOpen(false);
                      setTrainingId(null);
                      setEmployeesWithStatus([]);
                      setAcceptedEmployees(0);
                      setDeclinedEmployees(0);
                      setNominatedEmployees(0);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </ModalContent.Footer>
          </ModalContent>
        </Modal>

        {/* View Auxiliary Modal */}
        <Modal
          isOpen={viewAuxModalIsOpen}
          setIsOpen={setViewAuxModalIsOpen}
          size="2md"
          center
          isStatic={true}
          withCloseBtn={true}
          onClose={() => {
            setReason("");
            setNominee({} as Nominee);
            setSupervisor({} as Supervisor);
            setSelectedStandInTrainee({ label: "", value: "" } as SelectProp);
          }}
        >
          <ModalContent>
            <ModalContent.Title>
              <header>
                <h3 className="px-2 py-2 font-semibold text-xl ">Swap to an auxiliary trainee</h3>
              </header>
            </ModalContent.Title>
            <ModalContent.Body>
              <main className="px-2 py-2 h-[30rem]">
                {/* <div>{reason}</div> */}
                <div className="text-justify ">
                  <span className="font-semibold">{nominee.name}</span> declined this training with the reason:
                  {"\t"}
                  <span className="text-gray-600">❝ {reason} ❞</span>
                </div>

                <div className="pt-5 pb-2">
                  Pick an auxiliary trainee under <span className=" font-semibold">{supervisor.name}</span>
                </div>

                <div className="flex w-full gap-2">
                  <div className="flex-1">
                    <Select
                      id="customReactSelectTags"
                      className="basic-multi-select"
                      classNamePrefix="select2-selection"
                      value={selectedStandInTrainee}
                      onChange={(nominee) => {
                        setSelectedStandInTrainee({ label: nominee?.label!, value: nominee?.value! });
                        setAvailableSlots(initialAvailableSlots - 1);
                      }}
                      closeMenuOnSelect={false}
                      options={standInTrainees.map((nominee) => {
                        return { value: nominee.nomineeId, label: nominee.name };
                      })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex flex-col border rounded px-3 py-2 border-gray-300">
                    {/* <div className="text-sm text-gray-600">
                      Total Assigned Slots: <span className="text-gray-800 font-medium">{totalSlots}</span>
                    </div> */}
                    <div className="text-sm text-gray-600">
                      Remaining Available Slots after submission:{" "}
                      <span className="text-gray-800 font-medium">{availableSlots}</span>
                    </div>
                  </div>
                </div>
              </main>
            </ModalContent.Body>
            <ModalContent.Footer>
              <footer>
                <div className="flex w-full justify-end px-1 py-2">
                  <button
                    className="w-[5rem] bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded px-3 py-2 text-sm"
                    onClick={() => standInMutation.mutateAsync()}
                  >
                    Submit
                  </button>
                </div>
              </footer>
            </ModalContent.Footer>
          </ModalContent>
        </Modal>

        {/* View Additional Trainees Modal */}
        <Modal
          isOpen={viewAdditionalTraineesModalIsOpen}
          setIsOpen={setViewAdditionalTraineesModalIsOpen}
          size="3md"
          isStatic
          onClose={() => {
            setSelectedSupervisor({ label: "", value: "" });
            setViewAdditionalTraineesModalIsOpen(false);
            setAvailableSlots(0);
            setInitialAvailableSlots(0);
            setSelectedEmployees([]);
          }}
        >
          <ModalContent>
            <ModalContent.Title>
              <header className="px-2 py-2 ">
                <h3 className="font-semibold text-xl ">Additional Trainees</h3>
                <div className="text-gray-700 text-sm">Remaining available slots: {availableSlots}</div>
              </header>
            </ModalContent.Title>

            <ModalContent.Body>
              <main className="px-2 sm:h-full overflow-hidden lg:min-h-[34rem]">
                {/* <Button onClick={() => setSelectedSupervisor({ label: "", value: "" })}>CLEAR</Button> */}
                {/* Search */}

                <div className="flex h-[4rem] w-full px-7">
                  {/* FIRST */}
                  {isEmpty(selectedSupervisor.value) ? (
                    <div className="w-[30%] h-full border-blue-800 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <section className="w-8 h-8 bg-blue-800 rounded-full flex text-indigo-200 shrink-0 items-center justify-center text-xs font-medium">
                          1
                        </section>
                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Supervisor</span>
                          <span className="text-gray-700 text-xs">Select one</span>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[30%] h-full border-blue-800 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <HiCheckCircle className="w-10 h-10 text-emerald-600" />
                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Supervisor</span>
                          <span className="text-gray-700 text-xs">Done</span>
                        </section>
                      </div>
                    </div>
                  )}

                  {/* FIRST CONNECTING STEM */}
                  {!isEmpty(selectedSupervisor.value) ? (
                    <div className="w-[5%] h-full flex flex-col">
                      <div className="w-full h-full border-b border-blue-800 text-transparent">.</div>
                      <div className="w-full h-full border-t border-blue-800 text-transparent">.</div>
                    </div>
                  ) : (
                    <div className="w-[5%] h-full flex flex-col">
                      <div className="w-full h-full border-b border-slate-300 text-transparent">.</div>
                      <div className="w-full h-full border-t border-slate-300 text-transparent">.</div>
                    </div>
                  )}

                  {/* SECOND */}
                  {isEmpty(selectedSupervisor.value) && isEmpty(selectedEmployees) ? (
                    <div className="w-[30%] h-full border-slate-300 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <section className="w-8 h-8 bg-slate-300 rounded-full flex text-gray-700 shrink-0 items-center justify-center text-xs font-medium">
                          2
                        </section>

                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Employees</span>
                          <span className="text-gray-700 text-xs">Select one or many</span>
                        </section>
                      </div>
                    </div>
                  ) : !isEmpty(selectedSupervisor.value) && isEmpty(selectedEmployees) ? (
                    <div className="w-[30%] h-full border-blue-800 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <section className="w-8 h-8 bg-blue-800 rounded-full flex text-indigo-300 shrink-0 items-center justify-center text-xs font-medium">
                          2
                        </section>

                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Employees</span>
                          <span className="text-gray-700 text-xs">Select one or many</span>
                        </section>
                      </div>
                    </div>
                  ) : !isEmpty(selectedSupervisor.value) && !isEmpty(selectedEmployees) ? (
                    <div className="w-[30%] h-full border-blue-800 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <HiCheckCircle className="w-10 h-10 text-emerald-600" />

                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Employees</span>
                          <span className="text-gray-700 text-xs">Done</span>
                        </section>
                      </div>
                    </div>
                  ) : null}

                  {/* SECOND CONNECTING STEM */}
                  {!isEmpty(selectedEmployees) ? (
                    <div className="w-[5%] h-full flex flex-col">
                      <div className="w-full h-full border-b border-blue-800 text-transparent">.</div>
                      <div className="w-full h-full border-t border-blue-800 text-transparent">.</div>
                    </div>
                  ) : (
                    <div className="w-[5%] h-full flex flex-col">
                      <div className="w-full h-full border-b border-slate-300 text-transparent">.</div>
                      <div className="w-full h-full border-t border-slate-300 text-transparent">.</div>
                    </div>
                  )}

                  {/* THIRD */}
                  {!isEmpty(selectedSupervisor.value) && !isEmpty(selectedEmployees) ? (
                    <div className="w-[30%] h-full border-blue-800 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <section className="w-8 h-8 bg-emerald-600 rounded-full animate-pulse flex text-gray-200 shrink-0 items-center justify-center text-xs font-medium">
                          3
                        </section>
                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Submit</span>
                          <span className="text-gray-700 text-xs">Click the button</span>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div className="w-[30%] h-full border-slate-300 border-2 rounded-xl p-2">
                      <div className="flex gap-2 items-center h-full justify-center ">
                        <section className="w-8 h-8 bg-gray-200 rounded-full flex text-gray-700 shrink-0 items-center justify-center text-xs font-medium">
                          3
                        </section>
                        <section className="flex flex-col">
                          <span className="font-medium text-sm">Submit</span>
                          <span className="text-gray-700 text-xs">Finish steps 1 and 2</span>
                        </section>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex w-full items-center pt-10 h-full pr-7">
                  <div className="flex flex-col gap-8 w-full h-full">
                    <div className="flex gap-6 items-center w-full">
                      {/* <div className="w-10 h-10 bg-indigo-700 rounded-full flex text-indigo-200 shrink-0 items-center justify-center text-xs font-medium">
                        1
                      </div> */}
                      <span className="text-xs w-[6px]">1</span>

                      <div className="flex w-full flex-col gap-0">
                        <div className="flex-1">
                          <Select
                            id="customReactSelectSupervisor"
                            className="basic-multi-select"
                            classNamePrefix="select2-selection"
                            placeholder="Select a supervisor"
                            isClearable
                            // value={selectedSupervisor}
                            onChange={onChangeSupervisor}
                            isMulti={false}
                            closeMenuOnSelect={true}
                            options={supervisors.map((supervisor) => {
                              return { value: supervisor.employeeId, label: supervisor.fullName };
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SELECT EMPLOYEES */}
                    <div className="flex gap-6 items-center w-full">
                      <span className="text-xs w-[6px]"> 2</span>
                      <div className="flex w-full gap-0 flex-col">
                        <div className="flex-1">
                          <Select
                            id="customReactSelectEmployees"
                            className="basic-multi-select"
                            classNamePrefix="select2-selection"
                            placeholder="Select employees..."
                            value={selectedEmployees}
                            isDisabled={isEmpty(selectedSupervisor.value) ? true : false}
                            isOptionDisabled={() => {
                              if (availableSlots < 1) return true;
                              else return false;
                            }}
                            onChange={onChangeEmployees}
                            formatOptionLabel={(custom) => {
                              return (
                                <div className="flex gap-2 items-center">
                                  {custom.label} {custom.value.isTagged ? <HiTag className="text-blue-600" /> : null}
                                </div>
                              );
                            }}
                            isMulti
                            closeMenuOnSelect={false}
                            options={employees}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SUBMISSION BUTTON */}
                    <div className="flex w-full mt-0 items-center gap-6">
                      <span className="text-xs w-[6px]">3</span>
                      <Button
                        variant={isEmpty(selectedSupervisor.value) || isEmpty(selectedEmployees) ? "white" : "soft"}
                        disabled={isEmpty(selectedSupervisor.value) || isEmpty(selectedEmployees) ? true : false}
                        size="small"
                        className={`${
                          isEmpty(selectedSupervisor.value) || (isEmpty(selectedEmployees) && "cursor-not-allowed")
                        } min-w-[8rem] h-[3rem] flex-1 shrink-0`}
                        onClick={() => setConfirmAddAlertTraineesIsOpen(true)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </main>
            </ModalContent.Body>
            <ModalContent.Footer>
              <footer>
                <div className="flex w-full justify-end px-1 py-2 gap-2">
                  <Button
                    variant="white"
                    onClick={() => {
                      setSelectedSupervisor({ label: "", value: "" });
                      setSelectedEmployees([]);
                      setViewAdditionalTraineesModalIsOpen(false);
                      setAvailableSlots(0);
                      setInitialAvailableSlots(0);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </footer>
            </ModalContent.Footer>
          </ModalContent>
        </Modal>

        {/* View Nomination Status Modal */}
        <ViewNominationStatusModal />

        {/* Alert Confirmation Modal */}
        <AlertDialog open={confirmAddTraineesAlertIsOpen} onOpenChange={setConfirmAddAlertTraineesIsOpen}>
          <AlertDialogContent>
            <AlertDialogTitle>
              <div className="text-lg font-semibold text-gray-600">Confirm Additional Trainees</div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <label className="text-sm font-medium text-gray-700">
                Are you sure you want to add the selected trainees to this training?
              </label>
            </AlertDialogDescription>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="white" onClick={() => setConfirmAddAlertTraineesIsOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  addtlTraineesMutation.mutateAsync();
                }}
              >
                Submit
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </ViewNomineesContext.Provider>
    </>
  );
};

export const useViewNomineesContext = () => {
  const {
    selectedStandInTrainee,
    viewDistributionModalIsOpen,
    nominationDetails,
    setNominationDetails,
    setViewDistributionModalIsOpen,
    setSelectedStandInTrainee,
  } = useContext(ViewNomineesContext);

  return {
    selectedStandInTrainee,
    viewDistributionModalIsOpen,
    nominationDetails,
    setNominationDetails,
    setViewDistributionModalIsOpen,
    setSelectedStandInTrainee,
  };
};
