"use client";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { useRankingStore } from "@lms/utilities/stores/ranking-store";
import { url } from "@lms/utilities/url/api-url";
import { useRankingsDataTable } from "./data-table/use-rankings-data-table";
import { useQueryClient } from "@tanstack/react-query";
import UseWindowDimensions from "@lms/utilities/functions/WindowDimensions";
import { useEffect, useState } from "react";
import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export const LspAllRankingsModal = () => {
  const open = useRankingStore((state) => state.modalIsOpen);
  const setOpen = useRankingStore((state) => state.setModalIsOpen);
  const { columns } = useRankingsDataTable();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState<string>("");

  const lspRankings = queryClient.getQueryState(["all-lsp-rating-ranking"]);

  const { windowWidth } = UseWindowDimensions();
  const [tabIsClicked, setTabIsClicked] = useState<boolean>(true);

  useEffect(() => {
    if (tabIsClicked) {
      setTimeout(() => {
        setTabIsClicked(false);
      }, 100);
    }
  }, [tabIsClicked]);

  return (
    <>
      <Modal isOpen={open} setIsOpen={setOpen} size={windowWidth! > 1024 ? "lg" : "full"}>
        <ModalContent>
          <ModalContent.Title>
            <header>
              <h3 className="font-sans text-lg">Learning Service Provider Ranking</h3>
            </header>
          </ModalContent.Title>
          <ModalContent.Body>
            <main className="py-2">
              {/* ALL */}
              <div className="flex gap-0 select-none">
                <button
                  className={`border-t border-x rounded-t min-w-[6rem] ${
                    query === "" ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-600"
                  }`}
                  onClick={() => {
                    setQuery("");
                    setTabIsClicked(true);
                  }}
                >
                  <span className="w-full justify-center flex text-sm py-1 font-medium px-2">All</span>
                </button>

                {/* INDIVIDUAL */}
                <button
                  className={`border-t border-x rounded-t min-w-[6rem] ${
                    query === "?type=individual" ? "bg-rose-600 text-white" : "bg-rose-200 text-rose-600"
                  }`}
                  onClick={() => {
                    setQuery("?type=individual");
                    setTabIsClicked(true);
                  }}
                >
                  <span className="w-full justify-center flex text-sm py-1 font-medium px-2">Individual</span>
                </button>

                {/* ORGANIZATION */}
                <button
                  className={`border-t border-x rounded-t min-w-[6rem] ${
                    query === "?type=organization" ? "bg-emerald-600 text-white" : "text-emerald-600 bg-emerald-200"
                  }`}
                  onClick={() => {
                    setQuery("?type=organization");
                    setTabIsClicked(true);
                  }}
                >
                  <span className="w-full justify-center flex text-sm py-1 font-medium px-2">Organization</span>
                </button>
              </div>

              {tabIsClicked ? (
                <div className="w-full h-full justify-center items-center flex overflow-hidden">
                  <Spinner size="large" />
                </div>
              ) : (
                <DataTable
                  datasource={`${url}/stats/lsp/rating${query}`}
                  columns={columns}
                  queryKey={["all-lsp-rating-ranking"]}
                />
              )}
            </main>
          </ModalContent.Body>
        </ModalContent>
      </Modal>
    </>
  );
};
