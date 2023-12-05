import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useContext } from "react";
import { TrainingNoticeContext } from "../../training-notice-data-table/TrainingNoticeDataTable";
import dayjs from "dayjs";

export const BatchNumbering: FunctionComponent = () => {
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingEnd = useTrainingNoticeStore((state) => state.trainingEnd);
  const courseTitle = useTrainingNoticeStore((state) => state.courseTitle);
  const { batches, setBatches, setSelectedBatch, setSelectedBatchModalIsOpen } = useContext(TrainingNoticeContext);

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
      <div className="flex px-5">
        <div>
          <span className="font-medium text-gray-700 text-md">Total participants</span>
        </div>
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex flex-col">
            <span className="text-3xl text-indigo-600">{numberOfParticipants}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl text-indigo-600">
              {batches.length} {batches.length > 1 ? "batches" : "batch"}
            </span>
            <div className="flex flex-col gap-1">
              <button
                className="text-white rounded bg-zinc-600 hover:bg-zinc-300 hover:text-indigo-700"
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                className="text-white rounded bg-zinc-600 hover:bg-zinc-300 hover:text-indigo-700"
                onClick={() => {
                  if (batches.length > 1) {
                    const updatedBatches = [...batches];
                    updatedBatches.splice(updatedBatches.length - 1, 1);
                    setBatches(updatedBatches);
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-flow-row-dense grid-cols-2 gap-2 pt-5">
        {batches.map((batch, idx) => {
          return (
            <div
              key={batch.number}
              role="button"
              className={`${
                batches.length <= 1
                  ? "col-span-2"
                  : idx + 1 === batches.length && batches.length % 2 === 1
                  ? "col-span-2"
                  : "col-span-1"
              } px-2 border rounded shadow-md bg-zinc-200`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBatch({ employees: batch.employees, number: idx + 1, date: batch.date! });
                setSelectedBatchModalIsOpen(true);
              }}
            >
              <div className="flex items-center justify-between p-2 text-lg ">
                <div className="flex flex-col w-full text-indigo-700">
                  <div>Batch {batch.number}</div>
                </div>
                <div className="flex gap-1 text-gray-700">
                  <span className="text-3xl">{batch.employees.length}</span>
                  {/* {batch.employees.length === 1 ? " participant" : batch.employees.length > 1 ? " participants" : ""} */}
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
                {/* <div className="flex items-center justify-end w-full gap-2">
                  <button
                    className="px-2 py-1 text-indigo-700 bg-inherit hover:bg-indigo-700 hover:text-white hover:rounded-sm"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBatch({ employees: batch.employees, number: idx + 1, date: batch.date! });
                      setSelectedBatchModalIsOpen(true);
                    }}
                  >
                    <div className="flex items-center gap-2 ">
                      <span className="">Edit</span>
                    </div>
                  </button>
                </div> */}
              </div>
              {batch.date.from && (
                <div className="flex px-2 pb-2 text-xs text-gray-600">
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
          );
        })}
      </div>
    </>
  );
};
