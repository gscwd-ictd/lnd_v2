import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useAddLspModalStore, useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent, MutableRefObject, useRef, useState } from "react";
import defaultPhoto from "../../../../../public/images/placeholders/user-placeholder-gray.png";
import { useMutation } from "@tanstack/react-query";

export const AddUploadPhotoAlert: FunctionComponent = () => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [tempUploadedPhoto, setTempUploadedPhoto] = useState<File | null>(null);
  const [tempUloadedPhotoUrl, setTempUploadedPhotoUrl] = useState<string | null>(null);
  const name = useLspDetailsStore((state) => state.name);
  const uploadAlertIsOpen = useAddLspModalStore((state) => state.uploadAlertIsOpen);
  const setPhotoToUploadUrl = useLspDetailsStore((state) => state.setPhotoToUploadUrl);
  const setUploadAlertIsOpen = useAddLspModalStore((state) => state.setUploadAlertIsOpen);
  const setPhotoToUpload = useLspDetailsStore((state) => state.setPhotoToUpload);

  return (
    <>
      <AlertDialog
        open={uploadAlertIsOpen}
        onOpenChange={() => {
          setUploadAlertIsOpen(!uploadAlertIsOpen);
          setPhotoToUploadUrl(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogTitle>
            <div className="text-lg font-semibold text-gray-600">{name ? name : "LSP Photo"}</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex justify-center items-center">
              <Avatar source={tempUloadedPhotoUrl ? tempUloadedPhotoUrl : defaultPhoto.src} size="10xl" />
            </div>
          </AlertDialogDescription>
          <div className="flex justify-end mt-4 space-x-2">
            {tempUloadedPhotoUrl === null ? (
              <>
                <Button
                  size="small"
                  variant="white"
                  className="w-[6rem]"
                  onClick={() => {
                    setPhotoToUploadUrl(null);
                    setUploadAlertIsOpen(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  size="small"
                  variant="solid"
                  color="primary"
                  className="w-[6rem]"
                  onClick={() => inputRef.current.click()}
                >
                  Open File
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  variant="white"
                  className="w-[6rem]"
                  onClick={() => {
                    // setPhotoToUploadUrl(null);
                    // setPhotoToUpload(null);
                    setTempUploadedPhotoUrl(null);
                    setTempUploadedPhoto(null);
                  }}
                >
                  Discard
                </Button>
                <Button
                  size="small"
                  variant="solid"
                  color="danger"
                  onClick={() => {
                    setUploadAlertIsOpen(false);
                    setPhotoToUpload(tempUploadedPhoto);
                    setPhotoToUploadUrl(tempUloadedPhotoUrl);
                  }}
                  className="w-[6rem]"
                >
                  Confirm
                </Button>
              </>
            )}
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <input
        type="file"
        ref={inputRef}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length === 0) {
          } else if (e.target.files) {
            setTempUploadedPhoto(e.target.files[0]);
            // setPhotoToUploadUrl(URL.createObjectURL(e.target.files[0]));
            setTempUploadedPhotoUrl(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
    </>
  );
};
