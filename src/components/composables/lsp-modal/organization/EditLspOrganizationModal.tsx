/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import defaultPhoto from "../../../../../public/images/placeholders/user-placeholder-gray.png";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  LspSource,
  LspType,
  useEditLspModalStore,
  useLspDetailsStore,
  useLspSourceStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { LspOrganizationModalBody } from "./LspOrganizationModalBody";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { AvatarWithAppwriteUpload } from "@lms/components/osprey/ui/avatar/view/AvatarWithAppwriteUpload";
import { EditUploadPhotoAlert } from "../individual/EditUploadPhotoAlert";

type EditLspOrganizationModalProps = {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  id: string;
};

type ToastType = {
  color: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content: string;
};

export const EditLspOrganizationModal: FunctionComponent<EditLspOrganizationModalProps> = ({ edit, setEdit, id }) => {
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const { page, setPage } = useEditLspModalStore((state) => ({ page: state.page, setPage: state.setPage }));

  const {
    id: lspId,
    employeeId,
    name,
    organizationName,
    contactNumber,
    email,
    postalAddress,
    experience,
    photoUrl,
    expertise,
    affiliations,
    awards,
    certifications,
    coaching,
    trainings,
    introduction,
    tin,
    reset,
    setEmail,
    setIntroduction,
    setPhotoUrl,
    setPostalAddress,
    setAwards,
    setContactNumber,
    setTrainings,
    setCertifications,
    setExpertise,
    setEducation,
    setExperience,
    setId,
    setPhotoId,
    setProjects,
    setCoaching,
    setAffiliations,
    setFirstName,
    setMiddleName,
    setLastName,
    setExtensionName,
    setName,
    setTin,
  } = useLspDetailsStore();

  const lspSource = useLspSourceStore((state) => state.lspSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  const lspType = useLspTypeStore((state) => state.lspType);

  const queryClient = useQueryClient();

  // on previous btn
  const onPrevious = () => {
    if (page === 1) {
      setEdit(false);
      // setSelectedLspSource({ id: "", name: "" });
      // setLspSource()
      // setId(null);
      reset();
    } else {
      setPage(page - 1);
    }
  };

  // on next btn
  const onNext = () => {
    page === 9 ? lspDataTableMutation.mutate() : setPage(page + 1);
  };

  // on close
  const onClose = () => {
    setPage(1);
    // setId(null);
    reset();
    setLspSource(undefined);
  };

  // set form data
  // const setLspDetails = (data: any) => {
  //   setLspSource(LspSource.EXTERNAL);
  //   setContactNumber(data.contactNumber);
  //   setExperience(data.experience);
  //   setEducation(!isEmpty(data.education) ? data.education : []);
  //   setExpertise(!isEmpty(data.expertise) ? data.expertise : []);
  //   setTrainings(data.trainings);
  //   setCertifications(data.certifications);
  //   setCoaching(data.coaching);
  //   setAffiliations(data.affiliations);
  //   setAwards(data.awards);
  //   setFirstName(data.firstName);
  //   setMiddleName(data.middleName);
  //   setLastName(data.lastName);
  //   setExtensionName(data.extensionName);
  //   setName(data.name);
  //   setEmail(data.email);
  //   setIntroduction(data.introduction);
  //   setPhotoUrl(data.photoUrl);
  //   setPostalAddress(data.postalAddress);
  //   setTin(data.tin);
  // };

  // per lsp query
  const {
    data: lspDetails,
    error: errorLspDetails,
    isLoading,
  } = useQuery({
    queryKey: ["lsp-details", lspId],
    queryFn: async () => {
      try {
        const { data } = (await axios.get(`${url}/lsp/${id}`)) as any;
        setLspSource(LspSource.EXTERNAL);
        setContactNumber(data.contactNumber);
        setExperience(data.experience);
        setEducation(!isEmpty(data.education) ? data.education : []);
        setExpertise(!isEmpty(data.expertise) ? data.expertise : []);
        setTrainings(data.trainings);
        setCertifications(data.certifications);
        setCoaching(data.coaching);
        setAffiliations(data.affiliations);
        setAwards(data.awards);
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setExtensionName(data.extensionName);
        setName(data.name);
        setEmail(data.email);
        setIntroduction(data.introduction);
        setPhotoId(data.photoId);
        setPhotoUrl(data.photoUrl);
        setPostalAddress(data.postalAddress);
        setTin(data.tin);

        return data;
      } catch (error) {
        return error;
      }
    },
    enabled: !!lspId,
    // staleTime: 10000,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const lspDataTableMutation = useMutation({
    onSuccess: async () => {
      onClose();
      setEdit(false);
      setToastOptions("success", "Success", "Successfully Updated");
      // queryClient.refetchQueries({
      //   queryKey: ["lsp_organization"],
      //   type: "all",
      //   exact: true,
      //   stale: true,
      // });
      const getUpdatedOrganizationLsp = await axios.get(`${url}/lsp/q?type=organization&page=1&limit=40`);

      queryClient.setQueryData(["lsp-organization"], getUpdatedOrganizationLsp.data.items);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Please try again in a few seconds");
    },
    mutationFn: async () => {
      const response = await axios.put(`${url}/lsp/organization/external`, {
        //data
        id: lspId,
        organizationName,
        contactNumber,
        email,
        postalAddress,
        tin,
        experience,
        introduction,

        expertise,
        affiliations,
        awards,
        certifications,
        coaching,
        trainings,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (isEmpty(lspId) && !isEmpty(id)) {
      setId(id);
    }
  }, [id, lspId]);

  return (
    <>
      <Modal
        isOpen={edit}
        setIsOpen={setEdit}
        size={page === 9 ? "lg" : "md"}
        isStatic
        onClose={onClose}
        animate={false}
      >
        <ModalContent>
          <ModalContent.Title>
            <div className="px-2">
              {/* <Avatar
                source="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1224.jpg"
                size="xl"
              /> */}
              <AvatarWithAppwriteUpload source={photoUrl ? photoUrl : defaultPhoto.src} size="xl" />
            </div>
            <header className="px-2 mt-1">
              <p className="text-xs font-medium text-indigo-500">{page} of 9</p>
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Learning Provider Profile</h3>
                <div className="flex items-center gap-1">
                  <p
                    className={`${
                      lspType === LspType.INDIVIDUAL
                        ? "text-green-600 bg-green-50 border-green-100"
                        : lspType === LspType.ORGANIZATION
                        ? "text-amber-600 bg-amber-50 border-amber-100"
                        : null
                    } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                  >
                    {lspType}
                  </p>

                  {!isEmpty(lspDetails)
                    ? lspSource && (
                        <p
                          className={`${
                            lspSource === LspSource.EXTERNAL
                              ? "text-purple-600 bg-purple-50 border-purple-100"
                              : "text-amber-600 bg-amber-50 border-amber-100"
                          }  text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                        >
                          {lspSource}
                        </p>
                      )
                    : null}
                </div>
              </div>

              <p className="text-sm text-gray-400">
                {page === 1 && lspType === LspType.ORGANIZATION
                  ? "Personal information"
                  : page === 2 && lspType === LspType.ORGANIZATION
                  ? "Contact information"
                  : page === 3 && lspType === LspType.ORGANIZATION
                  ? "Subject-matter expertise"
                  : page === 4 && lspType === LspType.ORGANIZATION
                  ? "Related trainings conducted for the past 5 years"
                  : page === 5 && lspType === LspType.ORGANIZATION
                  ? "Related coaching experience for the past 5 years"
                  : page === 6 && lspType === LspType.ORGANIZATION
                  ? "Learning Service Provider's affiliations"
                  : page === 7 && lspType === LspType.ORGANIZATION
                  ? "Learning Service Provider's awards & recognitions"
                  : page === 8 && lspType === LspType.ORGANIZATION
                  ? "Learning Service Provider's certifications"
                  : page === 9 && lspType === LspType.ORGANIZATION
                  ? "Learning Service Provider's Summary"
                  : ""}
              </p>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <LspOrganizationModalBody />
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="px-2 py-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button size="small" variant="white" onClick={onPrevious}>
                  {page === 1 ? "Close" : "Previous"}
                </Button>

                {page === 1 && (
                  <Button type="submit" form="editOrganizationDetailsForm">
                    Proceed
                  </Button>
                )}

                {page === 2 && (
                  <Button type="submit" form="editContactInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {page === 3 && (
                  <Button type="submit" form="editSubjectMatterForm">
                    Proceed
                  </Button>
                )}

                {page === 4 && (
                  <Button type="submit" form="editTrainingDetailsForm">
                    Proceed
                  </Button>
                )}

                {page === 5 && (
                  <Button type="submit" form="editCoachingExpForm">
                    Proceed
                  </Button>
                )}

                {page === 6 && (
                  <Button type="submit" form="editAffiliationsForm">
                    Proceed
                  </Button>
                )}

                {(page === 7 || page === 8 || page === 9) && (
                  <Button size="small" onClick={onNext} type="button">
                    {page === 9 ? "Confirm" : "Proceed"}
                  </Button>
                )}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <EditUploadPhotoAlert />
      <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
