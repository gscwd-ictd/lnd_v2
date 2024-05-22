"use client";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Lsp = {
  lspId: string;
  name: string;
  type: string;
  source: string;
  average: number;
};

export const LspRankings = () => {
  const { data, isLoading, isError } = useQuery({
    retry: 2,
    queryKey: ["all-lsp-rating-ranking"],
    queryFn: async () => {
      const getUpdatedLspRankings = await axios.get(`${url}/stats/lsp/rating`);
      console.log(getUpdatedLspRankings.data);
      return getUpdatedLspRankings;
    },
  });

  if (isLoading) return <Spinner size="large" />;
  if (isError) return <>ERROR FETCHING</>;

  return (
    <>
      <div className="flex flex-col items-start h-[30rem]  w-full justify-between relative overflow-x-auto">
        {/* <section className="w-full pt-2">
          {data?.data?.items?.slice(0, 10).map((lsp: Lsp) => {
            return (
              <div key={lsp.lspId} className="flex w-full gap-1 justify-between space-y-1 items-center ">
                <span className="text-sm text-gray-800">{lsp.name}</span>
                <span className="text-gray-800">{Number(lsp.average)}</span>
              </div>
            );
          })}
        </section> */}
        <div className="bg-gray-200 w-full">
          <table className="w-full rounded ">
            <thead>
              <tr>
                <th className="text-center font-sans text-xs text-gray-500 font-normal">#</th>
                <th className="text-start font-sans text-xs text-gray-500 font-normal">Name</th>
                {/* <th className="text-center font-sans text-xs text-gray-500 font-normal">Source</th>
              <th className="text-center font-sans text-xs text-gray-500 font-normal">Type</th> */}
                <th className="text-center font-sans text-xs text-gray-500 font-normal">Average</th>
              </tr>
            </thead>
            <tbody className="">
              {data?.data?.items?.slice(0, 10).map((lsp: Lsp, index: number) => {
                return (
                  <tr key={lsp.lspId} className="items-center space-y-3 border border-gray-200 bg-white rounded-lg ">
                    <td className="text-md text-gray-700 text-center">{index + 1}</td>
                    <td className="text-sm text-gray-800 text-start">{lsp.name}</td>
                    {/* <td className="text-sm text-gray-800 text-center">{lsp.source}</td>
                  <td className="text-sm text-gray-800 text-center">{lsp.type}</td> */}
                    <td className="text-gray-800 text-center">{Number(lsp.average)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex w-full justify-end">
          <button className="text-xs text-white bg-indigo-500 px-3 py-2 rounded">View more</button>
        </div>
      </div>
    </>
  );
};
