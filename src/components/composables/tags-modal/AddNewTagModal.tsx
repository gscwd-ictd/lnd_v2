"use client";

import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FunctionComponent, useState } from "react";

export const AddNewTagModal: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [name, setTagName] = useState("");
  const [isOpenToast, setIsOpenToast] = useState(false);

  const queryClient = useQueryClient();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setError,
  // } = useForm<Tags>();

  // const onSubmit: SubmitHandler<Tags> = (data) => {
  //   mutation.mutate();
  // };

  const mutation = useMutation({
    onSuccess: (data, variable) => {
      // console.log(data);
      setOpen(false);
      queryClient.refetchQueries({ queryKey: ["tags"], type: "all", exact: true, stale: true });
    },
    onError: () => console.log("error"),
    mutationFn: async () => {
      // console.log(tagName);
      // const response = await axios.post(`${url}/lsp-details`, data);
      // return response.data;
      // console.log(name);

      const response = await axios.post(`${url}/tags/`, { name });
      setIsOpenToast(true);
      return response.data;
    },
  });

  // const onSubmit = async () => {
  //   mutation.mutate();
  // };

  return (
    <>
      <Modal isOpen={open} setIsOpen={setOpen} size="md" isStatic>
        <Button
          onClick={() => {
            setOpen(true);
            // setTagName("");
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
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Tags</h3>
            <p className="text-sm text-gray-400">Add new tag</p>
          </ModalContent.Title>
          {/* <form method="post" onSubmit={handleSubmit(onSubmit)}> */}
          <form
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
          >
            <ModalContent.Body>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                {/* <Input size="small" {...register("name", { required: true })} /> */}
                <Input size="small" value={name} onChange={(e) => setTagName(e.target.value)} />
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
