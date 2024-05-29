import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import { EmployeeWithSupervisor } from "@lms/utilities/types/training";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import Select from "react-select";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { ViewNomineesDataTable } from "@lms/components/osprey/ui/local-table/data-table/view/ViewNomineesDataTable";
import { Nominee, Supervisor, useViewNomineesStatusDataTable } from "./data-table/use-view-nominees-status-data-table";

type SelectProps = {
  value: string;
  label: string;
};

type ViewNomineeState = {
  countEmployees: number;
  setCountEmployees: (countEmployees: number) => void;
  acceptedEmployees: number;
  setAcceptedEmployees: (acceptedEmployees: number) => void;
  nominatedEmployees: number;
  setNominatedEmployees: (nominatedEmployees: number) => void;
  declinedEmployees: number;
  setDeclinedEmployees: (declinedEmployees: number) => void;
  selectedStandInTrainee: SelectProps;
  setSelectedStandInTrainee: (selectedStandInTrainee: SelectProps) => void;
};

const ViewNomineesContext = createContext<ViewNomineeState>({} as ViewNomineeState);

export const ViewNomineeStatusModal: FunctionComponent = () => {
  const setTrainingId = useTrainingNoticeStore((state) => state.setId);
  const [countEmployees, setCountEmployees] = useState<number>(0);
  const [acceptedEmployees, setAcceptedEmployees] = useState<number>(0);
  const [nominatedEmployees, setNominatedEmployees] = useState<number>(0);
  const [declinedEmployees, setDeclinedEmployees] = useState<number>(0);

  const [selectedStandInTrainee, setSelectedStandInTrainee] = useState<SelectProps>({} as SelectProps);

  const {
    columns,
    auxModalIsOpen,
    standInTrainees,
    reason,
    nominee,
    supervisor,
    setReason,
    setSupervisor,
    setAuxModalIsOpen,
    setStandInTrainees,
    setNominee,
  } = useViewNomineesStatusDataTable();

  const { id, nomineeStatusIsOpen, setNomineeStatusIsOpen, employeesWithStatus, setEmployeesWithStatus } =
    useContext(TrainingNoticeContext);
  const trainingId = useTrainingNoticeStore((state) => state.id);

  // per training notice query
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["training-nominees", trainingId],
    enabled: !!trainingId && nomineeStatusIsOpen !== false,
    staleTime: 2,

    refetchOnWindowFocus: false,

    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}/nominees`);
      console.log(data);
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
      setCountEmployees(data.nominees.length);
    },
  });

  // set the training notice id only on one instance upon opening the modal
  useEffect(() => {
    if (isEmpty(trainingId) && !isEmpty(id)) {
      setTrainingId(id);
    }
  }, [id, trainingId]);

  return (
    <>
      <ViewNomineesContext.Provider
        value={{
          acceptedEmployees,
          countEmployees,
          declinedEmployees,
          nominatedEmployees,
          selectedStandInTrainee,
          setAcceptedEmployees,
          setCountEmployees,
          setDeclinedEmployees,
          setNominatedEmployees,
          setSelectedStandInTrainee,
        }}
      >
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
                  <h3 className="text-lg font-semibold text-gray-600">Training Nominee Status</h3>
                </div>
                <p className="text-sm text-gray-400">Details are as follows</p>
              </header>
            </ModalContent.Title>

            <ModalContent.Body>
              {isLoading || isFetching ? (
                <div className="flex justify-center w-full h-full overflow-hidden">
                  <Spinner size="large" borderSize={2} />
                </div>
              ) : (
                <main className="px-2 space-y-4">
                  <div className="flex items-end justify-between">
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

                    <div className="text-sm text-gray-700">
                      <span className="font-medium text-md ">
                        {acceptedEmployees} out of {countEmployees} accepted
                      </span>
                    </div>
                  </div>

                  <div className="rounded border">
                    <ViewNomineesDataTable
                      columns={columns}
                      datasource={`${url}/training/${id}/nominees`}
                      queryKey={["view-nominees-status", trainingId!]}
                    />
                  </div>
                </main>
              )}
            </ModalContent.Body>

            <ModalContent.Footer>
              <div className="px-2 pt-2 pb-3">
                <div className="flex items-center justify-end w-full gap-2">
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

        <Modal
          isOpen={auxModalIsOpen}
          setIsOpen={setAuxModalIsOpen}
          size="2md"
          center
          isStatic={true}
          withCloseBtn={true}
          onClose={() => {
            setReason("");
            setNominee({} as Nominee);
            setSupervisor({} as Supervisor);
          }}
        >
          <ModalContent>
            <ModalContent.Title>
              <header>
                <h3 className="px-5 py-2 font-semibold text-xl ">Swap to an auxiliary trainee</h3>
              </header>
            </ModalContent.Title>
            <ModalContent.Body>
              <main className="px-5 py-2 h-[30rem]">
                {/* <div>{reason}</div> */}
                <div className="text-justify ">
                  <span className="font-semibold">{nominee.name}</span> declined this training with the reason:
                  {"\t"}
                  <span className="text-gray-600">❝ {reason} ❞</span>
                </div>

                <div className="pt-5">
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
                      }}
                      // onChange={(value)=>{
                      //   setSelectedStandInTrainee(value.map((employee)=>{
                      //     return {value: employee.value, label: employee.label}
                      //   }))
                      // }}
                      closeMenuOnSelect={false}
                      options={standInTrainees.map((nominee) => {
                        return { value: nominee.nomineeId, label: nominee.name };
                      })}
                    />
                  </div>
                </div>
              </main>
            </ModalContent.Body>
            <ModalContent.Footer>
              <footer>
                <div className="flex w-full justify-end px-1 py-2">
                  <button className="w-[5rem] bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded px-3 py-2 text-sm">
                    Submit
                  </button>
                </div>
              </footer>
            </ModalContent.Footer>
          </ModalContent>
        </Modal>
      </ViewNomineesContext.Provider>
    </>
  );
};

export const useViewNomineesContext = () => {
  const {
    acceptedEmployees,
    countEmployees,
    declinedEmployees,
    nominatedEmployees,
    selectedStandInTrainee,
    setAcceptedEmployees,
    setCountEmployees,
    setDeclinedEmployees,
    setNominatedEmployees,
    setSelectedStandInTrainee,
  } = useContext(ViewNomineesContext);

  return {
    acceptedEmployees,
    countEmployees,
    declinedEmployees,
    nominatedEmployees,
    selectedStandInTrainee,
    setAcceptedEmployees,
    setCountEmployees,
    setDeclinedEmployees,
    setNominatedEmployees,
    setSelectedStandInTrainee,
  };
};
