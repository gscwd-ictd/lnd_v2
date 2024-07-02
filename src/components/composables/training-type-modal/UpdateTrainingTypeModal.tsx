"use client";

import { Modal, ModalContent, ModalTrigger } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TrainingType } from "@lms/utilities/types/training-type.type";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UdpdateTrainingTypeModalProps = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const UdpdateTrainingTypeModal: FunctionComponent<UdpdateTrainingTypeModalProps> = ({
  id,
  update,
  setUpdate,
}) => {
  // const [trainingType, setTrainingType] = useState<TrainingType>();
  const queryClient = useQueryClient();
  const [trainingType, setTrainingType] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<TrainingType>();

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.patch(`${url}/training-types/${id}`, { name: getValues().name });
    },
    onError: (error) => {},
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["training-type"],
        type: "all",
        exact: true,
        stale: true,
      });
    },
  });

  const onSubmit: SubmitHandler<TrainingType> = async () => {
    mutation.mutate();
    setUpdate(false);
  };

  //Initialize training type name
  useEffect(() => {
    const getData = async () => {
      if (update) {
        const { data } = await axios.get<TrainingType>(`${url}/training-types/${id}`);
        setTrainingType(data.name);
      }
    };

    getData();
  }, [id, update]);

  return (
    <>
      <Modal
        isOpen={update}
        setIsOpen={(update) => {
          setUpdate(update);
        }}
        size="md"
        isStatic={true}
        onClose={() => {
          setTrainingType(trainingType);
        }}
      >
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Training Type</h3>
            <p className="text-sm text-gray-400">Update training type</p>
          </ModalContent.Title>

          <ModalContent.Body>
            <form id="training-type" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Training Type</label>
                {/* <Input
                  {...register("name", {
                    value: trainingType,
                    onChange: (e) => {
                      setTrainingType(e.target.value);
                    },
                  })}
                /> */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, ref, name } }) => (
                    <Input
                      name={name}
                      ref={ref}
                      value={trainingType ? trainingType : ""}
                      onChange={(e) => {
                        setTrainingType(e.target.value);
                        onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </form>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex items-center justify-end py-1">
              <Button type="submit" form="training-type" size="small">
                Update
              </Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
