"use client";
import { getNomineeStatusBadgePill } from "@lms/utilities/functions/getNomineeStatusBadgePill";
import { EmployeeWithSupervisor } from "@lms/utilities/types/training";
import { createColumnHelper } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import { Tooltip } from "@lms/components/osprey/ui/tooltip/view/Tooltip";
import { HiRefresh } from "react-icons/hi";
import { useState } from "react";

export type Nominee = {
  name: string;
  nomineeId: string;
  employeeId: string;
};

type Person = {
  fullName: string;
  employeeId: string;
};

export type Supervisor = {
  distributionId: string;
  name: string;
  supervisorId: string;
};

export type EmployeeWithTag = Omit<Nominee, "nomineeId"> & { isTagged: boolean };

export type EmployeeSelectProps = {
  label: string;
  value: EmployeeWithTag;
};

export const useViewNomineesStatusDataTable = () => {
  const [viewAuxModalIsOpen, setViewAuxModalIsOpen] = useState<boolean>(false);
  const [confirmAddTraineesAlertIsOpen, setConfirmAddAlertTraineesIsOpen] = useState<boolean>(false);
  const [viewAdditionalTraineesModalIsOpen, setViewAdditionalTraineesModalIsOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [nominee, setNominee] = useState<Nominee>({} as Nominee);
  const [standInTrainees, setStandInTrainees] = useState<Array<Nominee>>([]);
  const [supervisor, setSupervisor] = useState<Supervisor>({} as Supervisor);
  const [supervisors, setSupervisors] = useState<Array<Person>>([]);
  const [employees, setEmployees] = useState<Array<{ label: string; value: EmployeeWithTag }>>([]);
  const [countEmployees, setCountEmployees] = useState<number>(0);
  const [acceptedEmployees, setAcceptedEmployees] = useState<number>(0);
  const [nominatedEmployees, setNominatedEmployees] = useState<number>(0);
  const [declinedEmployees, setDeclinedEmployees] = useState<number>(0);

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
                <div className="w-full text-start hover:cursor-context-menu">{info.row.original.remarks}</div>
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
          {/* Accepted : {acceptedEmployees}
          Counted : {countEmployees} */}
          {info.row.original.status === "declined" &&
          info.row.original.isReplacedBy === false &&
          acceptedEmployees < countEmployees ? (
            <button
              className="border p-2 rounded flex justify-center w-full bg-gray-100 active:bg-gray-300 hover:bg-gray-200"
              onClick={() => {
                setViewAuxModalIsOpen(true);
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
    viewAuxModalIsOpen,
    reason,
    nominee,
    supervisor,
    standInTrainees,
    viewAdditionalTraineesModalIsOpen,
    supervisors,
    employees,
    confirmAddTraineesAlertIsOpen,
    acceptedEmployees,
    countEmployees,
    declinedEmployees,
    nominatedEmployees,
    setAcceptedEmployees,
    setCountEmployees,
    setDeclinedEmployees,
    setNominatedEmployees,
    setConfirmAddAlertTraineesIsOpen,
    setEmployees,
    setSupervisors,
    setViewAdditionalTraineesModalIsOpen,
    setSupervisor,
    setNominee,
    setStandInTrainees,
    setViewAuxModalIsOpen,
    setReason,
  };
};
