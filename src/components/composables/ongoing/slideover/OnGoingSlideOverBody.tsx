import {
  BatchEmployee,
  useTrainingNoticeStore,
  useTrainingTypesStore,
} from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";
import { Disclosure } from "@headlessui/react";
import { isEmpty } from "lodash";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const OnGoingSlideOverBody = () => {
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const location = useTrainingNoticeStore((state) => state.location);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const selectedTrainingType = useTrainingTypesStore((state) => state.selectedTrainingType);
  const selectedFacilitators = useTrainingNoticeStore((state) => state.selectedFacilitators);
  const from = useTrainingNoticeStore((state) => state.trainingStart);
  const to = useTrainingNoticeStore((state) => state.trainingEnd);
  const trainingHours = useTrainingNoticeStore((state) => state.numberOfHours);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    batches,
    batchAttendanceIsOpen,
    selectedBatch,
    hasFetchedBatches,
    setHasFetchedBatches,
    setBatchAttendanceIsOpen,
    setSelectedBatch,
  } = useContext(OnGoingContext);
  const participants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const [employeeAttendance, setEmployeeAttendance] = useState<Array<BatchEmployee>>([]);

  const onChangeAttendance = (idx: number) => {
    const newEmployeeAttendance = [...employeeAttendance];
    newEmployeeAttendance[idx].isCompleteAttendance = !newEmployeeAttendance[idx].isCompleteAttendance;
    setEmployeeAttendance(newEmployeeAttendance);
  };

  useEffect(() => {
    if (batchAttendanceIsOpen) {
      const newSelectedBatchEmployees = selectedBatch.employees.map((employee) => {
        return { ...employee, isCompleteAttendance: employee.isCompleteAttendance ?? false };
      });

      setEmployeeAttendance(newSelectedBatchEmployees ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [selectedBatch.employees, batchAttendanceIsOpen]);

  return (
    <>
      <div className="flex flex-col gap-5 px-8 py-10">
        {/* Course Title */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Course Title</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{courseTitle}</div>
        </div>

        {/* Location */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Location</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{location}</div>
        </div>

        {/* Tags */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Tags</div>
          <div className="flex gap-2 font-normal text-left text-gray-700 text-md ">
            {selectedTags.map((tag, idx) => {
              return (
                <div key={idx} className="px-3 py-2 text-xs font-semibold border rounded bg-zinc-100">
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Type */}
        <div>
          <div className="pb-2 font-semibold text-left text-md text-zinc-600 ">Training Type</div>
          {/* <div className="font-normal text-left text-gray-700 text-md "></div> */}
          <span
            className={`${
              selectedTrainingType === "foundational"
                ? "text-red-600 bg-red-50 border-red-300"
                : selectedTrainingType === "technical"
                ? "text-orange-600 bg-orange-50 border-orange-300"
                : selectedTrainingType === "professional"
                ? "text-green-600 bg-green-50 border-green-300"
                : selectedTrainingType === "supervisory"
                ? "text-yellow-600 bg-yellow-50 border-yellow-300"
                : selectedTrainingType === "leadership/managerial"
                ? "text-blue-600 bg-blue-50 border-blue-300"
                : "text-gray-600 bg-gray-50 border-gray-300"
            } text-xs px-3 py-2 font-semibold rounded border`}
          >
            {selectedTrainingType === "foundational"
              ? "Foundational"
              : selectedTrainingType === "technical"
              ? "Technical"
              : selectedTrainingType === "professional"
              ? "Professional"
              : selectedTrainingType === "supervisory"
              ? "Supervisory"
              : selectedTrainingType === "leadership/managerial"
              ? "Leadership/Managerial"
              : ""}
          </span>
        </div>

        {/* Facilitators */}
        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">
            {selectedFacilitators.length > 1 ? "Learning Service Providers" : "Learning Service Provider"}
          </div>
          <div className="flex gap-2 font-normal text-left text-md ">
            {selectedFacilitators.map((faci, idx) => {
              return (
                <div key={idx} className="px-3 py-2 text-xs font-semibold text-white border rounded bg-zinc-600">
                  {faci.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Split the date and Training Hours */}

        <div className="flex justify-between gap-2">
          {/* Training Date */}
          <div>
            <div className="font-semibold text-left text-md text-zinc-600 ">Training Date</div>
            <div className="text-sm font-normal text-left text-gray-700 ">
              {!isEmpty(from) && !isEmpty(to) && dayjs(from).isSame(dayjs(to), "day")
                ? `${dayjs(from).format("MMMM D, YYYY")}`
                : `${dayjs(from).format("MMMM D-")}${dayjs(to).format("D, YYYY")}`}
            </div>
          </div>

          {/* Training Hours  */}
          <div>
            <div className="font-semibold text-left text-md text-zinc-600 ">Training Hours</div>
            <div className="text-sm font-normal text-center text-gray-700 ">{trainingHours}</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-left text-md text-zinc-600 ">Total No. of Participants</div>
          <div className="text-sm font-normal text-left text-gray-700 ">{participants}</div>
        </div>

        <div>
          <div className="flex justify-between w-full mb-2">
            <div className="font-semibold text-left text-md text-zinc-600 ">
              <span>{batches.length}</span> {batches.length > 1 ? "Batches" : "Batch"}
            </div>
          </div>
          <div className="flex flex-col gap-2 font-normal text-left text-gray-700 text-md ">
            {batches.map((batch, idx) => {
              return (
                <Disclosure key={idx}>
                  {({ open }) => (
                    <div className="px-5 py-3 border-2 rounded bg-zinc-100">
                      <div className="flex items-center justify-between">
                        <Disclosure.Button
                          className="flex items-center justify-between w-full transition-all "
                          tabIndex={-1}
                        >
                          <div className="text-sm font-semibold">Batch {batch.batchNumber}</div>
                          <div className="text-xs font-medium text-gray-500">
                            {!isEmpty(batch.trainingDate.from) &&
                            !isEmpty(batch.trainingDate.to) &&
                            dayjs(batch.trainingDate.from).isSame(dayjs(batch.trainingDate.to), "day")
                              ? `${dayjs(batch.trainingDate.from).format("MMMM D, YYYY hh:mmA")}-${dayjs(
                                  batch.trainingDate.to
                                ).format("hh:mmA")}`
                              : `${dayjs(batch.trainingDate.from).format("MMMM D-")}${dayjs(to).format(
                                  "D, YYYY"
                                )} ${dayjs(batch.trainingDate.from).format("hh:mmA")}-${dayjs(
                                  batch.trainingDate.to
                                ).format("hh:mmA")}`}
                          </div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                          >
                            <path
                              d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                              fill="currentColor"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>

                      <Disclosure.Panel className="" as="ul">
                        {batch.employees && batch.employees.length > 0 ? (
                          batch.employees.map((emp, empIdx) => {
                            return (
                              <li key={empIdx} className="flex w-full text-sm text-gray-700">
                                <div className="w-[7%]">{empIdx + 1}.</div>
                                <div className="w-[93%]">{emp.name}</div>
                              </li>
                            );
                          })
                        ) : (
                          <div className="flex w-full h-[2rem] ">
                            <span className="pl-2 space-y-3 text-sm text-gray-400">- No Batches Found</span>
                          </div>
                        )}
                        <div className="flex justify-center w-full px-3 py-2 mt-4 text-white bg-indigo-600 rounded">
                          <button
                            className="w-full"
                            onClick={() => {
                              setBatchAttendanceIsOpen(true);
                              setSelectedBatch(batch);
                            }}
                          >
                            Attendance
                          </button>
                        </div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </div>
      </div>
      <Modal isOpen={batchAttendanceIsOpen} setIsOpen={setBatchAttendanceIsOpen} size="2md">
        <ModalContent>
          <ModalContent.Title>
            <div className="p-3">
              <p className="text-lg font-semibold text-gray-700">Batch {selectedBatch.batchNumber} Attendance</p>
              <div className="flex gap-2">
                {dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
                true ? (
                  <span className="text-sm text-gray-600">
                    {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
                    {dayjs(selectedBatch.trainingDate?.to).format("hh:mmA")}
                  </span>
                ) : dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
                  false ? (
                  <span className="text-sm text-gray-600">
                    {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
                    {dayjs(selectedBatch.trainingDate?.to).format("MMM DD, YYYY hh:mmA")}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </ModalContent.Title>
          <ModalContent.Body>
            {isLoading ? (
              <div className="flex justify-center w-full h-full">
                <Spinner />
              </div>
            ) : (
              <div className="p-2">
                <table className="w-full ">
                  <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
                    <tr>
                      <th className="p-2 font-medium border">Participant Name</th>

                      <th className="p-2 font-medium border">Complete attendance?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeAttendance?.map((employee, idx) => {
                      return (
                        <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80" key={employee.employeeId}>
                          <td className="p-2 text-sm font-light border ">{employee.name}</td>
                          <td
                            className="text-center border hover:cursor-pointer "
                            onClick={() => onChangeAttendance(idx)}
                          >
                            <Checkbox
                              id={`checkbox-${idx}`}
                              checked={employee.isCompleteAttendance}
                              readOnly
                              // onChange={() => onChangeAttendance(idx)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex justify-end w-full">
              <Button
                onClick={() => {
                  console.log(employeeAttendance);

                  // set this to false
                  setBatchAttendanceIsOpen(false);
                  // set this to true to fetch batches
                  setHasFetchedBatches(true);
                }}
              >
                Apply
              </Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
