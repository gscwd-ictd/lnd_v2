"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { useLspDetailsStore } from "@lms/utilities/stores/lsp-details-store";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  contactNumber: yup
    .string()
    .required("Please enter a valid mobile number")
    .trim()
    .required()
    .label("Contact number")
    .min(10)
    .max(11)
    .matches(/^\d+$/, "Numbers are only allowed"),
  emailAddress: yup.string().trim().label("Email address").email("Invalid email format").required(),
  postalAddress: yup.string().label("Postal Address").required(),
  tin: yup
    .string()
    // .max(12)
    .trim()
    // .matches(/^([0-9]{12})$|^([0-9]{9})$|^N\/A$/, 'Write a valid TIN Number or N/A')
    .matches(
      /^([0-9]{3}[\-][0-9]{3}[\-][0-9]{3}[\-][0-9]{3})$|^([0-9]{9})$|^([0-9]{12})$|^([0-9]{3}[\-][0-9]{3}[\-][0-9]{3})$|^N\/A$/,
      "Your TIN no. should be 9 or 12-digit with or without dashes(-)"
    )
    .required()
    .label("TIN Number"),
});

export const CreateContactInfoExternalOrg: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const number = useLspDetailsStore((state) => state.contactNumber);
  const setNumber = useLspDetailsStore((state) => state.setContactNumber);

  const email = useLspDetailsStore((state) => state.email);
  const setEmail = useLspDetailsStore((state) => state.setEmail);

  const tin = useLspDetailsStore((state) => state.tin);
  const setTin = useLspDetailsStore((state) => state.setTin);

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
        <label htmlFor="tin" className="text-xs font-medium text-gray-600">
          Taxpayer Identification Number (TIN)
        </label>
        <Input
          id="tin"
          // value={Number(experience)}
          // onChange={(e) => setExperience(Number(e.target.value))}
          {...register("tin", {
            value: tin,
            onChange: (e) => setTin(e.target.value),
          })}
          size="small"
          placeholder="Enter your TIN Number or write 'N/A'"
          className="placeholder:text-xs"
          color={errors?.tin ? "error" : "primary"}
          helperText={errors?.tin ? errors?.tin?.message : undefined}
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
          className="w-full px-4 py-3 text-sm border-gray-200 rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </>
  );
};
