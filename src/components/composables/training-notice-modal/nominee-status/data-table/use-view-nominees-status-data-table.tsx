"use client";
import { getNomineeStatusBadgePill } from "@lms/utilities/functions/getNomineeStatusBadgePill";
import { EmployeeWithSupervisor } from "@lms/utilities/types/training";
import { createColumnHelper } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { HiRefresh } from "react-icons/hi";
import { useViewNomineesContext } from "../ViewNomineeStatusModal";
import { useState } from "react";

export type Nominee = {
  name: string;
  nomineeId: string;
  employeeId: string;
};

export type Supervisor = {
  distributionId: string;
  name: string;
  supervisorId: string;
};

export const useViewNomineesStatusDataTable = () => {
  const [auxModalIsOpen, setAuxModalIsOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [nominee, setNominee] = useState<Nominee>({} as Nominee);
  const [standInTrainees, setStandInTrainees] = useState<Array<Nominee>>([]);
  const [supervisor, setSupervisor] = useState<Supervisor>({} as Supervisor);

  const helper = createColumnHelper<EmployeeWithSupervisor>();

  const columns = [
    helper.accessor("name", {
      header: "Employee Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    helper.accessor("supervisor.name", {
      header: "Supervisor Name",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    helper.accessor("status", {
      header: "Status",
      cell: (info) => getNomineeStatusBadgePill(info.getValue()!),
    }),

    helper.accessor("remarks", {
      header: "Remarks",
      cell: (info) => (
        <div className="max-w-[16rem]">
          {isEmpty(info.getValue()) ? (
            "-"
          ) : (
            <div className=" w-full line-clamp-1">
              <Tooltip content={info.row.original.remarks!}>
                <div className="w-full text-start hover:cursor-wait">{info.row.original.remarks}</div>
              </Tooltip>
            </div>
          )}
        </div>
      ),
    }),

    helper.display({
      header: "Action",
      cell: (info) => (
        <div className="flex w-full justify-center">
          {info.row.original.status === "declined" && info.row.original.isReplacedBy === false ? (
            <button
              className="border p-2 rounded flex justify-center w-full bg-gray-100 active:bg-gray-300 hover:bg-gray-200"
              onClick={() => {
                setAuxModalIsOpen(true);
                setReason(info.row.original.remarks!);
                setNominee({
                  employeeId: info.row.original.employeeId,
                  name: info.row.original.name,
                  nomineeId: info.row.original.nomineeId!,
                });
                setSupervisor({
                  distributionId: info.row.original.supervisor.distributionId!,
                  name: info.row.original.supervisor.name,
                  supervisorId: info.row.original.supervisor.supervisorId,
                });
              }}
            >
              <HiRefresh className="w-4 h-4 text-emerald-600" />
            </button>
          ) : (
            "-"
          )}
        </div>
      ),
    }),
  ];

  return {
    columns,
    auxModalIsOpen,
    reason,
    nominee,
    supervisor,
    standInTrainees,
    setSupervisor,
    setNominee,
    setStandInTrainees,
    setAuxModalIsOpen,
    setReason,
  };
};
