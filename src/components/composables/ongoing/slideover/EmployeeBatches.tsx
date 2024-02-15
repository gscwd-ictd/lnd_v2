import { Disclosure } from "@headlessui/react";
import { Batch, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FunctionComponent, useContext } from "react";
import { OnGoingContext } from "../../on-going-data-table/OnGoingDataTable";
type EmployeeBatchesProps = {
  batches: Array<Batch>;
};

export const EmployeeBatches: FunctionComponent<EmployeeBatchesProps> = ({ batches }) => {
  const to = useTrainingNoticeStore((state) => state.trainingEnd);

  const { setBatchAttendanceIsOpen, setSelectedBatch } = useContext(OnGoingContext);

  return (
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
                          : `${dayjs(batch.trainingDate.from).format("MMMM D-")}${dayjs(to).format("D, YYYY")} ${dayjs(
                              batch.trainingDate.from
                            ).format("hh:mmA")}-${dayjs(batch.trainingDate.to).format("hh:mmA")}`}
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
                    {/* <div className="flex justify-center w-full px-3 py-2 mt-4 text-white bg-indigo-600 rounded">
                      <button
                        className="w-full"
                        onClick={() => {
                          setBatchAttendanceIsOpen(true);
                          setSelectedBatch(batch);
                        }}
                      >
                        Attendance
                      </button>
                    </div> */}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </div>
  );
};
