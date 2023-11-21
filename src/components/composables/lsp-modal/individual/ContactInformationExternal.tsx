"use client";

import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";

export const ContactInformationExternal: FunctionComponent = () => {
  const number = useLspDetailsStore((state) => state.contactNumber);
  const setNumber = useLspDetailsStore((state) => state.setContactNumber);

  const email = useLspDetailsStore((state) => state.email);
  const setEmail = useLspDetailsStore((state) => state.setEmail);

  const address = useLspDetailsStore((state) => state.postalAddress);
  const setAddress = useLspDetailsStore((state) => state.setPostalAddress);

  return (
    <>
      <div>
        <label htmlFor="number" className="text-xs font-medium text-gray-600">
          Contact number
        </label>
        <Input
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          rows={4}
          placeholder="Enter postal address"
          className="w-full py-3 px-4 placeholder:text-gray-300 placeholder:text-xs resize-none border-gray-200 rounded-md text-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};
