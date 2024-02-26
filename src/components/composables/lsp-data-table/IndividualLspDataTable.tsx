"use client";

import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { FunctionComponent, useState } from "react";
import { url } from "@lms/utilities/url/api-url";
import { LearningServiceProvider } from "@lms/utilities/types/lsp";
import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useIndividualLspDataTable } from "./hooks/use-individual-lsp-data-table";
import { EditLspIndividualModal } from "../lsp-modal/individual/EditLspIndividualModal";
import { DeleteLspIndividualAlertDialog } from "../lsp-modal/individual/DeleteLspIndividualAlertDialog";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import employeePlaceholder from "../../../../public/images/placeholders/employee-img-placeholder.jpg";

export const IndividualLspDataTable: FunctionComponent = () => {
  const { columns, edit, remove, lspId, setEdit, setRemove } = useIndividualLspDataTable();
  const [open, setOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string | undefined>(undefined);

  // all lsp query
  const { data: allLsp, error: errorAllLsp } = useQuery({
    queryKey: ["lsp-details", rowId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/lsp-details/${rowId}`);

      return data;
    },
    enabled: !!rowId,
  });

  return (
    <>
      <SlideOver open={open} setOpen={setOpen} size="lg">
        {/* <SlideOver.Title>
          <span className="px-10 mt-2">Learning Service Provider</span>
        </SlideOver.Title> */}
        <SlideOver.Body>
          {/* {allLsp && JSON.stringify(allLsp)} */}

          <div className="px-10 py-2 pt-5">
            <Image
              src={allLsp?.photoUrl ? allLsp?.photoUrl : employeePlaceholder}
              alt="employee-photo"
              height={120}
              width={120}
              // placeholder="blur"
              objectFit="cover"
              className="rounded-full"
            />
            <div className="font-sans text-2xl font-semibold">{allLsp?.name}</div>
            <div className="flex items-center gap-2">
              <div className="text-lg text-indigo-600">{allLsp?.email}</div>|
              <div className="text-lg text-gray-800">{allLsp?.contactNumber}</div>
            </div>
            <div className="text-xs text-gray-600">{allLsp?.postalAddress}</div>
            <div className="mt-2 text-sm font-medium text-gray-700">“{allLsp?.introduction}”</div>
            <div className="items-center mt-2 mb-5 text-sm text-gray-600">
              {allLsp?.experience > 1
                ? `${allLsp?.experience} years of experience `
                : allLsp?.experience === 1
                ? "1 year of experience"
                : "No experience"}
            </div>

            {/* Expertise */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Expertise</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.expertise && allLsp?.expertise.length > 0 ? (
                      allLsp?.expertise.map((exp: { subjectMatter: string }, index: number) => {
                        return (
                          <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                            ✓ {exp.subjectMatter}
                          </li>
                        );
                      })
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Expertise Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* Trainings */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Trainings</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.trainings && allLsp?.trainings.length > 0 ? (
                      allLsp?.trainings.map((training: { name: string }, index: number) => {
                        return (
                          <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                            ✓ {training.name}
                          </li>
                        );
                      })
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Trainings Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* Projects */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Projects</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.projects && allLsp?.projects.length > 0 ? (
                      allLsp?.projects.map((project: { name: string }, index: number) => {
                        return (
                          <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                            ✓ {project.name}
                          </li>
                        );
                      })
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Projects Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* Affiliations */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Affiliations</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.affiliations && allLsp?.affiliations.length > 0 ? (
                      allLsp?.affiliations.map(
                        (affiliations: { position: string; institution: string }, index: number) => {
                          return (
                            <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                              ✓ <span>{affiliations.position}</span> of <span>{affiliations.institution}</span>
                            </li>
                          );
                        }
                      )
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Affiliations Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* Certifications */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Certifications</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.certifications && allLsp?.certifications.length > 0 ? (
                      allLsp?.certifications.map((certification: { name: string }, index: number) => {
                        return (
                          <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                            ✓ {certification.name}
                          </li>
                        );
                      })
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Certifications Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* Coaching */}
            <Disclosure>
              {({ open }) => (
                <div className="">
                  <div className="flex items-center justify-between">
                    <Disclosure.Button className="flex items-center justify-between w-full py-2">
                      <div className="text-start">
                        <span className="font-medium text-indigo-700 text-md ">Coaching</span>
                        {/* <p className="text-sm text-gray-500">{exp.subjectMatter}</p> */}
                      </div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={open ? "rotate-180 transform stroke-indigo-600" : "transform stroke-gray-700"}
                      >
                        <path
                          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel className="" as="ul">
                    {allLsp?.coaching && allLsp?.coaching.length > 0 ? (
                      allLsp?.coaching.map((coach: { name: string }, index: number) => {
                        return (
                          <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                            ✓ {coach.name}
                          </li>
                        );
                      })
                    ) : (
                      <div className="flex w-full h-[2rem] ">
                        <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Coaching Found</span>
                      </div>
                    )}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        </SlideOver.Body>
      </SlideOver>
      <DataTable<LearningServiceProvider>
        // datasource={`${url}/lsp-details/individual?page=1&limit=40`}
        datasource={`${url}/lsp-details/q?type=individual&page=1&limit=40`}
        queryKey={["lsp-individual"]}
        columns={columns}
        title="Learning Service Providers"
        subtitle="Select any of the learning service providers below to view details."
        onRowClick={(row) => {
          setOpen(true);
          setRowId(row.original.id!);
        }}
      />

      {/* <Modal isOpen={edit} setIsOpen={setEdit}>
        <ModalContent>
          <ModalContent.Body>{JSON.stringify(firstName)}</ModalContent.Body>
        </ModalContent>
      </Modal> */}
      <DeleteLspIndividualAlertDialog id={lspId} remove={remove} setRemove={setRemove} />
      <EditLspIndividualModal edit={edit} id={lspId} setEdit={setEdit} />
    </>
  );
};
