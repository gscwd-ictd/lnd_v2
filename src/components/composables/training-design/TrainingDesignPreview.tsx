import { Tiptap } from "@lms/components/osprey/ui/tiptap/view/Tiptap";
import { JSONContent } from "@tiptap/react";
import { isEmpty } from "lodash";
import { Dispatch, FunctionComponent, SetStateAction } from "react";
import Image from "next/image";
import gscwd_logo from "../../../../public/images/document/gscwd_logo.png";
import iso_logo from "../../../../public/images/document/iso_logo.jpg";

type TrainingDesignPreviewProps = {
  training: {
    courseTitle: string;
    setCourseTitle: Dispatch<SetStateAction<string>>;
    rationale: string | JSONContent | null;
    setRationale: Dispatch<SetStateAction<string | JSONContent | null>>;
    courseDescription: string | JSONContent | null;
    setCourseDescription: Dispatch<SetStateAction<string | JSONContent | null>>;
    courseObjective: string | JSONContent | null;
    setCourseObjective: Dispatch<SetStateAction<string | JSONContent | null>>;
    targetParticipants: string | JSONContent | null;
    setTargetParticipants: Dispatch<SetStateAction<string | JSONContent | null>>;
    methodologies: string | JSONContent | null;
    setMethodologies: Dispatch<SetStateAction<string | JSONContent | null>>;
    expectedOutput: string | JSONContent | null;
    setExpectedOutput: Dispatch<SetStateAction<string | JSONContent | null>>;
    recognition: string | JSONContent | null;
    setRecognition: Dispatch<SetStateAction<string | JSONContent | null>>;
  };
};

export const TrainingDesignPreview: FunctionComponent<TrainingDesignPreviewProps> = ({ training }) => {
  const {
    courseDescription,
    courseObjective,
    courseTitle,
    expectedOutput,
    methodologies,
    rationale,
    recognition,
    setCourseDescription,
    setCourseObjective,
    setCourseTitle,
    setExpectedOutput,
    setMethodologies,
    setRationale,
    setRecognition,
    setTargetParticipants,
    targetParticipants,
  } = training;
  return (
    <div className="p-4">
      {!isEmpty(training.courseTitle) ? (
        <div className="flex justify-center w-full">
          <div className="items-center w-[815px] px-20 py-10 bg-white border rounded">
            <div className="flex justify-center">
              <header className="flex items-center w-full h-full grid-cols-3 font-serif text-sm leading-tight -tracking-normal">
                <div className="w-[15%]">
                  <Image src={gscwd_logo} alt="gscwd logo" height={105} />
                </div>
                <section className="w-[70%]  leading-tighter text-center">
                  <h3>Republic of the Philippines</h3>
                  <p className="font-semibold text-blue-500 uppercase">General Santos City Water District</p>
                  <h3>E. Fernandez St., Brgy. Lagao, General Santos City</h3>
                  <h3>Telephone No. (083) 552-3824 / Telefax No. (083) 553-4960</h3>
                  <h3>E-mail Address: gscwaterdistrict@yahoo.com</h3>
                  <p className="font-medium text-blue-500 underline underline-offset-2">www.gensanwater.gov.ph</p>
                </section>
                <div className="w-[15%]">
                  <Image src={iso_logo} alt="iso logo" />
                </div>
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
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">II.&nbsp;&nbsp;&nbsp;&nbsp;Course Description</div>
            <Tiptap
              id="course-desc"
              className="bg-white "
              content={courseDescription}
              setContent={setCourseDescription}
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">III.&nbsp;&nbsp;&nbsp;Course Objectives</div>
            <Tiptap
              id="course-obj"
              className="bg-white "
              content={courseObjective}
              setContent={setCourseObjective}
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">IV.&nbsp;&nbsp;Target Participants</div>
            <Tiptap
              id="target-participants"
              className="bg-white "
              content={targetParticipants}
              setContent={setTargetParticipants}
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">V.&nbsp;&nbsp;&nbsp;Methodologies</div>
            <Tiptap
              id="methodologies"
              className="bg-white "
              content={methodologies}
              setContent={setMethodologies}
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">Expected Outputs</div>
            <Tiptap
              id="expected-outputs"
              className="bg-white "
              content={expectedOutput}
              setContent={setExpectedOutput}
              viewOnly
              editable={false}
            />

            <div className="mt-4 font-semibold">Recognition</div>
            <Tiptap
              id="expected-outputs"
              className="bg-white "
              content={recognition}
              setContent={setRecognition}
              viewOnly
              editable={false}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
