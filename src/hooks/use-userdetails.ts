"use client";
import { SessionContext } from "@lms/components/SessionProvider";
import { useContext } from "react";

export const useUserDetails = () => {
  const session = useContext(SessionContext);
  return session.user;
};
