"use client";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
import { useRankingStore } from "@lms/utilities/stores/ranking-store";
import { url } from "@lms/utilities/url/api-url";
import { useRankingsDataTable } from "./data-table/use-rankings-data-table";
import { useQueryClient } from "@tanstack/react-query";
import UseWindowDimensions from "@lms/utilities/functions/WindowDimensions";

export const LspAllRankingsModal = () => {
  const open = useRankingStore((state) => state.modalIsOpen);
  const setOpen = useRankingStore((state) => state.setModalIsOpen);
  const { columns } = useRankingsDataTable();
  const queryClient = useQueryClient();

  const lspRankings = queryClient.getQueryState(["all-lsp-rating-ranking"]);

  const { windowWidth } = UseWindowDimensions();

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
              {/* Fetch status: {JSON.stringify(lspRankings?.fetchStatus)}
              Status: {JSON.stringify(lspRankings?.status)} */}
              <div className="flex gap-2 select-none">
                <button className="border-t border-x rounded-t w-[6rem] bg-indigo-600 text-white ">
                  <span className="w-full justify-center flex text-sm py-1 uppercase">All</span>
                </button>
              </div>
              <DataTable
                datasource={`${url}/stats/lsp/rating`}
                columns={columns}
                queryKey={["all-lsp-rating-ranking"]}
              />
            </main>
          </ModalContent.Body>
        </ModalContent>
      </Modal>
    </>
  );
};
