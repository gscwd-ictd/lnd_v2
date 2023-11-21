import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import {
  InitialTrainingDocuments,
  TrainingDocument,
  useTrainingNoticeModalStore,
  useTrainingNoticeStore,
} from "@lms/utilities/stores/training-notice-store";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export type PostTrainingDocument = {
  document: string;
  isSelected: boolean;
};

export const TrainingRequirementDocuments: FunctionComponent = () => {
  const setTrainingDocuments = useTrainingNoticeStore((state) => state.setTrainingDocuments);
  const deadline = useTrainingNoticeStore((state) => state.deadlineForSubmission);
  const setDeadline = useTrainingNoticeStore((state) => state.setDeadlineForSubmission);
  const initialTrainingDocuments = useTrainingNoticeStore((state) => state.initialTrainingDocuments);
  const setInitialTrainingDocuments = useTrainingNoticeStore((state) => state.setInitialTrainingDocuments);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const trainingDocuments = useTrainingNoticeStore((state) => state.trainingDocuments);
  const trainingStart = useTrainingNoticeStore((state) => state.trainingStart);
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);
  const hasSetTrainingRequirements = useTrainingNoticeStore((state) => state.hasSetTrainingRequirements);
  const setHasSetTrainingRequirements = useTrainingNoticeStore((state) => state.setHasSetTrainingRequirements);
  const selectedTrainingSource = useTrainingNoticeStore((state) => state.selectedTrainingSource);

  const schema = yup.object({
    trainingDocuments: yup
      .array()
      .of(
        yup.object({
          document: yup.string().required(),
        })
      )
      .required(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = () => {
    setPage(7);
  };

  const onChangePtr = (index: number) => {
    const newPtr = [...initialTrainingDocuments];
    newPtr[index].isSelected = !newPtr[index].isSelected;
    setInitialTrainingDocuments(newPtr);

    let trainingDocuments: TrainingDocument[] = [];

    newPtr.map((doc) => {
      if (doc.isSelected) {
        trainingDocuments.push({ document: doc.document });
      }
    });
    setTrainingDocuments(trainingDocuments);
    setValue("trainingDocuments", trainingDocuments);
    if (trainingDocuments.length === 0) setError("trainingDocuments", { message: "Required" });
    else if (trainingDocuments.length > 0) clearErrors("trainingDocuments");
  };

  // useEffect(())

  useEffect(() => {
    if (!isEmpty(trainingDocuments)) {
      setValue("trainingDocuments", trainingDocuments);
    } else if (trainingDocuments.length === 0) setValue("trainingDocuments", undefined!);
  }, [trainingDocuments]);

  useEffect(() => {
    if (trainingRequirements && hasSetTrainingRequirements === false) {
      const newInitialTrainingDocuments = initialTrainingDocuments.map((ir: InitialTrainingDocuments, index) => {
        trainingRequirements.map((tr: TrainingDocument) => {
          {
            if (tr.document === ir.document) {
              onChangePtr(index);
              return (ir.isSelected = true);
            }
          }
        });
        return ir;
      });
      // console.log(test);
      setInitialTrainingDocuments(newInitialTrainingDocuments);
      setHasSetTrainingRequirements(true);
    }
  }, [trainingRequirements]);

  useEffect(() => {
    register("trainingDocuments");
  }, []);

  return (
    <>
      <form id="trainingDocumentsForm" key="trainingDocumentsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 space-y-2">
          <div
            className={`text-sm items-center font-medium flex w-full justify-between ${
              errors.trainingDocuments ? "text-red-600" : "text-gray-700"
            }`}
          >
            <div>Training Requirement Documents</div>
            {errors.trainingDocuments ? <div className="text-xs font-normal">Select at least one (1)</div> : null}
          </div>

          {initialTrainingDocuments &&
            initialTrainingDocuments.map((doc, index) => {
              return (
                <div key={index} className="flex items-center gap-2 p-2 border">
                  <Checkbox
                    id={`checkbox-${index}`}
                    label={doc.document}
                    checked={doc.isSelected}
                    onChange={() => onChangePtr(index)}
                  />
                </div>
              );
            })}
        </div>
      </form>
    </>
  );
};
