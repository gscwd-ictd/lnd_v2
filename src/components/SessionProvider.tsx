import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import { FunctionComponent, PropsWithChildren, createContext } from "react";
import { Spinner } from "./osprey/ui/spinner/view/Spinner";

type SessionContextState = {
  user: any;
};

type UserAccess = {
  I: string;
  this: string;
};

export type UserProfile = {
  _id: string; // employee id
  fullName: string;
  isSuperUser: boolean;
  photoUrl: string;
  email: string;
  userAccess: Array<UserAccess>;
  userId: string; // superuser id
};

type UserDetails = {
  userDetails: UserProfile;
};

export const SessionContext = createContext<SessionContextState>({ user: undefined });

export const SessionProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
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
  } else if (!isLoading && user.isLndUser === false) {
    redirect("/modules");
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
