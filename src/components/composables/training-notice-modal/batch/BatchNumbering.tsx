import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { FunctionComponent, useState } from "react";

type Batch = {
  number: number;
  employees: { employeeId: string; employeeFullName: string }[];
};

export const BatchNumbering: FunctionComponent = () => {
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);
  const [batches, setBatches] = useState<Batch[]>([{ number: 1, employees: [] }]);
  return (
    <>
      <div className="flex justify-between px-5">
        <div className="text-gray-700">Maximum number of participants: {numberOfParticipants}</div>
        <div className="flex items-center px-5">
          <span className="text-3xl text-indigo-600">
            {batches.length} {batches.length > 1 ? "batches" : "batch"}
          </span>
          <div className="flex flex-col">
            <button
              onClick={() =>
                setBatches([...batches, { number: batches[batches.length - 1].number + 1, employees: [] }])
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

      <div className="flex justify-center">
        <select name="" id=""></select>
      </div>

      <div className="grid grid-flow-row-dense grid-cols-2 gap-2">
        {batches.map((batch, idx) => {
          return (
            <div
              key={batch.number}
              className={`${
                batches.length <= 1
                  ? "col-span-2"
                  : idx + 1 === batches.length && batches.length % 2 === 1
                  ? "col-span-2"
                  : "col-span-1"
              } px-2 border rounded`}
            >
              <div className="flex items-center justify-between text-lg">
                <div className="w-full text-gray-600">Batch {batch.number}</div>
                <div className="flex items-center justify-end w-full gap-2">
                  {/* <div>
                    <select name="" id="" className="border rounded border-zinc-300">
                      <option value="1">--</option>
                      <option value="2">Eric Sison</option>
                      <option value="3">Allyn Cubero</option>
                    </select>
                  </div> */}
                  <button
                    className="px-2 py-1 text-indigo-700 bg-white hover:bg-indigo-300 hover:text-white hover:rounded"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <span>Add</span>
                    </div>
                  </button>
                </div>
                <div>
                  <table></table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
