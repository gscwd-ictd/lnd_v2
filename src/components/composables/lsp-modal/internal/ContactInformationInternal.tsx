"use client";

import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const ContactInformationInternal: FunctionComponent = () => {
  const { contactNumber, email, postalAddress } = useLspDetailsStore();

  return (
    <>
      <div>
        <label htmlFor="number" className="text-xs font-medium text-gray-600">
          Contact number
        </label>
        <Input
          id="number"
          value={contactNumber}
          disabled
          size="small"
          placeholder="Enter contact number"
          className="placeholder:text-xs"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-medium text-gray-600">
          Email address
        </label>
        <Input
          id="email"
          value={email}
          disabled
          size="small"
          placeholder="Enter email address"
          className="placeholder:text-xs"
        />
      </div>

      <div>
        <label htmlFor="address" className="text-xs font-medium text-gray-600">
          Postal address
        </label>
        <textarea
          value={postalAddress}
          disabled
          id="address"
          rows={4}
          placeholder="Enter postal address"
          className={`bg-gray-100 text-gray-500 w-full py-3 px-3 placeholder:text-gray-300 placeholder:text-xs resize-none border-gray-100 rounded-md text-sm`}
        />
      </div>
    </>
  );
};
