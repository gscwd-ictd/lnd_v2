import { Disclosure } from "@headlessui/react";
import { useBenchmarkingStore } from "@lms/utilities/stores/benchmarking-store";
import dayjs from "dayjs";
import { FunctionComponent } from "react";

export const AddBenchmarkingDetailsSummary: FunctionComponent = () => {
  const title = useBenchmarkingStore((state) => state.title);
  const partner = useBenchmarkingStore((state) => state.partner);
  const location = useBenchmarkingStore((state) => state.location);
  const dateStarted = useBenchmarkingStore((state) => state.dateStarted);
  const dateEnd = useBenchmarkingStore((state) => state.dateEnd);
  const filesToUpload = useBenchmarkingStore((state) => state.filesToUpload);
  const participants = useBenchmarkingStore((state) => state.participants);

  return (
    <div className="flex flex-col gap-2 px-6 py-4 text-sm text-gray-700 border-2 border-dashed rounded-lg bg-gray-50">
      {/* TITLE */}
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        {title}
      </div>

      {/* PARTNER */}
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>

        {partner}
      </div>

      {/* LOCATION */}

      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {location}
      </div>

      {/* DATE START */}
      <div className="flex items-center justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {dayjs(dateStarted).diff(dayjs(dateEnd), "day") === 0 ? (
          <>
            <span className="">{dayjs(dateStarted).format("MMMM DD, YYYY")}</span>
          </>
        ) : (
          <>
            <span className="">From</span>{" "}
            <span className="font-medium font-sans">{dayjs(dateStarted).format("MMMM DD, YYYY")}</span>{" "}
            <span className="">To</span>{" "}
            <span className="font-medium font-sans">{dayjs(dateEnd).format("MMMM DD, YYYY")}</span>
          </>
        )}
      </div>

      {/* BUCKET FILES */}
      <div className="flex items-start justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex items-center justify-between w-full transition-all " tabIndex={-1}>
                <div className="text-green-500 ">
                  {filesToUpload?.length}{" "}
                  {filesToUpload?.length > 1
                    ? "files to upload"
                    : filesToUpload?.length === 1
                    ? "file to upload"
                    : null}
                </div>
              </Disclosure.Button>

              <Disclosure.Panel className="" as="ul">
                {filesToUpload &&
                  filesToUpload.map((file, idx) => {
                    return (
                      <div key={idx} className="pb-1 pl-5">
                        <span className="text-xs">{idx + 1}. </span>
                        <span className="text-xs text-zinc-500 hover:text-green-700 active:text-green-800 ">
                          {file.name}
                        </span>
                        {/* <Link href={file.href} target="_blank">
                            <span className="text-xs text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                              {file.name}
                            </span>
                          </Link> */}
                      </div>
                    );
                  })}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>

      {/* PARTICIPANTS */}
      <div className="flex items-start justify-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>

        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex items-center justify-between w-full transition-all " tabIndex={-1}>
                <div className="text-indigo-500 ">
                  {participants.length}{" "}
                  {participants.length > 1 ? "participants" : participants.length === 1 ? "participant" : null}
                </div>
              </Disclosure.Button>

              <Disclosure.Panel className="" as="ul">
                {participants &&
                  participants.map((participant, idx) => {
                    return (
                      <div key={idx} className="pb-1 pl-5">
                        <span className="text-xs">{idx + 1}. </span>
                        <span className="text-xs text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                          {participant.name}
                        </span>
                        {/* <Link href={file.href} target="_blank">
                            <span className="text-xs text-zinc-500 hover:text-indigo-700 active:text-indigo-800 ">
                              {file.name}
                            </span>
                          </Link> */}
                      </div>
                    );
                  })}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
