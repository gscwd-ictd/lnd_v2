import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect, permanentRedirect } from "next/navigation";
import { FunctionComponent, PropsWithChildren, createContext } from "react";
import { Spinner } from "./osprey/ui/spinner/view/Spinner";

type SessionContextState = {
  user: any;
};

export const SessionContext = createContext<SessionContextState>({ user: undefined });

export const SessionProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HRMS_DOMAIN_BE}/users/details`, {
        withCredentials: true,
      });

      return data;
    },
    retry: false,
  });

  if (!isLoading && user === undefined) {
    redirect("/login");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner borderSize={4} size="large" />
      </div>
    );
  }

  return <SessionContext.Provider value={{ user }}>{children}</SessionContext.Provider>;
};
