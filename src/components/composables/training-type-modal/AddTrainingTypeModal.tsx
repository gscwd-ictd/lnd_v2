"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Modal, ModalContent, ModalTrigger } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { TrainingType } from "@lms/utilities/types/training-type.type";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";

const schema = yup
  .object({
    name: yup.string().required("Required field"),
  })
  .required();

export const AddTrainingTypeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ name: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    const res = await axios.post(`${url}/training-types`, data);
    setIsOpenToast(true);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        size="small"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        size="md"
        isStatic={true}
        onClose={() => {
          setError("name", { message: "" });
        }}
      >
        <ModalTrigger asChild></ModalTrigger>
        <ModalContent>
          <ModalContent.Title>
            {/* <h3 className="text-2xl text-gray-700 font-semibold"></h3>
            <p className="text-gray-500"></p> */}
            <h3 className="text-lg font-semibold text-gray-600">Training Type</h3>
            <p className="text-sm text-gray-400">Add new training type</p>
          </ModalContent.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <ModalContent.Body>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Training Type</label>
                <Input
                  color={errors.name?.message ? "error" : "primary"}
                  {...register("name", { required: true })}
                  helperText={errors.name?.message}
                />
              </div>
            </ModalContent.Body>
            <ModalContent.Footer>
              <div className="flex items-center justify-end py-1">
                <Button size="small">Confirm</Button>
              </div>
            </ModalContent.Footer>
          </form>
        </ModalContent>
      </Modal>
      <Toast
        duration={2000}
        open={isOpenToast}
        setOpen={setIsOpenToast}
        color="success"
        title="Success"
        content="Successfully Added."
      />
    </>
  );
};
