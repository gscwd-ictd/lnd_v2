"use client";

import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent, ModalTrigger } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { FunctionComponent, Suspense, useState } from "react";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  LspSource,
  LspType,
  useAddLspModalStore,
  useEmployeeSearchStore,
  useLspDetailsStore,
  useLspSourceStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { url } from "@lms/utilities/url/api-url";
import { ChooseLspSource } from "./ChooseLspSource";
import { LspDetailsSummary } from "./individual/LspDetailsSummary";
import { ContactInformationExternal } from "./external/ContactInformationExternal";
import { EducationDetailsInternal } from "./internal/EducationDetailsInternal";
import { OrganizationDetails } from "./organization/OrganizationDetails";
import { OrganizationSummary } from "./organization/OrganizationSummary";
import { ContactInformationInternal } from "./internal/ContactInformationInternal";
import { CertificationsInternal } from "./internal/CertificationsInternal";
import { isEmpty } from "lodash";
import { CreatePersonalInformationInternal } from "./internal/create/CreatePersonalInformationInternal";
import { CreatePersonalInformationExternal } from "./external/create/CreatePersonalInformationExternal";
import { CreateSubjectMatterExpertise } from "./internal/create/CreateSubjectMatterExpertise";
import { CreateTrainingDetails } from "./individual/create/CreateTrainingDetails";
import { CreateProjectsImplemented } from "./individual/create/CreateProjectsImplemented";
import { CreateCoachingExperience } from "./CreateCoachingExperience";
import { CreateAffiliations } from "./CreateAffiliations";
import { CreateContactInformationExternal } from "./external/create/CreateContactInformationExternal";
import { CreateEducationDetailsExternal } from "./external/create/CreateEducationDetailsExternal";
import { AwardsAndRecognitionInternal } from "./individual/AwardsAndRecognitionInternal";
import { CreateAwardsAndRecognitionsExternal } from "./external/create/CreateAwardsAndRecognitionsExternal";
import { CreateOrganizationDetails } from "./organization/create/CreateOrganizationDetails";
import { CreateCertificationsExternal } from "./external/CreateCertificationsExternal";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import defaultPhoto from "../../../../public/images/placeholders/user-placeholder-gray.png";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { AddUploadPhotoAlert } from "./individual/AddUploadPhotoAlert";
import { useLspExternal } from "@lms/hooks/use-lsp-external";

