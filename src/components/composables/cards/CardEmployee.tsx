"use client";
import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
import { useUserDetails } from "@lms/hooks/use-userdetails";
import { LearningSVG } from "@lms/svg/LearningSVG";

export const CardEmployee = () => {
  const user = useUserDetails();

  return (
    <div className="static flex flex-col w-full h-[18rem] bg-white rounded-md border shadow overflow-hidden">
      {/** TOP PART */}
      <section className="min-w-full h-[50%] bg-slate-200 rounded-t ">
        <div className="flex flex-col p-6">
          <span className="font-medium text-slate-700">Welcome Back</span>
          <span className="z-10 text-sm font-normal text-slate-500">Learning & Development Dashboard</span>
        </div>
        <div className="flex items-center justify-end w-full h-full pl-[50%] pr-2">
          <LearningSVG />
        </div>
      </section>

      {/** BOTTOM PART */}
      <section className="w-full h-[50%] rounded-b p-6">
        <div className="font-medium text-gray-700">
          {user?.photoUrl ? (
            <div>
              <Avatar source={user.photoUrl} size="xl" />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="mx-5 bg-white border rounded-full xs:h-16 sm:w-6 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xs:-mt-8 sm:-mt-8 md:-mt-8 lg:-mt-8 fill-slate-700/90"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col ">
          <span className="font-medium text-slate-600">{user?.fullName}</span>
          <span className="text-sm font-light text-slate-500 ">{user?.email}</span>
        </div>
      </section>
    </div>
  );
};
