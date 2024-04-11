"use client";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { useUserDetails } from "@lms/hooks/use-userdetails";
import { FunctionComponent, useState } from "react";
import DefaultImage from "../../../../../../../public/images/placeholders/employee-img-placeholder.jpg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import superUserAdminPhoto from "../../../../../../../public/images/placeholders/superuseradmin.png";

export const Topbar: FunctionComponent = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const router = useRouter();

  const session = useUserDetails();

  return (
    <ul className="sticky z-10 flex items-center justify-end w-full gap-0 px-10 bg-white border-b sm:right-0 h-14">
      {/* <li
        role="button"
        className="flex items-center justify-center w-8 h-8 transition-colors rounded hover:bg-gray-100 group"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-700 group-hover:text-gray-800"
        >
          <path
            d="M20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7Z"
            fill="currentColor"
            className="text-rose-500 animate-pulse"
          />
          <path d="M12 6H4V20H18V12H16V18H6V8H12V6Z" fill="currentColor" />
        </svg>
      </li> */}

      <li role="button">
        <Avatar
          size="sm"
          source={
            session?.photoUrl
              ? session?.photoUrl
              : session?.isSuperUser === true
              ? superUserAdminPhoto.src
              : DefaultImage.src
          }
          alt="avtar"
        />
      </li>

      <li role="button">
        {/* {session?.isSuperUser === true ? "Superuser Admin" : session?.email} */}
        <DropdownMenu.Root open={openMenu} onOpenChange={setOpenMenu}>
          <DropdownMenu.Trigger asChild>
            <div className="flex items-center gap-2 px-3 py-2 text-xs  text-slate-600">
              {session?.isSuperUser === true ? (session?.username).toLowerCase() : session?.email}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </DropdownMenu.Trigger>
          <AnimatePresence>
            {openMenu && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content align="center" side="bottom" sideOffset={12} asChild className="z-[999]">
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 1, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    className="flex flex-col bg-transparent rounded shadow-lg overflow-clip"
                  >
                    <DropdownMenu.Item asChild>
                      <button
                        onClick={() => router.push(`${process.env.NEXT_PUBLIC_HRMS_DASHBOARD_URL}/module-dashboard`)}
                        className="p-4 transition-colors min-w-[12rem] bg-white border-b outline-none hover:cursor-pointer hover:bg-slate-500 hover:text-white"
                      >
                        <div className="flex gap-3 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            className="w-4 h-4 stroke-green-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>

                          <span>HRMS modules</span>
                        </div>
                      </button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item asChild>
                      <button
                        // onClick={() => console.log(session)}
                        onClick={() => router.push(`${process.env.NEXT_PUBLIC_HRMS_DASHBOARD_URL}/logout`)}
                        className="p-4 transition-colors bg-white border-b outline-none hover:cursor-pointer hover:bg-slate-500 hover:text-white"
                      >
                        <div className="flex gap-3 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            className="w-4 h-4 stroke-rose-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                            />
                          </svg>

                          <span>Logout</span>
                        </div>
                      </button>
                    </DropdownMenu.Item>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
      </li>
    </ul>
  );
};
