import {
  Recommendation,
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
} from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import axios from "axios";
import { FunctionComponent, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { isEmpty } from "lodash";

export const Recommendations: FunctionComponent = () => {
  //const [recommendation, setRecommendation] = useState<Recommendation[]>([]);
  const selectedTags = useTrainingNoticeStore((state) => state.selectedTags);
  const consumedSlots = useTrainingNoticeStore((state) => state.consumedSlots);
  const setConsumedSlots = useTrainingNoticeStore((state) => state.setConsumedSlots);
  const recommendation = useTrainingNoticeStore((state) => state.recommendations);
  const hasFetchedRecommendations = useTrainingNoticeStore((state) => state.hasFetchedRecommendations);
  const setHasFetchedRecommendations = useTrainingNoticeStore((state) => state.setHasFetchedRecommendations);
  const setRecommendation = useTrainingNoticeStore((state) => state.setRecommendations);
  const slotDistribution = useTrainingNoticeStore((state) => state.slotDistribution);
  const setSlotDistribution = useTrainingNoticeStore((state) => state.setSlotDistribution);
  const setTrainingDistribution = useTrainingNoticeStore((state) => state.setTrainingDistribution);
  const trainingDistribution = useTrainingNoticeStore((state) => state.trainingDistribution);
  const action = useTrainingNoticeModalStore((state) => state.action);
  const numberOfParticipants = useTrainingNoticeStore((state) => state.numberOfParticipants);

  useEffect(() => {
    if (hasFetchedRecommendations === false && !isEmpty(selectedTags)) {
      const getRecommendedEmployees = async () => {
        const result = await axios.get(`${url}/hrms/employee-tags/tag/${selectedTags[0].id}`);
        result.data.map((slot: Recommendation) => {
          slot.numberOfSlots = 0;
          return slot;
        });
        setSlotDistribution(result.data);

        if (!isEmpty(result.data)) {
          setHasFetchedRecommendations(true);
        }
      };

      getRecommendedEmployees();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, hasFetchedRecommendations, action]);

  useEffect(() => {
    if (slotDistribution.length > 0) {
      const sum = slotDistribution.reduce((accumulator, object) => {
        if (object.numberOfSlots >= 0) {
          return accumulator + object.numberOfSlots;
        } else return accumulator;
      }, 0);
      setConsumedSlots(sum);
    }
  }, [slotDistribution]);

  return (
    <>
      <div>
        <div className="mt-5 mb-2">
          <p className="text-sm font-medium text-right text-gray-500">
            Number of participants:{" "}
            {consumedSlots <= numberOfParticipants ? (
              consumedSlots
            ) : (
              <span className="text-red-500">{consumedSlots}</span>
            )}
            / {numberOfParticipants}
          </p>
        </div>

        <ul className="space-y-3">
          {slotDistribution.length > 0 ? (
            slotDistribution.map((data, index) => (
              <Disclosure key={index}>
                <div key={index} className="border-t border-b border-l-4 border-r border-l-indigo-500">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2">
                      <div className="text-start">
                        <span className="text-lg font-semibold text-gray-700">{data.supervisor.supervisorName}</span>
                        <p className="text-sm text-gray-500">
                          {data.employees.length > 1 ? (
                            <span className="text-gray-500">{data.employees.length} recommended participants</span>
                          ) : (
                            <span className="text-gray-500">{data.employees.length} recommended participant</span>
                          )}
                        </p>
                      </div>
                    </Disclosure.Button>

                    {/* <button className="px-2 py-1 bg-blue-300 rounded" onClick={() => console.log(data.slot)}>
                      log
                    </button> */}
                    <div className="p-2">
                      <input
                        type="number"
                        min={0}
                        max={numberOfParticipants}
                        value={Number(data.numberOfSlots) ?? 0}
                        className="w-20 border-gray-300 rounded focus:border-indigo-400"
                        onChange={(e) => {
                          const newSlotDistribution = [...slotDistribution];
                          newSlotDistribution[index].numberOfSlots = Number(e.target.value);
                          setSlotDistribution(newSlotDistribution);
                        }}
                      />
                    </div>
                  </div>

                  <Disclosure.Panel className="px-4 py-2">
                    <ul>
                      {data.employees.map((emp, index) => (
                        <div key={index}>
                          <li className="text-sm text-gray-700">{emp.employeeFullName}</li>
                        </div>
                      ))}
                    </ul>
                  </Disclosure.Panel>
                </div>
              </Disclosure>
            ))
          ) : (
            <div className="flex w-full h-[6rem] border-4 border-dashed">
              <div className="flex items-center justify-center w-full text-center">
                <span className="text-gray-600 uppercase"> No recommended participants found</span>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
