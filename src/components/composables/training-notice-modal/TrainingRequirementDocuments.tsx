import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@lms/components/osprey/ui/checkbox/view/Checkbox";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import {
  TrainingRequirement,
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
  // const setTrainingDocuments = useTrainingNoticeStore((state) => state.setTrainingDocuments);
  const initialTrainingRequirements = useTrainingNoticeStore((state) => state.initialTrainingRequirements);
  const setInitialTrainingRequirements = useTrainingNoticeStore((state) => state.setInitialTrainingRequirements);
  const setPage = useTrainingNoticeModalStore((state) => state.setPage);
  const trainingRequirements = useTrainingNoticeStore((state) => state.trainingRequirements);
  const setTrainingRequirements = useTrainingNoticeStore((state) => state.setTrainingRequirements);
  const hasSetTrainingRequirements = useTrainingNoticeStore((state) => state.hasSetTrainingRequirements);
  const setHasSetTrainingRequirements = useTrainingNoticeStore((state) => state.setHasSetTrainingRequirements);

  const schema = yup.object({
    trainingRequirements: yup
      .array()
      .of(
        yup.object({
          document: yup.string().required(),
        })
      )
      .min(2)
      .required(),
  });

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    getValues,
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
    const newPtr = [...initialTrainingRequirements];
    newPtr[index].isSelected = !newPtr[index].isSelected;
    setInitialTrainingRequirements(newPtr);

    let newTrainingRequirements: TrainingRequirement[] = [];

    newPtr.map((doc) => {
      if (doc.isSelected) newTrainingRequirements.push({ document: doc.document });
    });

    setValue("trainingRequirements", newTrainingRequirements);
    setTrainingRequirements(newTrainingRequirements);
    if (getValues("trainingRequirements").length === 0) setError("trainingRequirements", { message: "Required" });
    else if (getValues("trainingRequirements").length > 0) clearErrors("trainingRequirements");
  };

  // useEffect(())

  useEffect(() => {
    if (!isEmpty(trainingRequirements)) {
      setValue("trainingRequirements", trainingRequirements);
    } else if (trainingRequirements.length === 0) setValue("trainingRequirements", undefined!);
  }, [trainingRequirements]);

  useEffect(() => {
    if (trainingRequirements && hasSetTrainingRequirements === false) {
      const tempTrainingRequirements = [...trainingRequirements];
      const newInitialTrainingRequirements = initialTrainingRequirements.map((ir: TrainingRequirement, index) => {
        tempTrainingRequirements.map((tr: TrainingRequirement) => {
          if (tr.document === ir.document) {
            // onChangePtr(index);
            return (ir.isSelected = true);
          }
        });
        return ir;
      });

      setInitialTrainingRequirements(newInitialTrainingRequirements);
      setHasSetTrainingRequirements(true);
    }
  }, [trainingRequirements]);

  useEffect(() => {
    register("trainingRequirements");
    // setValue("trainingRequirements", [{ document: "Attendance" }]);
  }, []);

  return (
    <>
      <form id="trainingDocumentsForm" key="trainingDocumentsForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 space-y-2">
          <div
            className={`text-sm items-center font-medium flex w-full justify-between ${
              errors.trainingRequirements ? "text-red-600" : "text-gray-700"
            }`}
          >
            <div>
              Training Requirement Documents <span className="text-red-600 text-md">*</span>
            </div>
            {errors.trainingRequirements ? <div className="text-xs font-normal">Select at least two (2)</div> : null}
          </div>

          {initialTrainingRequirements &&
            initialTrainingRequirements.map((doc, index) => {
              return (
                <>
                  {doc.document === "Attendance" ? (
                    <div key={index} className="flex items-center gap-2 p-2  bg-gray-200">
                      <input
                        id="checkbox-attendance"
                        type="checkbox"
                        checked={true}
                        className="border-2 border-gray-200 rounded-sm transition-colors  cursor-not-allowed hover:border-indigo-500 checked:bg-indigo-500 hover:checked:bg-indigo-500 focus:ring-indigo-500 focus:checked:bg-indigo-500"
                      />
                      <label htmlFor="checkbox-attendance" className="select-none">
                        Attendance <span className="text-xs ">(default)</span>
                      </label>
                    </div>
                  ) : (
                    <div key={index} className="flex items-center gap-2 p-2 border">
                      <Checkbox
                        id={`checkbox-${index}`}
                        label={doc.document}
                        checked={doc.isSelected}
                        onChange={() => onChangePtr(index)}
                      />
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </form>
    </>
  );
};
