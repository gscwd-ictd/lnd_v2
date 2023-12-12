import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useContext } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import dayjs from "dayjs";
import { EmployeeWithSupervisor } from "@lms/utilities/types/training";

export const BatchNumbering: FunctionComponent = () => {
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const {
    batches,
    setBatches,
    setSelectedBatch,
    setSelectedBatchModalIsOpen,
    setTotalSelectedEmployees,
    totalSelectedEmployees,
    employeePool,
    setEmployeePool,
  } = useContext(TrainingNoticeContext);

  return (
    <>
      <div className="p-3 border rounded shadow-md bg-zinc-100">
        <div className="text-lg font-medium text-gray-700">{courseTitle}</div>
        <div className="flex text-sm ">
          <div className="text-gray-600 ">{dayjs(trainingStart).format("MMMM DD, YYYY")}</div>
          <span>
            &nbsp;
            {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") && "to"}
            &nbsp;
          </span>
          {dayjs(trainingStart).format("MMMM DD, YYYY") !== dayjs(trainingEnd).format("MMMM DD, YYYY") && (
            <div className="text-gray-600 ">{dayjs(trainingEnd).format("MMMM DD, YYYY")}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex items-center justify-center w-full gap-2 py-1 bg-indigo-700 rounded">
          <div className="text-3xl text-white">{numberOfParticipants}</div>
          <div className="text-sm font-medium text-gray-200">Max Participants</div>
        </div>

        <div
          className={`flex items-center justify-center w-full gap-2 py-1 ${
            employeePool.length === 0 ? "bg-green-600" : "bg-zinc-500"
          } rounded`}
          role="button"
          onClick={() => console.log(totalSelectedEmployees)}
        >
          <div className="text-3xl text-white">{totalSelectedEmployees.length}</div>
          <div className="text-sm font-medium text-gray-200">Selected</div>
        </div>

        <div
          className={`flex items-center justify-center w-full gap-2 py-1 ${
            employeePool.length === 0 ? "bg-green-600" : "bg-zinc-500"
          } rounded`}
          role="button"
          onClick={() => console.log(employeePool)}
        >
          <div className="text-3xl text-white">{employeePool.length}</div>
          <div className="text-sm font-medium text-gray-200">Available</div>
        </div>

        <div className="flex items-center justify-center w-full gap-2 py-1 bg-indigo-700 rounded">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="text-3xl text-white">{batches.length}</div>
              <div className="text-sm font-medium text-gray-200"> {batches.length > 1 ? "Batches" : "Batch"}</div>
            </div>
            <div className="flex items-center w-full">
              <div className="flex flex-col gap-1">
                {/* Arrow up */}
                <button
                  className="text-white rounded bg-zinc-600 hover:bg-zinc-300 hover:text-indigo-800"
                  onClick={() =>
                    setBatches([
                      ...batches,
                      {
                        number: batches[batches.length - 1].number + 1,
                        employees: [],
                        date: { from: "", to: undefined },
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
                  className="text-white rounded bg-zinc-600 hover:bg-zinc-300 hover:text-indigo-800"
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

      <div className="flex flex-col gap-5 pt-5 ">
        {batches.map((batch, idx) => {
          return (
            <div
              key={batch.number}
              role="button"
              className="flex items-center justify-between w-full p-4 border rounded shadow-md bg-zinc-200 "
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBatch({ employees: batch.employees, number: idx + 1, date: batch.date! });
                setSelectedBatchModalIsOpen(true);
              }}
            >
              <div className="flex flex-col w-full text-indigo-800">
                <div className="text-2xl font-medium">Batch {batch.number}</div>
                {batch.date.from && (
                  <div className="flex text-gray-600 text-md">
                    <div>{batch.date.from ? ` ${dayjs(batch.date.from).format("MMMM DD, YYYY")} ` : null} </div>
                    <div>
                      {batch.date.to && batch.date.from === batch.date.to
                        ? null
                        : batch.date.to && batch.date.to !== batch.date.from
                        ? `- ${dayjs(batch.date.to).format("MMMM DD, YYYY")}`
                        : null}
                    </div>
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
