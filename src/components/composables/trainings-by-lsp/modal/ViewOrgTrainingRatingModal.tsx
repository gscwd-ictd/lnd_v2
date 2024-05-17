import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useTrainingNoticeStore, useTrainingTypesStore } from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState } from "react";
import { ViewTrainingDetails } from "../ViewTrainingDetails";
import { TrainingIndLspRatingContext } from "../../lsp-data-table/IndividualLspDataTable";
import { TrainingOrgLspRatingContext } from "../../lsp-data-table/OrganizationLspDataTable";

type ViewTrainingRatingModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ViewOrgTrainingRatingModal: FunctionComponent = () => {
  const id = useTrainingNoticeStore((state) => state.id);
  const setLocation = useTrainingNoticeStore((state) => state.setLocation);
  const setSelectedTrainingType = useTrainingTypesStore((state) => state.setSelectedTrainingType);
  const reset = useTrainingNoticeStore((state) => state.reset);
  const setSelectedTags = useTrainingNoticeStore((state) => state.setSelectedTags);
  const setNumberOfHours = useTrainingNoticeStore((state) => state.setNumberOfHours);
  const setCourseTitle = useTrainingNoticeStore((state) => state.setCourseTitle);
  const setTrainingNoticeId = useTrainingNoticeStore((state) => state.setId);
  const setTrainingEnd = useTrainingNoticeStore((state) => state.setTrainingEnd);
  const setTrainingStart = useTrainingNoticeStore((state) => state.setTrainingStart);
  const setSelectedFacilitators = useTrainingNoticeStore((state) => state.setSelectedFacilitators);
  const setNumberOfParticipants = useTrainingNoticeStore((state) => state.setNumberOfParticipants);
  const { ratingIsOpen, setRatingIsOpen, rating, setRating } = useContext(TrainingOrgLspRatingContext);
  const [initialRating, setInitialRating] = useState<number>(0);
  const [ratingIsClicked, setRatingIsClicked] = useState<boolean>(false);

  // this is to fetch the training details
  const { isLoading, isFetching, data, isError } = useQuery({
    queryKey: ["training-details", id],
    enabled: !!id && ratingIsOpen !== false,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/${id}`, { withCredentials: true });
      setNumberOfParticipants(data.numberOfParticipants);
      setCourseTitle(data.courseTitle);
      setTrainingStart(data.trainingStart);
      setTrainingEnd(data.trainingEnd);
      setNumberOfHours(data.numberOfHours);
      setSelectedTags(data.trainingTags);
      setLocation(data.location);
      setSelectedTrainingType(data.type);
      setSelectedFacilitators(data.trainingLspDetails);
      return data;
    },
  });

  useEffect(() => {
    if (ratingIsOpen && initialRating === 0) {
      setInitialRating(rating);
    }
  }, [ratingIsOpen, rating, initialRating]);

  return (
    <>
      <Modal
        isOpen={ratingIsOpen}
        setIsOpen={setRatingIsOpen}
        size="lg"
        isStatic
        onClose={() => {
          setRatingIsOpen(false);
          setRating(0);
          reset();
        }}
      >
        <ModalContent>
          <ModalContent.Title></ModalContent.Title>
          <ModalContent.Body>
            <main className="px-2 py-8">
              {JSON.stringify(id)}
              <div className="flex grid-cols-2 w-full px-3">
                <div className="w-[40%] font-sans px-2">
                  <ViewTrainingDetails />
                </div>
                <div className="w-[60%] rounded-md border-2 border-dashed items-center flex flex-col justify-center gap-4 p-5">
                  <h3 className="text-3xl font-medium">Rate this training</h3>
                  <div className="flex gap-2 p-4 bg-gray-100 rounded-full items-center">
                    {/* FIRST */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRating(1);
                        initialRating !== 1 ? setRatingIsClicked(true) : setRatingIsClicked(false);
                      }}
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-12 h-12  
                      ${rating >= 1 ? "fill-yellow-500" : "fill-gray-400"}
                        text-black"`}
                        // ${(info.getValue() as number) >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* SECOND */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRating(2);
                        initialRating !== 2 ? setRatingIsClicked(true) : setRatingIsClicked(false);
                      }}
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-12 h-12  
                          ${rating >= 2 ? "fill-yellow-500" : "fill-gray-400"}
                        text-black"`}
                        // ${(info.getValue() as number) >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* THIRD */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRating(3);
                        initialRating !== 3 ? setRatingIsClicked(true) : setRatingIsClicked(false);
                      }}
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-12 h-12  
                          ${rating >= 3 ? "fill-yellow-500" : "fill-gray-400"}
                        text-black"`}
                        // ${(info.getValue() as number) >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* FOURTH */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRating(4);
                        initialRating !== 4 ? setRatingIsClicked(true) : setRatingIsClicked(false);
                      }}
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-12 h-12  
                          ${rating >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                        text-black"`}
                        // ${(info.getValue() as number) >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* FIFTH */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setRating(5);
                        initialRating !== 5 ? setRatingIsClicked(true) : setRatingIsClicked(false);
                      }}
                      tabIndex={-1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-12 h-12  
                          ${rating >= 5 ? "fill-yellow-500" : "fill-gray-400"}
                        text-black"`}
                        // ${(info.getValue() as number) >= 4 ? "fill-yellow-500" : "fill-gray-400"}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="text-gray-700 text-lg">
                      <span>{rating} out of 5</span>
                    </div>
                  </div>
                  {ratingIsClicked === true && (
                    <div className="w-full flex flex-col items-center gap-1">
                      <button className="px-3 rounded py-2 bg-indigo-500 text-white w-[50%]">Submit</button>
                      <button className="px-3 rounded py-2 bg-transparent text-gray-500 w-[50%]">No Thanks</button>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </ModalContent.Body>
        </ModalContent>
      </Modal>
    </>
  );
};
