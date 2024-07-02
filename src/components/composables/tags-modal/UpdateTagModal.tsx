import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { url } from "@lms/utilities/url/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Tag = {
  id: string;
  name: string;
};
// { id }: { id: string }
type UpdateTagModalProps = {
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export const UpdateTagModal: FunctionComponent<UpdateTagModalProps> = ({ id, update, setUpdate }) => {
  // const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [isOpenToast, setIsOpenToast] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<Tag>();

  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.patch(`${url}/tags/${id}`, { name: getValues().name });
    },
    onError: (error) => {},
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ["tags"],
        type: "all",
        exact: true,
        stale: true,
      });
    },
  });

  const onSubmit: SubmitHandler<Tag> = async () => {
    mutation.mutate();
    setIsOpenToast(true);
    setUpdate(false);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${url}/tags/${id}`);
      setTag(data.name);
    };
    getData();
  }, [id]);

  return (
    <>
      <Modal isOpen={update} setIsOpen={setUpdate} size="md" isStatic>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Tags</h3>
            <p className="text-sm text-gray-400">Update tag</p>
          </ModalContent.Title>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <ModalContent.Body>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, ref, name } }) => {
                    return (
                      <Input
                        name={name}
                        value={tag}
                        onChange={(e) => {
                          setTag(e.target.value);
                          onChange(e);
                        }}
                        ref={ref}
                        size="small"
                      />
                    );
                  }}
                />
              </div>
            </ModalContent.Body>
            <ModalContent.Footer>
              <div className="flex items-center justify-end py-1">
                <Button size="small" className="">
                  Update
                </Button>
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
        content="Successfully Updated."
      />
    </>
  );
};
