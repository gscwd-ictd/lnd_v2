"use client";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HiStar, HiUserCircle } from "react-icons/hi";
import Image from "next/image";
import { useRankingStore } from "@lms/utilities/stores/ranking-store";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { LspDetails } from "./data-table/use-rankings-data-table";

export const LspRankingsTable = () => {
  const { data, isLoading, isError } = useQuery({
    retry: 2,
    queryKey: ["top-5-lsp-rating-ranking"],
    queryFn: async () => {
      const getUpdatedLspRankings = await axios.get(`${url}/stats/lsp/rating`);
      console.log(getUpdatedLspRankings.data.items);
      return getUpdatedLspRankings;
    },
  });

  const open = useRankingStore((state) => state.modalIsOpen);
  const setOpen = useRankingStore((state) => state.setModalIsOpen);

  if (isLoading) return <Spinner size="large" borderSize={2} />;
  if (isError) return <>ERROR FETCHING</>;

  return (
    <div className="flex flex-col pt-2 items-start h-full w-full justify-between relative overflow-x-auto">
      <div className="w-full rounded h-full flex flex-col justify-between ">
        <section>
          {/* Header */}
          <div className="w-full flex p-2 pt-4 ">
            <div className="w-[10%] text-center font-sans text-xs text-gray-500 font-normal">#</div>
            <div className="w-[70%] text-start font-sans text-xs text-gray-500 font-normal">Name</div>
            <div className="w-[20%] text-center font-sans text-xs text-gray-500 font-normal">Average</div>
          </div>
          <hr className="border-gray-200/70" />

          {/* Body */}
          <div className="w-full px-2">
            {data?.data?.items?.slice(0, 5).map((lsp: LspDetails, index: number) => {
              return (
                <div key={lsp.lspId} className="items-center py-4 bg-white w-full flex border-b last:border-none ">
                  <div className="w-[10%] text-gray-700 text-center font-medium items-center  flex justify-center">
                    <span
                      className={`${
                        index + 1 === 1
                          ? "text-amber-500"
                          : index + 1 === 2
                          ? "text-slate-500"
                          : index + 1 === 3
                          ? "text-amber-900"
                          : "text-gray-800"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="w-[70%] text-sm text-gray-800 text-start font-semibold flex gap-2 items-center">
                    {lsp.photoUrl === null || lsp.photoUrl === "" || lsp.photoUrl == undefined ? (
                      <HiUserCircle className="w-6 h-6 text-slate-500" />
                    ) : (
                      <Image src={lsp.photoUrl} alt="user-image" className="w-6 h-6" />
                    )}
                    {lsp.name}
                  </div>
                  <div className="w-[20%] text-gray-600 text-center text-lg gap-1 flex justify-center ">
                    <span>{lsp.average}</span>
                    <div>
                      <HiStar className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="border-gray-200/70" />
        </section>
        {/* Button */}
        <div className="flex w-full justify-end p-4 ">
          <button
            className="text-xs border-2 border-teal-400 bg-white px-3 py-2 rounded w-full text-teal-500 hover:bg-teal-100 active:bg-teal-200  font-sans tracking-widest uppercase"
            onClick={() => setOpen(true)}
          >
            View more
          </button>
        </div>
      </div>
    </div>
  );
};
