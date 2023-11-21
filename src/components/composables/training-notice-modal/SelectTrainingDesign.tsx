import { Combobox } from "@headlessui/react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { SelectedTrainingDesign, useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import axios from "axios";
import { FunctionComponent, useEffect, useState } from "react";

export const SelectTrainingDesign: FunctionComponent = () => {
  const [searchTd, setSearchTd] = useState<string>("");
  const [trainingDesigns, setTrainingDesigns] = useState<SelectedTrainingDesign[]>([]);

  const { selectedTrainingDesign, trainingDesign, setTrainingDesign, setSelectedTrainingDesign, setCourseTitle } =
    useTrainingNoticeStore((state) => ({
      trainingDesign: state.trainingDesign,
      selectedTrainingDesign: state.selectedTrainingDesign,
      setSelectedTrainingDesign: state.setSelectedTrainingDesign,
      setTrainingDesign: state.setTrainingDesign,
      setCourseTitle: state.setCourseTitle,
    }));

  const filteredTds =
    searchTd === ""
      ? trainingDesigns
      : trainingDesigns.filter((element) => element.courseTitle.toLowerCase().includes(searchTd.toLowerCase()));

  useEffect(() => {
    const getTrainingDesigns = async () => {
      const result = await axios.get(`${url}/training-designs?limit=500`);
      setTrainingDesigns(result.data.items);
    };

    getTrainingDesigns();
  }, []);

  return (
    <>
      <div className="mt-1">
        <div className="mt-1 mb-4">
          <div className="mb-2">
            <label htmlFor="training-design" className="block text-xs font-medium text-gray-700">
              Training Design
            </label>
            <p className="text-xs text-gray-500">Select a training design.</p>
          </div>
          <div className="relative">
            <Combobox
              value={selectedTrainingDesign}
              onChange={(value) => {
                /** this selects the previously selected tag and compares it to the event value
                 * and sets the hasfetchedrecommendations boolean variable
                 */

                setSelectedTrainingDesign(value);
                setTrainingDesign({ id: value.id, courseTitle: value.courseTitle });
                // setCourseTitle(value.courseTitle);
              }}
            >
              <Combobox.Input
                id="search-td"
                as={Input}
                size="small"
                autoComplete="off"
                displayValue={() => selectedTrainingDesign.courseTitle}
                onChange={(e) => {
                  setTrainingDesign({ ...trainingDesign, courseTitle: e.target.value });
                  setSearchTd(e.target.value);
                }}
                placeholder="Search tag"
                className="placeholder:text-xs"
              />

              <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
                {filteredTds?.length === 0 ? (
                  <div className="flex items-center justify-center py-10">No results found</div>
                ) : (
                  filteredTds?.map((td, index) => {
                    return (
                      <Combobox.Option key={index} value={td}>
                        {({ active }) => {
                          return (
                            <div
                              role="button"
                              className={`${
                                active ? "bg-indigo-500 text-white" : ""
                              } border-b border-b-gray-100 px-2 py-1`}
                            >
                              <h3 className={`${active ? "text-indigo-50" : "text-gray-700"} font-medium`}>
                                {td.courseTitle}
                              </h3>
                            </div>
                          );
                        }}
                      </Combobox.Option>
                    );
                  })
                )}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>
      </div>
    </>
  );
};
