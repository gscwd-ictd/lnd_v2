import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
import { useLspDetailsStore, useLspSourceStore } from "@lms/utilities/stores/lsp-details-store";
import defaultPhoto from "../../../../../public/images/placeholders/user-placeholder-gray.png";
import { useQuery } from "@tanstack/react-query";
import { Disclosure } from "@headlessui/react";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { useOrgSlideOver } from "../OrganizationLspDataTable";
import { OrgAvatarWithAppwriteUpload } from "@lms/components/osprey/ui/avatar/view/OrgAvatarWithAppwriteUpload";

export const OrganizationSlideOver = () => {
  const setName = useLspDetailsStore((state) => state.setName);
  const reset = useLspDetailsStore((state) => state.reset);
  const setPhotoUrl = useLspDetailsStore((state) => state.setPhotoUrl);
  const setPhotoId = useLspDetailsStore((state) => state.setPhotoId);
  const source = useLspSourceStore((state) => state.lspSource);

  const { id: rowId, slideOverIsOpen, setSlideOverIsOpen, setId } = useOrgSlideOver();

  // all lsp query
  const { data: allLsp, error: errorAllLsp } = useQuery({
    queryKey: ["lsp-organization-details", rowId],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/lsp/${rowId}`);

      setName(data.name);
      setPhotoId(data.photoId);
      setPhotoUrl(data.photoUrl);
      return data;
    },
    enabled: !!rowId,
  });

  return (
    <SlideOver
      open={slideOverIsOpen}
      setOpen={setSlideOverIsOpen}
      size="lg"
      onClose={() => {
        reset();
        setSlideOverIsOpen(false);
        setId(null);
      }}
    >
      <SlideOver.Body>
        <div className="px-10 py-2 pt-5">
          <OrgAvatarWithAppwriteUpload source={allLsp?.photoUrl ? allLsp?.photoUrl : defaultPhoto.src} size="9xl" />

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
          {/* Education */}
          <Disclosure>
            {({ open }) => (
              <div className="">
                <div className="flex items-center justify-between">
                  <Disclosure.Button className="flex items-center justify-between w-full py-2">
                    <div className="text-start">
                      <span className="font-medium text-indigo-700 text-md ">Education</span>
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
                  {allLsp?.education && allLsp?.education.length > 0 ? (
                    allLsp?.education.map((educ: { institution: string; degree: string }, index: number) => {
                      return (
                        <li key={index} className="pl-2 space-y-3 text-sm text-gray-700">
                          ✓ <span className="text-black font-sans">{educ.institution}</span> - {educ.degree}
                        </li>
                      );
                    })
                  ) : (
                    <div className="flex w-full h-[2rem] ">
                      <span className="pl-2 space-y-3 text-sm text-gray-400">✗ No Education Found</span>
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
                            ✓ <span className="text-black font-sans">{affiliations.position}</span> of{" "}
                            <span>{affiliations.institution}</span>
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
        </div>
      </SlideOver.Body>
    </SlideOver>
  );
};
