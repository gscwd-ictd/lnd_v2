import { FileThumbnail } from "@lms/components/features/Thumbnail";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { useBenchmarking } from "@lms/hooks/use-benchmarking";
import { useBenchmarkingStore, useEditBenchmarkingModalStore } from "@lms/utilities/stores/benchmarking-store";
import { useQuery } from "@tanstack/react-query";
import convertSize from "convert-size";
import { FunctionComponent, MutableRefObject, createContext, useContext, useRef, useState } from "react";
import { Storage } from "appwrite";
import axios from "axios";
import { isEmpty } from "lodash";
import { BucketFile } from "@lms/utilities/stores/training-notice-store";
import Link from "next/link";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { useBenchmarkingToastOptions } from "../data-table/BenchmarkingDataTable";
import { HiExclamation } from "react-icons/hi";
import { AlertNotification } from "@lms/components/osprey/ui/alert-notification/view/AlertNotification";

type FileToUploadCardProps = {
  file: File;
  fileId: number;
};

type FilesToUploadContextState = {
  inputRef: MutableRefObject<HTMLInputElement>;
};

type UploadedFileProps = {
  file: BucketFile;
};

const FilesToUploadContext = createContext({} as FilesToUploadContextState);

export const EditUploadActivityAttachment: FunctionComponent = () => {
  const id = useBenchmarkingStore((state) => state.id);
  const client = useBenchmarking();
  const bucketFiles = useBenchmarkingStore((state) => state.bucketFiles);
  const setBucketFiles = useBenchmarkingStore((state) => state.setBucketFiles);
  const hasFetchedFiles = useEditBenchmarkingModalStore((state) => state.hasFetchedFiles);
  const setHasFetchedFiles = useEditBenchmarkingModalStore((state) => state.setHasFetchedFiles);
  const modalIsOpen = useEditBenchmarkingModalStore((state) => state.modalIsOpen);
  const action = useBenchmarkingStore((state) => state.action);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const setFilesToUpload = useBenchmarkingStore((state) => state.setFilesToUpload);
  const { setToastOptions } = useBenchmarkingToastOptions();

  // fetch uploaded files
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["uploaded-benchmarking-files", id],
    queryFn: async () => {
      const storage = new Storage(client!);
      const getBucketListFiles = await axios.get(
        `${process.env.NEXT_PUBLIC_LND_FE_URL}/api/bucket/benchmarking?id=${id}`
      );

      if (getBucketListFiles.data.files.length > 0) {
        const newBucketFiles = Promise.all(
          getBucketListFiles.data.files.map(async (file: any) => {
            const fileDetails = await storage.getFile(id!, file.$id);
            const filePreview = storage.getFilePreview(id!, file.$id);
            const fileView = storage.getFileView(id!, file.$id);

            return {
              id: file.$id,
              name: fileDetails.name,
              href: fileView.href,
              fileLink: fileView.href,
              sizeOriginal: convertSize(fileDetails.sizeOriginal, "KB", { stringify: true }),
              mimeType: fileDetails.mimeType,
            };
          })
        );
        // setBucketFiles(await newBucketFiles);
        return await newBucketFiles;
      } else setBucketFiles([]);
    },
    onSuccess: async (data) => {
      setBucketFiles(data!);
      setToastOptions("success", "Success", "Successfully fetched the files from server!");
      setHasFetchedFiles(true);
    },
    onError: () => {
      setBucketFiles([]);
      setToastOptions("danger", "Error", "Bucket with the requested ID could not be found!");
      setHasFetchedFiles(true);
    },
    enabled: !!id && modalIsOpen !== false && action === "update" && hasFetchedFiles !== true,
    // staleTime: 2,
    // refetchOnReconnect: false,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="pt-5">
        <div className="flex flex-col">
          <span className=" font-normal">Attachment</span>
          <span className=" text-xs text-gray-500">Upload benchmarking letter of approval</span>
        </div>
        {/* <UploadBtn /> */}

        <div className="w-full rounded-lg ">
          {(isEmpty(data) || isLoading || isFetching) && action === "update" && !isError ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spinner borderSize={2} />
            </div>
          ) : isError ? (
            <AlertNotification alertType="error" notifMessage="Attachment not found" />
          ) : (
            <>
              {bucketFiles && bucketFiles.length > 0 && (
                <div className="px-4 py-4  space-y-2 border-2 rounded ">
                  <span className="items-center text-gray-700 text-md">
                    Uploaded Files <span className="text-xs">(Click file name to preview the file)</span>
                  </span>

                  {bucketFiles && bucketFiles.map((file, index) => <UploadedCard key={index} file={file} />)}
                </div>
              )}
            </>
          )}

          <div className="flex flex-col gap-5 mt-5">
            <div className="w-full mb-2">
              <input
                type="file"
                ref={inputRef}
                className="hidden w-full"
                //   onChange={(e) => handleAdd(e.target.files)}
                accept="application/pdf, image/png, image/jpeg, image/jpg, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain, application/csv"
                onChange={(e) => {
                  if (e.target.files?.length === 0) {
                    //
                  } else if (e.target.files) {
                    //   setCurrentFile(e.target.files[0].name);
                    const files = [...filesToUpload];
                    files.push(e.target.files[0]);

                    setToastOptions("success", "Success!", `You have attached the file ${e.target.files[0].name}`);
                    setFilesToUpload(files);
                  }
                }}
              />
              <button
                className="w-full border-2 bg-gray-50  border-dashed rounded-md h-[8rem]"
                onClick={() => inputRef?.current.click()}
              >
                <section className="flex flex-col items-center justify-center w-full">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711L17.657 9.65685L12.0001 4L6.34326 9.65685L7.75748 11.0711L11 7.82854V14.9861Z"
                      className="fill-indigo-800"
                    />
                    <path
                      d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                      className="fill-indigo-800"
                    />
                  </svg>

                  <span className="text-lg text-slate-500">
                    {filesToUpload && filesToUpload.length === 0
                      ? "Choose a file"
                      : filesToUpload && filesToUpload.length > 0
                      ? "Choose another file"
                      : null}
                  </span>
                </section>
              </button>
            </div>
          </div>
          {filesToUpload && filesToUpload.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 p-4  mt-2 border-2 border-dashed">
              <h3 className="text-xl font-semibold text-zinc-600">No new files selected</h3>
            </div>
          ) : (
            <FilesToUploadContext.Provider value={{ inputRef }}>
              <div className="px-4 py-2 space-y-2 border rounded">
                <span className="items-center text-gray-700 text-md">
                  Files to upload <span className="text-xs">(File will be uploaded upon submission)</span>
                </span>
                {filesToUpload &&
                  filesToUpload.map((file, index) => <FileToUploadCard key={index} file={file} fileId={index} />)}
              </div>
            </FilesToUploadContext.Provider>
          )}
        </div>
      </div>
      {/* <Toast
        duration={toastType.color === "danger" ? 2000 : 1500}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      /> */}
    </>
  );
};

