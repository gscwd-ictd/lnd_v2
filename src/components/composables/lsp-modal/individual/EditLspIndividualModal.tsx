/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { Dispatch, FunctionComponent, SetStateAction, Suspense, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import defaultPhoto from "../../../../../public/images/placeholders/user-placeholder-gray.png";
import axios from "axios";
import {
  LspSource,
  LspType,
  Sex,
  useEditLspModalStore,
  useEmployeeSearchStore,
  useLspDetailsStore,
  useLspSourceStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { LspIndividualModalBody } from "./LspIndividualModalBody";
import { LspToastContext } from "../../lsp-tabs/LspTabs";

type EditLspIndividualModalProps = {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  id: string;
};

type ToastType = {
  color: "success" | "warning" | "info" | "default" | "danger";
  title: string;
  content: string;
};

export const EditLspIndividualModal: FunctionComponent<EditLspIndividualModalProps> = ({ edit, setEdit, id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToastOptions } = useContext(LspToastContext);
  const { page, setPage } = useEditLspModalStore((state) => ({ page: state.page, setPage: state.setPage }));

  const {
    id: lspId,
    employeeId,
    firstName,
    middleName,
    lastName,
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
    education,
    projects,
    trainings,
    introduction,
    sex,
    tin,
    setPhotoId,
    reset,
    setEmail,
    setName,
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
    setEmployeeId,
    setTin,
    setProjects,
    setCoaching,
    setAffiliations,
    setFirstName,
    setMiddleName,
    setLastName,
    setExtensionName,
    setPrefixName,
    setSuffixName,
    setLspAction,
    setSex,
  } = useLspDetailsStore();

  const lspSource = useLspSourceStore((state) => state.lspSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);
  const employeeReset = useEmployeeSearchStore((state) => state.reset);
  const setSelectedEmployee = useEmployeeSearchStore((state) => state.setSelectedEmployee);
  const { lspType } = useLspTypeStore();
  const queryClient = useQueryClient();

  // on previous btn
  const onPrevious = () => {
    if (page === 1) {
      setEdit(false);
      setLspSource(undefined);
      setLspAction(undefined);
      reset();
      employeeReset();

      setPage(1);
    } else {
      setPage(page - 1);
    }
  };

  // on next btn
  const onNext = () => {
    page === 11 && lspSource === LspSource.EXTERNAL
      ? lspDataTableMutationExternal.mutate()
      : page === 11 && lspSource === LspSource.INTERNAL
      ? lspDataTableMutationInternal.mutate()
      : setPage(page + 1);
  };

  // on close
  const onClose = () => {
    setPage(1);
    setLspAction(undefined);
    reset();
    setLspSource(undefined);
    employeeReset();
  };

  // per lsp query
  useQuery({
    queryKey: ["lsp-details", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${url}/lsp/${id}`);

        if (lspSource === "internal") {
          setTin(data.tin);
          setContactNumber(data.contactNumber);
          setExperience(data.experience);

          setEducation(!isEmpty(data.education) ? data.education : []);
          setExpertise(!isEmpty(data.expertise) ? data.expertise : []);
          setTrainings(!isEmpty(data.trainings) ? data.trainings : []);
          setProjects(!isEmpty(data.projects) ? data.projects : []);
          setCoaching(!isEmpty(data.coaching) ? data.coaching : []);
          setCertifications(!isEmpty(data.certifications) ? data.certifications : []);
          setAffiliations(!isEmpty(data.affiliations) ? data.affiliations : []);
          setAwards(!isEmpty(data.awards) ? data.awards : []);
          setIntroduction(data.introduction);
          setEmployeeId(data.employeeId);
          setEmail(data.email);
          setPhotoUrl(data.photoUrl);
          setPostalAddress(data.postalAddress);
          setSex(
            data.sex === "Male" || data.sex === "male"
              ? Sex.MALE
              : data.sex === "Female" || data.sex === "female"
              ? Sex.FEMALE
              : undefined
          );
          setSelectedEmployee({
            employeeId: data.employeeId,
            fullName: data.name,
            positionTitle: data.positionTitle,
          });
        } else if (lspSource === "external") {
          // setExternalLspDetails(data);
          // getPhotoUrl(lspId!);
          setContactNumber(data.contactNumber);
          setExperience(data.experience);
          setEducation(!isEmpty(data.education) ? data.education : []);
          setExpertise(!isEmpty(data.expertise) ? data.expertise : []);
          setTrainings(!isEmpty(data.trainings) ? data.trainings : []);
          setProjects(!isEmpty(data.projects) ? data.projects : []);
          setCoaching(!isEmpty(data.coaching) ? data.coaching : []);
          setCertifications(!isEmpty(data.certifications) ? data.certifications : []);
          setAffiliations(!isEmpty(data.affiliations) ? data.affiliations : []);
          setAwards(!isEmpty(data.awards) ? data.awards : []);
          setFirstName(data.firstName);
          setMiddleName(data.middleName);
          setLastName(data.lastName);
          setExtensionName(data.namExtension);
          setTin(data.tin);
          setEmail(data.email);
          setIntroduction(data.introduction);
          setPhotoId(data.photoId);
          setPhotoUrl(data.photoUrl);
          setPostalAddress(data.postalAddress);
          setPrefixName(data.prefixName);
          setSuffixName(data.suffixName);
          setExtensionName(data.extensionName);
          setName(data.name);
          setSex(
            data.sex === "Male" || data.sex === "male"
              ? Sex.MALE
              : data.sex === "Female" || data.sex === "female"
              ? Sex.FEMALE
              : undefined
          );
          setSelectedEmployee({
            employeeId: data.employeeId,
            fullName: data.name,
            positionTitle: data.positionTitle,
          });
        }

        return data;
      } catch (error) {
        return error;
      }
    },
    enabled: !!id && !!edit,
    staleTime: 2,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const lspDataTableMutationExternal = useMutation({
    onSuccess: (data) => {
      setEdit(false);
      setToastOptions("success", "Success", "Successfully Updated");
      queryClient.refetchQueries({
        queryKey: ["lsp-individual"],
        type: "all",
        exact: true,
        stale: true,
      });

      return data;
    },
    onError: () => {
      // toast here

      setToastOptions("danger", "Error", "Please try again in a few seconds");
    },
    mutationFn: async () => {
      const response = await axios.put(`${url}/lsp/individual/external`, {
        //data
        id: lspId,
        firstName,
        middleName,
        lastName,
        contactNumber,
        email,
        postalAddress,
        experience,
        sex,
        expertise,
        affiliations,
        awards,
        certifications,
        coaching,
        education,
        projects,
        trainings,
        introduction,
        tin,
      });

      return response.data;
    },
  });

  const lspDataTableMutationInternal = useMutation({
    onSuccess: async () => {
      setEdit(false);
      setToastOptions("success", "Success", "Successfully Updated");
      employeeReset();
      reset();
      setPage(1);
      // queryClient.refetchQueries({
      //   queryKey: ["lsp-individual"],
      //   type: "all",
      //   exact: true,
      //   stale: true,
      // });
      const getUpdatedIndividualLsp = await axios.get(`${url}/lsp/q?type=individual&page=1&limit=40`);

      queryClient.setQueryData(["lsp-individual"], getUpdatedIndividualLsp.data.items);
    },
    onError: () => {
      // toast here

      setToastOptions("danger", "Error", "Please try again in a few seconds");
    },
    mutationFn: async () => {
      console.log(employeeId);
      const response = await axios.put(`${url}/lsp/individual/internal`, {
        //data
        id: lspId,
        employeeId: employeeId,
        expertise,
        experience,
        introduction,
        affiliations,
        coaching,
        projects,
        trainings,
      });

      return response.data;
    },
  });

  // useEffect(() => {
  //   if (isEmpty(lspId) && !isEmpty(id)) {
  //     setId(id);
  //   }
  // }, [id, lspId]);

  return (
    <>
      <Modal
        isOpen={edit}
        setIsOpen={setEdit}
        size={page === 11 ? "lg" : "md"}
        isStatic
        onClose={onClose}
        animate={false}
      >
        <ModalContent>
          <ModalContent.Title>
            <div className="px-2 flex gap-2">
              {/* {photoUrl && lspSource === LspSource.EXTERNAL ? (
                <AvatarWithAppwriteUpload source={photoUrl} size="xl" />
              ) : photoUrl && lspSource === LspSource.INTERNAL ? (
                <Avatar source={photoUrl} size="xl" />
              ) : photoUrl === null && lspSource === LspSource.INTERNAL ? (
                <Avatar source={defaultPhoto.src} size="xl" />
              ) : (
                <AvatarWithAppwriteUpload source={defaultPhoto.src} size="xl" />
              )} */}
              <Avatar source={photoUrl ? photoUrl : defaultPhoto.src} size="xl" />
            </div>
            <header className="px-2 mt-1">
              <p className="text-xs font-medium text-indigo-500">{page} of 11</p>
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
                    {lspType === LspType.INDIVIDUAL ? "Individual" : "Organization"}
                  </p>

                  {lspSource && (
                    <p
                      className={`${
                        lspSource === LspSource.INTERNAL
                          ? "text-purple-600 bg-purple-50 border-purple-100"
                          : "text-amber-600 bg-amber-50 border-amber-100"
                      }  text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                    >
                      {lspSource === LspSource.INTERNAL ? "Internal" : "External"}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-400">
                {page === 1 && lspType === LspType.INDIVIDUAL
                  ? "Personal information"
                  : page === 2 && lspType === LspType.INDIVIDUAL
                  ? "Contact information"
                  : page === 3 && lspType === LspType.INDIVIDUAL
                  ? "Subject-matter expertise"
                  : page === 4 && lspType === LspType.INDIVIDUAL
                  ? "Educational attainment"
                  : page === 5 && lspType === LspType.INDIVIDUAL
                  ? "Related trainings conducted for the past 5 years"
                  : page === 6 && lspType === LspType.INDIVIDUAL
                  ? "Related projects implemented for the past 5 years"
                  : page === 7 && lspType === LspType.INDIVIDUAL
                  ? "Related coaching experience for the past 5 years"
                  : page === 8 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's affiliations"
                  : page === 9 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's awards & recognitions"
                  : page === 10 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's certifications"
                  : page === 11 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's Summary"
                  : ""}
              </p>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <LspIndividualModalBody />
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="px-2 py-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button size="small" variant="white" onClick={onPrevious}>
                  {page === 1 ? "Close" : "Previous"}
                </Button>

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 1 && (
                  <Button size="small" type="submit" form="editPersonalInfoInternalForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 2 && (
                  <Button size="small" type="button" onClick={() => setPage(3)}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 3 && (
                  <Button size="small" type="submit" form="editSubjectMatterForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 4 && (
                  <Button size="small" type="button" onClick={() => setPage(5)}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 5 && (
                  <Button size="small" type="submit" form="editTrainingDetailsForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 6 && (
                  <Button size="small" type="submit" form="editProjectsImplementedForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 7 && (
                  <Button size="small" type="submit" form="editCoachingExpForm">
                    Proceed
                  </Button>
                )}
                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 8 && (
                  <Button size="small" type="submit" form="editAffiliationsForm">
                    Proceed
                  </Button>
                )}
                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 9 && (
                  <Button size="small" type="button" onClick={onNext}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 10 && (
                  <Button size="small" type="button" onClick={onNext}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 11 && (
                  <Button size="small" type="button" onClick={() => lspDataTableMutationInternal.mutate()}>
                    Confirm
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 1 && (
                  <Button size="small" type="submit" form="editPersonalInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 2 && (
                  <Button size="small" type="submit" form="editContactInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 3 && (
                  <Button size="small" type="submit" form="editSubjectMatterForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 4 && (
                  <Button size="small" type="submit" form="editEducDetailsExternalForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 5 && (
                  <Button size="small" type="submit" form="editTrainingDetailsForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 6 && (
                  <Button size="small" type="submit" form="editProjectsImplementedForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 7 && (
                  <Button size="small" type="submit" form="editCoachingExpForm">
                    Proceed
                  </Button>
                )}
                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 8 && (
                  <Button size="small" type="submit" form="editAffiliationsForm">
                    Proceed
                  </Button>
                )}
                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 9 && (
                  <Button size="small" type="button" onClick={onNext}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 10 && (
                  <Button size="small" type="button" onClick={onNext}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 11 && (
                  <Button size="small" type="button" onClick={() => lspDataTableMutationExternal.mutate()}>
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      {/* <EditUploadPhotoAlert /> */}
      {/* <Toast
        duration={2000}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      /> */}
    </>
  );
};