export const AddNewLspModal: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);
  const setToastOptions = (color: typeof toastType.color, title: string, content: string | undefined) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  const client = useLspExternal();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { page, setPage } = useAddLspModalStore();

  const resetLspDetailsStore = useLspDetailsStore((state) => state.reset);

  const resetEmployeeStore = useEmployeeSearchStore((state) => state.reset);

  const { setSearchInput } = useEmployeeSearchStore();

  // const { lspSources, setLspSources } = useLspSourcesStore();
  // const {selectedLspSource, } = useSelectedLspSource();

  const lspType = useLspTypeStore((state) => state.lspType);

  const setLspType = useLspTypeStore((state) => state.setLspType);

  const queryClient = useQueryClient();

  // on next or proceed button
  const onNext = () => {
    if (lspType === LspType.INDIVIDUAL) {
      page === 2 && isEmpty(employeeId) && lspSource === LspSource.INTERNAL
        ? console.log("ERROR")
        : page === 5 && isEmpty(education)
        ? null
        : page === 12 && lspType === LspType.INDIVIDUAL && lspSource === LspSource.INTERNAL
        ? lspDataTableIndIntMutation.mutate()
        : page === 12 && lspType === LspType.INDIVIDUAL && lspSource === LspSource.EXTERNAL
        ? lspDataTableIndExtMutation.mutate()
        : setPage(page + 1);
    } else {
      if (lspType === LspType.ORGANIZATION) {
        page === 9 ? lspDataTableOrganizationMutation.mutate() : setPage(page + 1);
      }
    }
  };

  // on previous or back button
  const onPrev = () => {
    if (page === 1) {
      onClose();
      setOpen(false);
      // resetLspDetailsStore();
      // resetEmployeeStore();
    } else {
      setPage(page - 1);
    }
  };

  // on close
  const onClose = () => {
    setPage(1);
    resetLspDetailsStore();
    resetEmployeeStore();
    setSearchInput("");
    setEmployeeId("");
    setId("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
    setPostalAddress("");
    setEducation([]);
    setAwards([]);
    setCertifications([]);
    setLspAction(undefined);
  };

  const {
    introduction,
    employeeId,
    firstName,
    middleName,
    lastName,
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
    education,
    projects,
    trainings,
    prefixName,
    suffixName,
    extensionName,
    tin,
    sex,
    photoToUploadUrl,
    photoId,
    photoToUpload,
    setEmployeeId,
    setId,
    setFirstName,
    setMiddleName,
    setLastName,
    setContactNumber,
    setEmail,
    setPostalAddress,
    setEducation,
    setAwards,
    setCertifications,
    setLspAction,
  } = useLspDetailsStore();

  const lspSource = useLspSourceStore((state) => state.lspSource);
  const setLspSource = useLspSourceStore((state) => state.setLspSource);

  const lspDataTableIndIntMutation = useMutation({
    onSuccess: async (data) => {
      setPage(1);
      resetLspDetailsStore();
      resetEmployeeStore();
      setOpen(false);
      setToastOptions("success", "Success", "You have successfully added an LSP");
      const getUpdatedIndividualLsp = await axios.get(`${url}/lsp/q?type=individual&page=1&limit=40`);

      queryClient.setQueryData(["lsp-individual"], getUpdatedIndividualLsp.data.items);
    },
    onError: (error) => console.log(error),
    mutationFn: async () => {
      const response = await axios.post(`${url}/lsp/individual/internal`, {
        employeeId,
        expertise,
        experience: experience ?? [],
        introduction,
        affiliations: affiliations ?? [],
        coaching: coaching ?? [],
        projects: projects ?? [],
        // photoUrl,
        trainings: trainings ?? [],
      });

      resetLspDetailsStore();
      resetEmployeeStore();

      return response.data;
    },
  });

  const lspDataTableIndExtMutation = useMutation({
    onSuccess: async (data) => {
      setOpen(false);
      setToastOptions("success", "Success", "You have successfully added an LSP");
      setPage(1);
      resetLspDetailsStore();
      resetEmployeeStore();

      const getUpdatedIndividualLsp = await axios.get(`${url}/lsp/q?type=individual&page=1&limit=40`);

      queryClient.setQueryData(["lsp-individual"], getUpdatedIndividualLsp.data.items);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong, please try again later.");
    },
    mutationFn: async () => {
      // create a route where it creates the file in the appwrite, then it returns the url and id,
      // and post it in lsp creation

      // create the file in appwrite

      // initially assign this object to null
      // let uploadedFileData: { id: string | null; photoUrl: string | null } = { id: null, photoUrl: null };
      // if (photoToUpload !== null) {
      //   const storage = new Storage(client!);

      //   const uploadedFile = await storage.createFile(
      //     // process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
      //     "123123",
      //     uuidv4(),
      //     photoToUpload!
      //   );

      //   // find by $id
      //   const filePreview = await storage.getFileView(
      //     process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
      //     uploadedFile.$id
      //   );

      //   uploadedFileData = { id: uploadedFile.$id, photoUrl: filePreview.href };
      // }

      const response = await axios.post(`${url}/lsp/individual/external`, {
        firstName,
        middleName,
        lastName,
        prefixName: !isEmpty(prefixName) ? prefixName : null,
        suffixName: !isEmpty(suffixName) ? suffixName : null,
        extensionName: !isEmpty(extensionName) ? extensionName : null,
        expertise,
        contactNumber,
        email,
        postalAddress,
        experience: experience ?? [],
        tin,
        sex,
        introduction,
        affiliations: affiliations ?? [],
        awards: awards ?? [],
        certifications: certifications ?? [],
        coaching: coaching ?? [],
        education,
        projects: projects ?? [],
        trainings: trainings ?? [],
      });
    },
  });

  const lspDataTableOrganizationMutation = useMutation({
    onSuccess: async (data) => {
      setOpen(false);
      setToastOptions("success", "Success", "You have successfully added an LSP");
      resetEmployeeStore();
      resetLspDetailsStore();

      const getUpdatedOrganizationLsp = await axios.get(`${url}/lsp/q?type=organization&page=1&limit=40`);
      queryClient.setQueryData(["lsp-organization"], getUpdatedOrganizationLsp.data.items);
    },
    onError: () => {
      setToastOptions("danger", "Error", "Something went wrong. Please try again later.");
    },
    mutationFn: async () => {
      // create a route where it creates the file in the appwrite, then it returns the url and id,
      // and post it in lsp creation

      // initially assign this object to null
      // let uploadedFileData: { id: string | null; photoUrl: string | null } = { id: null, photoUrl: null };
      // if (photoToUpload !== null) {
      //   const storage = new Storage(client!);

      //   try {
      //     const uploadedFile = await storage.createFile(
      //       process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
      //       uuidv4(),
      //       photoToUpload!
      //     );

      //     // find by $id
      //     const filePreview = await storage.getFileView(
      //       process.env.NEXT_PUBLIC_APPWRITE_BUCKET_LSP_EXTERNAL!,
      //       uploadedFile.$id
      //     );

      //     uploadedFileData = { id: uploadedFile.$id, photoUrl: filePreview.href };
      //     return uploadedFileData;
      //   } catch (error) {
      //     // return { id: null, photoUrl: null };
      //     return error;
      //   }
      // }

      const response = await axios.post(`${url}/lsp/organization/external`, {
        organizationName,
        contactNumber,
        email,
        postalAddress,
        experience,
        tin,
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

  return (
    <>
      <Modal
        isOpen={open}
        setIsOpen={setOpen}
        size={
          lspType === LspType.INDIVIDUAL && page === 12
            ? "lg"
            : lspType === LspType.ORGANIZATION && page == 9
            ? "lg"
            : "md"
        }
        isStatic
        onClose={onClose}
        animate={false}
      >
        <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenu.Trigger asChild>
            <Button size="small">
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
              <p>Add New</p>
            </Button>
          </DropdownMenu.Trigger>
          <AnimatePresence>
            {dropdownOpen && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="start" side="right" sideOffset={4} asChild>
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 1, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="flex flex-col bg-white rounded shadow-lg overflow-clip"
                  >
                    <DropdownMenu.Item
                      className="px-2 py-1 transition-colors border-b outline-none hover:bg-gray-100 border-b-100 focus:bg-gray-100"
                      asChild
                    >
                      <ModalTrigger
                        className="text-xs font-medium text-left text-gray-600"
                        onClick={async () => {
                          setLspType(LspType.INDIVIDUAL);
                          setLspAction("create");
                          setLspSource(LspSource.INTERNAL);
                        }}
                      >
                        Individual
                      </ModalTrigger>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      asChild
                      className="px-2 py-1 transition-colors outline-none hover:bg-gray-100 focus:bg-gray-100"
                    >
                      <ModalTrigger
                        className="text-xs font-medium text-left text-gray-600"
                        onClick={async () => {
                          setLspType(LspType.ORGANIZATION);
                          setLspAction("create");
                          setLspSource(LspSource.EXTERNAL);
                        }}
                      >
                        Organization
                      </ModalTrigger>
                    </DropdownMenu.Item>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
        <ModalContent>
          <ModalContent.Title>
            <div className="px-2 flex gap-2">
              <Suspense fallback={<Spinner />}>
                {lspSource === LspSource.INTERNAL ? (
                  <Avatar source={photoUrl ? photoUrl : defaultPhoto.src} size="xl" />
                ) : (
                  <Avatar source={defaultPhoto.src} size="xl" />
                )}
                {/* <Avatar source={defaultPhoto.src} size="xl" /> */}
              </Suspense>
            </div>
            <header className="px-2 mt-1">
              <div className="text-xs font-medium text-indigo-500">
                {page} of {lspType === LspType.ORGANIZATION ? "9" : "12"}
              </div>
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold text-gray-600">Learning Provider Profile</h3>
                <div className="flex items-center gap-1">
                  <div
                    className={`${
                      lspType === LspType.INDIVIDUAL
                        ? "text-green-600 bg-green-50 border-green-100"
                        : lspType === LspType.ORGANIZATION
                        ? "text-amber-600 bg-amber-50 border-amber-100"
                        : null
                    } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                  >
                    {lspType === LspType.INDIVIDUAL ? "Individual" : "Organization"}
                  </div>
                  {lspSource && (
                    <div
                      className={`${
                        lspSource === LspSource.INTERNAL
                          ? "text-purple-600 bg-purple-50 border-purple-100"
                          : lspSource === LspSource.EXTERNAL
                          ? "text-amber-600 bg-amber-50 border-amber-100"
                          : null
                      } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
                    >
                      {lspSource === LspSource.INTERNAL ? "Internal" : "External"}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {page === 2 && lspType === LspType.INDIVIDUAL
                  ? "Personal information"
                  : page === 3 && lspType === LspType.INDIVIDUAL
                  ? "Contact information"
                  : page === 4 && lspType === LspType.INDIVIDUAL
                  ? "Subject-matter expertise"
                  : page === 5 && lspType === LspType.INDIVIDUAL
                  ? "Educational attainment"
                  : page === 6 && lspType === LspType.INDIVIDUAL
                  ? "Related trainings conducted for the past 5 years"
                  : page === 7 && lspType === LspType.INDIVIDUAL
                  ? "Related projects implemented for the past 5 years"
                  : page === 8 && lspType === LspType.INDIVIDUAL
                  ? "Related coaching experience for the past 5 years"
                  : page === 9 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's affiliations"
                  : page === 10 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's awards & recognitions"
                  : page === 11 && lspType === LspType.INDIVIDUAL
                  ? "Learning Service Provider's certifications"
                  : ""}
              </div>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            {/* INDIVIDUAL */}
            {lspType === LspType.INDIVIDUAL && (
              <main className="px-2 space-y-2 h-[34rem]">
                {page === 1 && <ChooseLspSource />}

                {page === 2 && (
                  <>
                    {lspSource === LspSource.INTERNAL ? (
                      <CreatePersonalInformationInternal />
                    ) : (
                      <CreatePersonalInformationExternal />
                    )}
                  </>
                )}

                {page === 3 && (
                  <>
                    {lspSource === LspSource.INTERNAL ? (
                      <ContactInformationInternal />
                    ) : (
                      <CreateContactInformationExternal />
                    )}
                  </>
                )}

                {page === 4 && <CreateSubjectMatterExpertise />}

                {page === 5 && (
                  <>
                    {lspSource === LspSource.INTERNAL ? (
                      <EducationDetailsInternal />
                    ) : (
                      <CreateEducationDetailsExternal />
                    )}
                  </>
                )}
                {page === 6 && <CreateTrainingDetails />}
                {page === 7 && <CreateProjectsImplemented />}
                {page === 8 && <CreateCoachingExperience />}
                {page === 9 && <CreateAffiliations />}
                {page === 10 && (
                  <>
                    {lspSource === LspSource.INTERNAL ? (
                      <AwardsAndRecognitionInternal />
                    ) : (
                      <CreateAwardsAndRecognitionsExternal />
                    )}
                  </>
                )}
                {page === 11 && (
                  <>
                    {lspSource === LspSource.INTERNAL ? <CertificationsInternal /> : <CreateCertificationsExternal />}
                  </>
                )}
                {page === 12 && <LspDetailsSummary />}
              </main>
            )}

            {/* ORGANIZATIONAL */}
            {lspType === LspType.ORGANIZATION && (
              <main className="px-2 space-y-2 h-[34rem]">
                {page === 1 ? (
                  <CreateOrganizationDetails />
                ) : page === 2 ? (
                  <CreateContactInformationExternal />
                ) : page === 3 ? (
                  <CreateSubjectMatterExpertise />
                ) : page === 4 ? (
                  <CreateTrainingDetails />
                ) : page === 5 ? (
                  <CreateCoachingExperience />
                ) : page === 6 ? (
                  <CreateAffiliations />
                ) : page === 7 ? (
                  <CreateAwardsAndRecognitionsExternal />
                ) : page === 8 ? (
                  <CreateCertificationsExternal />
                ) : page === 9 ? (
                  <OrganizationSummary />
                ) : null}
              </main>
            )}
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="px-2 py-3">
              <div className="flex items-center justify-end w-full gap-2">
                <Button size="small" variant="white" onClick={onPrev}>
                  {page === 1 ? "Cancel" : "Previous"}
                </Button>

                {/* START OF INDIVIDUAL  */}
                {((page === 1 && lspType === LspType.INDIVIDUAL) ||
                  (lspSource === LspSource.INTERNAL && page === 5) ||
                  (page === 10 && lspType === LspType.INDIVIDUAL && lspSource === LspSource.INTERNAL) ||
                  (page === 11 && lspType === LspType.INDIVIDUAL) ||
                  (page === 12 && lspType === LspType.INDIVIDUAL)) && (
                  <Button size="small" type="button" onClick={onNext}>
                    {page === 12 ? "Confirm" : "Proceed"}
                  </Button>
                )}
                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 2 && (
                  <Button size="small" type="submit" form="createPersonalInfoInternalForm">
                    Proceed
                  </Button>
                )}
                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 2 && (
                  <Button size="small" type="submit" form="createPersonalInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.INTERNAL && lspType === LspType.INDIVIDUAL && page === 3 && (
                  <Button size="small" type="button" onClick={() => setPage(4)}>
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 3 && (
                  <Button size="small" type="submit" form="createContactInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {(lspSource === LspSource.INTERNAL || lspSource === LspSource.EXTERNAL) &&
                  lspType === LspType.INDIVIDUAL &&
                  page === 4 && (
                    <Button size="small" type="submit" form="createSubjectMatterForm">
                      Proceed
                    </Button>
                  )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 5 && (
                  <Button size="small" type="submit" form="createEducDetailsExternalForm">
                    Proceed
                  </Button>
                )}

                {(lspSource === LspSource.INTERNAL || lspSource === LspSource.EXTERNAL) &&
                  lspType === LspType.INDIVIDUAL &&
                  page === 6 && (
                    <Button size="small" type="submit" form="createTrainingDetailsForm">
                      Proceed
                    </Button>
                  )}

                {(lspSource === LspSource.INTERNAL || lspSource === LspSource.EXTERNAL) &&
                  lspType === LspType.INDIVIDUAL &&
                  page === 7 && (
                    <Button size="small" type="submit" form="createProjectsImplementedForm">
                      Proceed
                    </Button>
                  )}

                {(lspSource === LspSource.INTERNAL || lspSource === LspSource.EXTERNAL) &&
                  lspType === LspType.INDIVIDUAL &&
                  page === 8 && (
                    <Button size="small" type="submit" form="createCoachingExpForm">
                      Proceed
                    </Button>
                  )}

                {(lspSource === LspSource.INTERNAL || lspSource === LspSource.EXTERNAL) &&
                  lspType === LspType.INDIVIDUAL &&
                  page === 9 && (
                    <Button size="small" type="submit" form="createAffiliationsForm">
                      Proceed
                    </Button>
                  )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.INDIVIDUAL && page === 10 && (
                  <Button size="small" type="submit" form="createAwardsAndRecogForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.ORGANIZATION && page === 2 && (
                  <Button size="small" type="submit" form="createContactInfoExternalForm">
                    Proceed
                  </Button>
                )}

                {/* END OF INDIVIDUAL  */}

                {/* START OF ORGANIZATION  */}
                {lspType === LspType.ORGANIZATION && page === 1 && (
                  <Button size="small" type="submit" form="createOrganizationDetailsForm">
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 3 && (
                  <Button size="small" type="submit" form="createSubjectMatterForm">
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 4 && (
                  <Button size="small" type="submit" form="createTrainingDetailsForm">
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 5 && (
                  <Button size="small" type="submit" form="createCoachingExpForm">
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 6 && (
                  <Button size="small" type="submit" form="createAffiliationsForm">
                    Proceed
                  </Button>
                )}

                {lspSource === LspSource.EXTERNAL && lspType === LspType.ORGANIZATION && page === 7 && (
                  <Button size="small" type="submit" form="createAwardsAndRecogForm">
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 8 && (
                  <Button size="small" type="button" onClick={() => setPage(9)}>
                    Proceed
                  </Button>
                )}

                {lspType === LspType.ORGANIZATION && page === 9 && (
                  <Button
                    size="small"
                    type="button"
                    disabled={
                      lspDataTableOrganizationMutation.isLoading ||
                      lspDataTableIndExtMutation.isLoading ||
                      lspDataTableIndIntMutation.isLoading
                        ? true
                        : false
                    }
                    onClick={onNext}
                  >
                    {lspDataTableOrganizationMutation.isLoading ||
                    lspDataTableIndExtMutation.isLoading ||
                    lspDataTableIndIntMutation.isLoading ? (
                      <Spinner color="light" size="xs" />
                    ) : null}{" "}
                    Submit
                  </Button>
                )}

                {/* END OF ORGANIZATION  */}
              </div>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
      <AddUploadPhotoAlert />
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