const FileToUploadCard: FunctionComponent<FileToUploadCardProps> = ({ file }) => {
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const setFilesToUpload = useBenchmarkingStore((state) => state.setFilesToUpload);
  const { inputRef } = useContext(FilesToUploadContext);

  return (
    <>
      <div className="flex items-center w-full gap-2 p-2 bg-white border-2 border-dashed rounded-lg">
        <div className="w-[10%] ">
          <FileThumbnail mimeType={file.type} />
        </div>

        <div className="flex items-center justify-between truncate w-[80%]">
          <div className="truncate">
            <h3 className="text-sm font-semibold text-gray-700 truncate ">{file?.name}</h3>
            <p className="text-sm font-medium truncate dark:text-zinc-500">{convertSize(file?.size)}</p>
          </div>
        </div>

        <div className="flex justify-items-center w-[10%]">
          <button
            onClick={() => {
              const index = filesToUpload.findIndex((element) => element.name === file?.name);
              const updatedFiles = [...filesToUpload];
              inputRef.current.value = "";
              updatedFiles.splice(index, 1);

              setFilesToUpload(updatedFiles);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              className="dark:text-zinc-500 dark:hover:text-zinc-200"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"></circle>
                <path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

const UploadedCard: FunctionComponent<UploadedFileProps> = ({ file }) => {
  const bucketFiles = useBenchmarkingStore((state) => state.bucketFiles);
  const filesToDelete = useBenchmarkingStore((state) => state.filesToDelete);
  const setBucketFiles = useBenchmarkingStore((state) => state.setBucketFiles);
  const setFilesToDelete = useBenchmarkingStore((state) => state.setFilesToDelete);

  return (
    <>
      <div className="flex items-center w-full gap-2 p-2 bg-gray-200 border-2 rounded-lg">
        <div className="w-[10%]">
          <FileThumbnail mimeType={file.mimeType} />
        </div>

        <div className="flex items-center justify-between truncate w-[80%]">
          <div className="truncate">
            {/* <h3 className="text-sm font-semibold text-gray-700 truncate ">{file?.name}</h3> */}
            <Link href={file.href} target="_blank">
              <span className="text-sm font-medium text-zinc-800">{file.name}</span>
            </Link>
            <p className="text-sm font-medium truncate dark:text-zinc-500">{file?.sizeOriginal}</p>
          </div>
        </div>

        <div className="flex justify-items-center w-[10%]">
          <button
            onClick={() => {
              const index = bucketFiles.findIndex((element) => element.id === file?.id);
              const updatedFiles = [...bucketFiles];
              setFilesToDelete([...filesToDelete, file.id]);
              updatedFiles.splice(index, 1);

              setBucketFiles(updatedFiles);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              className="text-zinc-400 hover:text-zinc-600"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"></circle>
                <path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
