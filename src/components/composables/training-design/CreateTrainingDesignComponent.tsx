import { FunctionComponent } from "react";
import { Tiptap } from "@lms/components/osprey/ui/tiptap/view/Tiptap";
import { JSONContent } from "@tiptap/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrainingDesignPreview } from "@lms/components/composables/training-design/TrainingDesignPreview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { isEmpty } from "lodash";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";

export const CreateTrainingDesignComponent: FunctionComponent = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const [rationale, setRationale] = useState<string | JSONContent | null>("");
  const [courseDescription, setCourseDescription] = useState<string | JSONContent | null>("");
  const [courseObjective, setCourseObjective] = useState<string | JSONContent | null>("");
  const [targetParticipants, setTargetParticipants] = useState<string | JSONContent | null>("");
  const [methodologies, setMethodologies] = useState<string | JSONContent | null>("");
  const [expectedOutput, setExpectedOutput] = useState<string | JSONContent | null>("");
  const [recognition, setRecognition] = useState<string | JSONContent | null>("");
  // const [trainingDesign, setTrainingDesign] = useState<string | JSONContent | null>("");
  const [page, setPage] = useState<number>(1);

  const trainingDesign = {
    courseTitle,
    setCourseTitle,
    rationale,
    setRationale,
    courseDescription,
    setCourseDescription,
    courseObjective,
    setCourseObjective,
    targetParticipants,
    setTargetParticipants,
    methodologies,
    setMethodologies,
    expectedOutput,
    setExpectedOutput,
    recognition,
    setRecognition,
  };

  // const

  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const onPrev = () => {
    page === 1 ? push("/trainings/design") : page === 2 ? setPage(1) : null;
  };

  const onNext = () => {
    if (page === 1) {
      if (
        isEmpty(courseTitle) ||
        isEmpty(rationale) ||
        isEmpty(courseDescription) ||
        isEmpty(courseObjective) ||
        isEmpty(targetParticipants) ||
        isEmpty(methodologies) ||
        isEmpty(expectedOutput) ||
        isEmpty(recognition)
      )
        setToastOptions("danger", "Error", "Fill-in all fields!");
      else setPage(2);
    } else if (page === 2) {
      tdDataTableMutation.mutate();
    }
  };

  const tdDataTableMutation = useMutation({
    onSuccess: (data) => {
      push(`/trainings/design`);
      queryClient.setQueryData(["training_design"], (oldData: any) => {
        const newData = [...oldData];
        newData.push(data);
        return newData;
      });
    },
    onError: (error) => console.log(error),
    mutationFn: async () => {
      console.log({
        courseTitle,
        rationale,
        courseDescription,
        courseObjective: courseObjective,
        targetParticipants,
        methodologies,
        expectedOutput,
        recognition,
      });
      const response = await axios.post(`${url}/training-designs`, {
        courseTitle,
        rationale,
        courseDescription,
        courseObjective: courseObjective,
        targetParticipants,
        methodologies,
        expectedOutput,
        recognition,
      });

      return response.data;
    },
  });

  return (
    <div className="px-5 py-5">
      <button className="flex gap-1 py-1" onClick={() => push("/trainings/design")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
            className="fill-indigo-700 hover:fill-indigo-700"
          />
        </svg>
        <span className="text-indigo-700 hover:text-indigo-600">Go back</span>
      </button>

      <div className="p-10 mt-5 bg-white border rounded">
        <div className="flex justify-between w-full text-center">
          <div className="text-left">
            <div className="text-2xl font-medium text-gray-700">Create Training Design</div>
            <div className="text-xs text-gray-500">
              Specify the training title, rationale, course description, instructional objectives, target participants,
              methodologies, expected output, and recognition.
            </div>
          </div>

          <div className="flex gap-2">
            {page === 1 ? null : (
              <button
                type="button"
                onClick={onPrev}
                className="px-2 py-1 text-sm font-medium sm:min-w-[3rem] md:min-w-[6rem] lg:min-w-[6rem] h-[2.5rem] rounded hover:bg-gray-200 text-gray-600 bg-gray-300 border"
              >
                {page === 1 ? "Cancel" : "Back to Edit"}
              </button>
            )}
            <button
              type="button"
              onClick={onNext}
              className="px-2 py-1 text-sm font-medium sm:min-w-[3rem] md:min-w-[6rem] lg:min-w-[6rem] h-[2.5rem] rounded text-white hover:bg-indigo-400 bg-indigo-500"
            >
              {page === 1 ? "Preview" : page === 2 ? "Submit" : ""}
            </button>
          </div>
        </div>
        {page === 1 ? (
          <div className="w-full pt-10">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-1">
                <label htmlFor="course-title" className="font-semibold text-gray-700">
                  Course Title
                </label>
                <input
                  id="course-title"
                  autoComplete="off"
                  value={courseTitle}
                  placeholder="Input course title here..."
                  className="w-full border-none rounded focus:ring-0 bg-zinc-200/50 placeholder:text-gray-400"
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </div>

              {/* RATIONALE */}
              <div className="flex flex-col gap-1">
                <label htmlFor="rationale" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Rationale</span>
                  <span className="text-sm text-gray-500">
                    Background or introduction of what the training is all about.
                  </span>
                </label>

                <Tiptap id="rationale" content={rationale!} setContent={setRationale} />
              </div>

              {/* COURSE DESCRIPTION */}
              <div className="flex flex-col gap-1">
                <label htmlFor="course-desc" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Course Description</span>
                  <span className="text-sm text-gray-500">
                    Describe what needs are being addressed by the training.
                  </span>
                </label>

                <Tiptap id="course-desc" content={courseDescription!} setContent={setCourseDescription} />
              </div>

              {/* COURSE OBJECTIVES */}
              <div className="flex flex-col gap-1">
                <label htmlFor="course-obj" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Course Objectives</span>
                  <span className="text-sm text-gray-500">Indicate what will be covered in the course.</span>
                </label>

                <Tiptap id="course-obj" content={courseObjective!} setContent={setCourseObjective} />
              </div>

              {/* TARGET PARTICIPANTS */}
              <div className="flex flex-col gap-1">
                <label htmlFor="target-participants" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Target Participants</span>
                  <span className="text-sm text-gray-500">Determine the people who will take part of the course.</span>
                </label>

                <Tiptap id="target-participants" content={targetParticipants!} setContent={setTargetParticipants} />
              </div>

              {/* METHODOLOGIES */}
              <div className="flex flex-col gap-1">
                <label htmlFor="methodologies" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Methodologies </span>
                  <span className="text-sm text-gray-500">
                    The specific procedures or techniques used to identify, select, process, and analyze information
                    about the course.
                  </span>
                </label>

                <Tiptap id="methodologies" content={methodologies!} setContent={setMethodologies} />
              </div>

              {/* EXPECTED OUTPUTS */}
              <div className="flex flex-col gap-1">
                <label htmlFor="expected-output" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Expected Output</span>
                  <span className="text-sm text-gray-500">
                    A detailed description of what a participant must be able to do or achieve at the conclusion of a
                    course.
                  </span>
                </label>

                <Tiptap id="expected-output" content={expectedOutput!} setContent={setExpectedOutput} />
              </div>

              {/* RECOGNITION */}
              <div className="flex flex-col gap-1">
                <label htmlFor="recognition" className="flex flex-col">
                  <span className="font-semibold text-gray-700">Recognition</span>
                  <span className="text-sm text-gray-500"></span>
                </label>

                <Tiptap id="recognition" content={recognition!} setContent={setRecognition} />
              </div>
            </div>
          </div>
        ) : page === 2 ? (
          <TrainingDesignPreview training={trainingDesign} />
        ) : null}
      </div>

      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </div>
  );
};
