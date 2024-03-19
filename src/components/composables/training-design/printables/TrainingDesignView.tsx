import { Tiptap } from "@lms/components/osprey/ui/tiptap/view/Tiptap";
import { useTrainingNoticeStore } from "@lms/utilities/stores/training-notice-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JSONContent } from "@tiptap/react";
import axios from "axios";
import { useParams } from "next/navigation";
import { forwardRef, useState, HTMLAttributes } from "react";

export const TrainingDesignView = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, forwardedRef) => {
  const [trainingDesignId, setTrainingDesignId] = useState<string | JSONContent | null>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [rationale, setRationale] = useState<string | JSONContent | null>("");
  const [courseDescription, setCourseDescription] = useState<string | JSONContent | null>("");
  const [courseObjective, setCourseObjective] = useState<string | JSONContent | null>("");
  const [targetParticipants, setTargetParticipants] = useState<string | JSONContent | null>("");
  const [methodologies, setMethodologies] = useState<string | JSONContent | null>("");
  const [expectedOutput, setExpectedOutput] = useState<string | JSONContent | null>("");
  const [recognition, setRecognition] = useState<string | JSONContent | null>("");
  const params = useParams();

  const id = params.id.toString();

  useQuery({
    queryKey: ["training-design", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/training/designs/${id}`);

      setTrainingDesignId(data.id);
      setCourseTitle(data.courseTitle);
      setRationale(data.rationale);
      setCourseDescription(data.courseDescription);
      setCourseObjective(data.courseObjective);
      setTargetParticipants(data.targetParticipants);
      setMethodologies(data.methodologies);
      setExpectedOutput(data.expectedOutput);
      setRecognition(data.recognition);
      return data;
    },
    enabled: !!id,
  });

  return (
    <>
      {trainingDesignId ? (
        <div className="w-[816px]  bg-white text-sm">
          <div className="flex justify-center h-full">
            <header className="font-serif tracking-wider">
              <section className="leading-tight text-center">
                <h3>Republic of the Philippines</h3>
                <p className="font-semibold text-blue-500 uppercase">General Santos City Water District</p>
                <h3>E. Fernandez St., Brgy. Lagao, General Santos City</h3>
                <h3>Telephone No. (083) 552-3824 / Telefax No. (083) 553-4960</h3>
                <h3>E-mail Address: gscwaterdistrict@yahoo.com</h3>
                <p className="font-medium text-blue-500 underline underline-offset-2">www.gensanwater.gov.ph</p>
              </section>
            </header>
          </div>

          <hr className="w-full h-[2px] my-4 bg-gray-800 border-0 items-center mx-auto" />

          <div className="flex justify-center w-full font-semibold uppercase">Training Design</div>
          <div className="flex items-center font-semibold">Course Title: {courseTitle}</div>
          <div className="mt-4 font-semibold">I.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rationale</div>
          <Tiptap
            id="rationale"
            className="bg-white "
            content={rationale}
            setContent={setRationale}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">II.&nbsp;&nbsp;&nbsp;&nbsp;Course Description</div>
          <Tiptap
            id="course-desc"
            className="bg-white "
            content={courseDescription}
            setContent={setCourseDescription}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">III.&nbsp;&nbsp;&nbsp;Course Objectives</div>
          <Tiptap
            id="course-obj"
            className="bg-white "
            content={courseObjective}
            setContent={setCourseObjective}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">IV.&nbsp;&nbsp;Target Participants</div>
          <Tiptap
            id="target-participants"
            className="bg-white "
            content={targetParticipants}
            setContent={setTargetParticipants}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">V.&nbsp;&nbsp;&nbsp;Methodologies</div>
          <Tiptap
            id="methodologies"
            className="bg-white "
            content={methodologies}
            setContent={setMethodologies}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">Expected Outputs</div>
          <Tiptap
            id="expected-outputs"
            className="bg-white "
            content={expectedOutput}
            setContent={setExpectedOutput}
            type="JSON"
            viewOnly
            editable={false}
          />

          <div className="mt-4 font-semibold">Recognition</div>
          <Tiptap
            id="expected-outputs"
            className="bg-white "
            content={recognition}
            setContent={setRecognition}
            type="JSON"
            viewOnly
            editable={false}
          />
        </div>
      ) : (
        <>TEST</>
      )}
    </>
  );
});

TrainingDesignView.displayName = "TrainingDesignView";
