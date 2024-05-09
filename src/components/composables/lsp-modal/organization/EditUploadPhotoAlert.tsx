"use client";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@lms/components/osprey/ui/overlays/alert-dialog/view/AlertDialog";
import { useEditLspModalStore, useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent, MutableRefObject, useContext, useRef, useState } from "react";
import defaultPhoto from "../../../../../public/images/placeholders/user-placeholder-gray.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Storage } from "appwrite";
import { useLspExternal } from "@lms/hooks/use-lsp-external";
import { LspToastContext } from "../../lsp-tabs/LspTabs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { useOrgSlideOver } from "../../lsp-data-table/OrganizationLspDataTable";

export const EditUploadPhotoAlert: FunctionComponent = () => {
  const client = useLspExternal();
  const queryClient = useQueryClient();
  const [tempPhotoToUpload, setTempPhotoToUpload] = useState<File | null>(null);
  const [tempPhotoToUploadUrl, setTempPhotoToUploadUrl] = useState<string | null>(null);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const name = useLspDetailsStore((state) => state.name);
  // const lspId = useLspDetailsStore((state) => state.id);
  const photoUrl = useLspDetailsStore((state) => state.photoUrl);
  const photoToUpload = useLspDetailsStore((state) => state.photoToUpload);
  const setPhotoToUpload = useLspDetailsStore((state) => state.setPhotoToUpload);
  const photoToUploadUrl = useLspDetailsStore((state) => state.photoToUploadUrl);
  const setPhotoToUploadUrl = useLspDetailsStore((state) => state.setPhotoToUploadUrl);
  // const uploadAlertIsOpen = useEditLspModalStore((state) => state.uploadAlertIsOpen);
  // const setUploadAlertIsOpen = useEditLspModalStore((state) => state.setUploadAlertIsOpen);
  const { uploadAlertIsOpen, setUploadAlertIsOpen, id } = useOrgSlideOver();
  const setPhotoUrl = useLspDetailsStore((state) => state.setPhotoUrl);
  const { setToastOptions } = useContext(LspToastContext);
  const photoId = useLspDetailsStore((state) => state.photoId);
  const setPhotoId = useLspDetailsStore((state) => state.setPhotoId);

  const initialUploadPhotoMutation = useMutation({
    mutationFn: async () => {
      const storage = new Storage(client!);

      const uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
        // lspId!,
        uuidv4(),
        photoToUpload!
      );

      // find by $id
      const filePreview = await storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
        uploadedFile.$id
      );

      // lsp/upload/photo
      const updatePhotoDetails = await axios.patch(`${url}/lsp/upload/photo`, {
        lspId: id,
        photoId: uploadedFile.$id,
        photoUrl: filePreview.href,
      });
      return { photoId: uploadedFile.$id, photoUrl: filePreview.href };
    },
    onSuccess: async (data) => {
      // get file and set photoUrl
      setPhotoId(data.photoId);
      setPhotoUrl(data.photoUrl);
      setUploadAlertIsOpen(false);
      queryClient.setQueryData(["lsp-organization-details", id], data);
      setToastOptions("success", "Success", "You have successfully uploaded a photo!");
    },
    onError: () => {
      setToastOptions("danger", "Error", "Failed to upload to the server, please try again later.");
    },
  });

  const updateUploadPhotoMutation = useMutation({
    mutationFn: async () => {
      setPhotoUrl(null);
      const storage = new Storage(client!);

      const deleteExistingPhoto = await storage.deleteFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
        photoId!
      );

      const uploadedFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
        // lspId!,
        uuidv4(),
        photoToUpload!
      );

      // find by $id
      const filePreview = await storage.getFileView(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
        uploadedFile.$id
      );

      // lsp/upload/photo
      const updatePhotoDetails = await axios.patch(`${url}/lsp/upload/photo`, {
        lspId: id,
        photoId: uploadedFile.$id,
        photoUrl: filePreview.href,
      });

      return { photoId: uploadedFile.$id, photoUrl: filePreview.href };
    },
    onSuccess: async (data) => {
      setPhotoUrl(data.photoUrl);
      setPhotoId(data.photoId);
      queryClient.setQueryData(["lsp-organization-details", id], data);
      setToastOptions("success", "Success", "You have successfully changed the photo!");
      setUploadAlertIsOpen(false);
    },
  });
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
            <div className="text-lg font-semibold text-gray-600 p-5">{name}</div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex justify-center items-center">
              <Avatar
                source={
                  photoToUploadUrl && photoUrl
                    ? photoToUploadUrl
                    : photoToUploadUrl === null && photoUrl
                    ? photoUrl
                    : photoToUploadUrl && photoUrl === null
                    ? photoToUploadUrl
                    : defaultPhoto.src
                }
                size="10xl"
              />
            </div>
          </AlertDialogDescription>
          {photoUrl}
          <div className="flex justify-end py-4 px-2 space-x-2">
            {photoToUploadUrl === null ? (
              <>
                <Button
                  size="small"
                  variant="white"
                  className="w-[6rem]"
                  onClick={() => {
                    setPhotoToUploadUrl(null);
                    setPhotoToUpload(null);
                    setUploadAlertIsOpen(false);
                  }}
                >
                  Cancel
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
                    setPhotoToUploadUrl(null);
                    setPhotoToUpload(null);
                  }}
                >
                  Discard
                </Button>
                <Button
                  size="small"
                  variant="solid"
                  color="danger"
                  onClick={() => {
                    photoUrl ? updateUploadPhotoMutation.mutateAsync() : initialUploadPhotoMutation.mutateAsync();
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
            setPhotoToUpload(e.target.files[0]);
            setPhotoToUploadUrl(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
    </>
  );
};
