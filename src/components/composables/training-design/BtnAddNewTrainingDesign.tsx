"use client";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { useRouter } from "next/navigation";

export const BtnAddNewTrainingDesign = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <Button size="small" onClick={() => router.push("/trainings/design/create")}>
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
    </DropdownMenu.Root>
  );
};
