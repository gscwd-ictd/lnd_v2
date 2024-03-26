"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import {
  LspSource,
  LspType,
  useEditLspModalStore,
  useLspDetailsStore,
  useLspSourceStore,
  useLspTypeStore,
} from "@lms/utilities/stores/lsp-details-store";
import { isEmpty, trim } from "lodash";
import { FunctionComponent, useEffect } from "react";
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
      "TIN no. should be 9 or 12-digit with or without dashes(-)"
    )
    .required()
    .label("TIN Number"),
});

export const EditContactInformationExternal: FunctionComponent = () => {
  const tin = useLspDetailsStore((state) => state.tin);
  const email = useLspDetailsStore((state) => state.email);
  const number = useLspDetailsStore((state) => state.contactNumber);
  const lspType = useLspTypeStore((state) => state.lspType);
  const address = useLspDetailsStore((state) => state.postalAddress);
  const setTin = useLspDetailsStore((state) => state.setTin);
  const setPage = useEditLspModalStore((state) => state.setPage);
  const setEmail = useLspDetailsStore((state) => state.setEmail);
  const setNumber = useLspDetailsStore((state) => state.setContactNumber);
  const setAddress = useLspDetailsStore((state) => state.setPostalAddress);
  const lspSource = useLspSourceStore((state) => state.lspSource);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { contactNumber: number, emailAddress: email, postalAddress: address, tin },

    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // on submit
  const onSubmit = () => {
    if (lspType === LspType.ORGANIZATION) setPage(3);
    else if (lspType === LspType.INDIVIDUAL && lspSource === LspSource.INTERNAL) setPage(4);
    else if (lspType === LspType.INDIVIDUAL && lspSource === LspSource.EXTERNAL) setPage(3);
  };

  useEffect(() => {
    // pass the values from state
    setValue("tin", tin);
    setValue("contactNumber", number);
    setValue("emailAddress", email);
    setValue("postalAddress", address);
    // setValue('sex')
    reset({ contactNumber: number, tin, emailAddress: email, postalAddress: address });
  }, [email, number, address, tin]);

  return (
    <>
      <form id="editContactInfoExternalForm" key="editContactInfoExternalForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="contactNumber" className="text-xs font-medium text-gray-600">
            Contact number
          </label>
          <Input
            id="contactNumber"
            {...register("contactNumber", { value: number, onChange: (e) => setNumber(trim(e.target.value)) })}
            size="small"
            placeholder="Enter contact number"
            className="placeholder:text-xs"
            color={errors?.contactNumber ? "error" : "primary"}
            helperText={!isEmpty(errors?.contactNumber) ? errors?.contactNumber?.message : undefined}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-medium text-gray-600">
            Email address
          </label>
          <Input
            id="email"
            {...register("emailAddress", { value: email, onChange: (e) => setEmail(trim(e.target.value)) })}
            size="small"
            placeholder="Enter email address"
            className="placeholder:text-xs"
            color={errors?.emailAddress ? "error" : "primary"}
            helperText={!isEmpty(errors?.emailAddress) ? errors?.emailAddress?.message : undefined}
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
            {...register("postalAddress", { value: address, onChange: (e) => setAddress(trim(e.target.value)) })}
            id="address"
            rows={4}
            placeholder="Enter postal address"
            className={`block w-full px-4 py-3 text-sm ${
              errors?.postalAddress
                ? "border border-red-600 focus:ring-red-100 "
                : "border border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
            } rounded-md resize-none placeholder:text-gray-300 placeholder:text-xs`}
          />
          {errors?.postalAddress ? (
            <span className="pl-1 text-xs text-red-500">{errors?.postalAddress?.message}</span>
          ) : null}
        </div>
      </form>
    </>
  );
};
