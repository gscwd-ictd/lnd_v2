import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useContext } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import dayjs from "dayjs";
import { EmployeeWithSupervisor } from "@lms/utilities/types/training";

export const BatchNumbering: FunctionComponent = () => {
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const {
    batches,
    employeePool,
    totalSelectedEmployees,
    setBatches,
    setEmployeePool,
    setSelectedBatch,
    setTotalSelectedEmployees,
    setSelectedBatchModalIsOpen,
  } = useContext(TrainingNoticeContext);

  return (
    <>
      <div className="flex justify-between gap-2 px-5">
        <div className="flex flex-col items-center justify-center w-full gap-0 py-2 rounded-md bg-sky-700">
          <div className="text-3xl text-white">{numberOfParticipants}</div>
          <div className="text-sm font-medium text-gray-200">Max Participants</div>
        </div>

        <div
          className={`flex flex-col items-center justify-center w-full gap-0  py-2 ${
            totalSelectedEmployees.length === numberOfParticipants ? "bg-sky-400 hover:bg-sky-600" : "bg-zinc-500"
          } rounded-md`}
          role="button"
          onClick={() => console.log(totalSelectedEmployees)}
        >
          <div className="text-3xl text-white">{totalSelectedEmployees.length}</div>
          <div className="text-sm font-medium text-gray-100">Selected</div>
        </div>

        <div
          className={`flex flex-col items-center justify-center w-full gap-0  py-2 ${
            employeePool.length === 0 ? "bg-sky-400 hover:bg-sky-600" : "bg-zinc-500"
          } rounded-md`}
          role="button"
          onClick={() => console.log(employeePool)}
        >
          <div className="text-3xl text-white">{employeePool.length}</div>
          <div className="text-sm font-medium text-gray-100">Available</div>
        </div>

        <div className="flex items-center justify-center w-full gap-0 py-2 border-2 rounded-md border-sky-700 ring ring-sky-200 ring-inset bg-gradient-to-r from-zinc-100 to-gray-300/50">
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-0">
              <div className="text-3xl text-sky-700">{batches.length}</div>
              <div className="text-sm font-medium text-gray-700"> {batches.length > 1 ? "Batches" : "Batch"}</div>
            </div>
            <div className="flex items-center w-full">
              <div className="flex flex-col gap-1">
                {/* Arrow up */}
                <button
                  className="text-white rounded-md bg-sky-600 hover:bg-sky-300 hover:text-zinc-800"
                  onClick={() =>
                    setBatches([
                      ...batches,
                      {
                        batchNumber: batches[batches.length - 1].batchNumber + 1,
                        employees: [],
                        trainingDate: { from: "", to: undefined },
                      },
                    ])
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </button>

                {/* Arrow down */}
                <button
                  className="text-white rounded-md bg-zinc-600 hover:bg-zinc-300 hover:text-indigo-800"
                  onClick={() => {
                    if (batches.length > 1) {
                      const updatedBatches = [...batches];

                      {
                        /* this logic is for adding back the pool if the batch-for-removal has employees */
                      }
                      if (updatedBatches[updatedBatches.length - 1].employees.length > 0) {
                        const currentEmployeePool = [...employeePool];

                        // insert logic here to filter array based on array of employees to remove
                        //TODO might uncomment this later
                        // const tempTotalSelectedEmployees = totalSelectedEmployees.filter(
                        //   (employee) => !updatedBatches[updatedBatches.length - 1].employees.includes(employee)
                        // );
                        // setTotalSelectedEmployees(tempTotalSelectedEmployees);
                        currentEmployeePool.push(...updatedBatches[updatedBatches.length - 1].employees);
                        currentEmployeePool
                          .sort((a, b) => (a.name > b.name ? 1 : -1))
                          .sort((a, b) =>
                            a.supervisor.name! > b.supervisor.name!
                              ? 1
                              : a.supervisor.name! === b.supervisor.name
                              ? 0
                              : -1
                          );

                        setEmployeePool(currentEmployeePool);
                      }

                      updatedBatches.splice(updatedBatches.length - 1, 1);

                      let updatedSelectedEmployees: EmployeeWithSupervisor[] = [];
                      updatedBatches.map((batch) => {
                        if (batch.employees) {
                          updatedSelectedEmployees.push(...batch.employees);
                        }
                      });

                      setTotalSelectedEmployees(updatedSelectedEmployees.sort((a, b) => (a.name > b.name ? 1 : -1)));
                      setBatches(updatedBatches);
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5 ">
        {batches
          .sort((a, b) => (a.batchNumber > b.batchNumber ? 1 : -1))
          .map((batch, idx) => {
            return (
              <div
                key={batch.batchNumber}
                role="button"
                className={`flex items-center justify-between min-h-[7rem] w-full px-6 py-4 ${
                  batch.employees.length === 0
                    ? "bg-zinc-200 hover:border-r-8 hover:border-r-sky-300  hover:bg-sky-300/50 hover:transition-all"
                    : "bg-blue-50 hover:border-r-8 hover:border-r-sky-300  hover:bg-sky-300/50 hover:transition-all "
                } border shadow-md rounded-md`}
                onClick={(e) => {
                  e.stopPropagation();

                  setSelectedBatch({
                    employees: batch.employees,
                    batchNumber: idx + 1,
                    trainingDate: batch.trainingDate!,
                  });
                  setSelectedBatchModalIsOpen(true);
                }}
              >
                <div className="flex flex-col w-full pl-4 text-sky-800">
                  <div className="text-2xl font-medium">Batch {batch.batchNumber}</div>
                  {batch.trainingDate?.from && (
                    <div className="flex gap-1 rounded-xl text-md">
                      {/* <div>
                        {batch.trainingDate?.from
                          ? ` ${dayjs(batch.trainingDate.from).format("MMMM DD, YYYY hh:mm A")} `
                          : null}{" "}
                      </div>
                      <div>
                        {batch.trainingDate.to && batch.trainingDate.from === batch.trainingDate.to
                          ? null
                          : batch.trainingDate.to && batch.trainingDate.to !== batch.trainingDate.from
                          ? `- ${dayjs(batch.trainingDate.to).format("MMMM DD, YYYY hh:mm A")}`
                          : null}
                      </div> */}
                      {dayjs(batch.trainingDate?.from).isSame(dayjs(batch.trainingDate?.to), "day") === true ? (
                        <div className="flex w-full">
                          <div className="flex w-full gap-1">
                            {/* <span className="w-[4.5rem]">Starts on</span> */}
                            {/* Date From */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-800"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                              />
                            </svg>
                            <div className="font-medium text-gray-700">
                              {dayjs(batch.trainingDate?.from).format("MMMM DD, YYYY")}
                            </div>
                          </div>
                          <div className="flex w-full gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-gray-800"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <div className="text-gray-500">
                              {dayjs(batch.trainingDate?.from).format("hh:mmA")}-
                              {dayjs(batch.trainingDate?.to).format("hh:mmA")}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col w-full gap-1">
                          <div className="flex w-full ">
                            <div className="flex w-full gap-1">
                              {/* <span className="w-[4.5rem]">Starts on</span> */}
                              {/* Date From */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                />
                              </svg>
                              <div className="font-medium text-gray-700">
                                {dayjs(batch.trainingDate?.from).format("MMMM DD, YYYY")}
                              </div>
                            </div>
                            <div className="flex w-full gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <div className="text-gray-500">{dayjs(batch.trainingDate?.from).format("hh:mmA")}</div>
                              <span className="w-[3rem]">Start</span>
                            </div>
                          </div>
                          {/* <div className="text-gray-600">to</div> */}
                          <div className="flex w-full">
                            <div className="flex w-full gap-1">
                              {/* <span className="w-[4.5rem]">Ends on</span> */}
                              {/* Date to */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                />
                              </svg>

                              <div className="font-medium text-gray-700">
                                {dayjs(batch.trainingDate?.to).format("MMMM DD, YYYY")}
                              </div>
                            </div>
                            <div className="flex w-full gap-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <div className="text-gray-500">{dayjs(batch.trainingDate?.to).format("hh:mmA")}</div>
                              <span className="w-[3rem]">End</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 text-gray-700">
                  <span className="text-3xl">{batch.employees.length}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
