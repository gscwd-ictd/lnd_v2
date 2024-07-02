import { HiOutlineClock, HiOutlineThumbUp, HiThumbDown, HiThumbUp } from "react-icons/hi";

export const getNomineeAcceptanceStatusBadgePill = (
  slots: number,
  accepted: number,
  pending: number,
  declined: number,
  status: string
) => {
  if (slots <= accepted && pending === 0 && status === "nomination submitted")
    return (
      <div className="py-0.5 flex justify-center text-sm text-center text-green-200 font-medium border border-green-500 rounded shadow-md bg-green-600">
        <span className="flex gap-1 items-center">
          <HiThumbUp className="w-4 h-4 text-white" /> Slots Full
        </span>
      </div>
    );
  else if (pending > 0 && status === "nomination submitted")
    return (
      <div className="py-0.5 text-sm text-center flex justify-center text-gray-200 rounded shadow-md font-medium border border-zinc-400 bg-zinc-500">
        <span className="flex gap-1 items-center">
          <HiOutlineClock className="w-4 h-4 text-white" /> Awaiting
        </span>
      </div>
    );
  else if (accepted === 0 && declined === slots && status === "nomination submitted")
    return (
      <div className="py-0.5 flex justify-center text-sm text-center text-red-200 font-medium bg-red-600  rounded shadow-md border border-red-500">
        <span className="flex gap-1 items-center">
          <HiThumbDown className="w-4 h-4 text-white" /> All Declined
        </span>
      </div>
    );
  else if (slots > accepted && pending === 0 && status === "nomination submitted")
    return (
      <div className="py-0.5 flex justify-center text-sm text-center text-green-700 font-medium bg-green-300 rounded shadow-md border border-green-500">
        <span className="flex gap-1 items-center">Filled</span>
      </div>
    );
  else
    return (
      <div className="py-0.5 text-sm text-center flex justify-center text-gray-700 rounded shadow-md font-medium border border-zinc-400 bg-zinc-200">
        <span className="flex gap-1 items-center">Not Applicable</span>
      </div>
    );

  //   if (slots === accepted && pending === 0) return <HiCheckCircle className="w-6 h-6 text-green-600" />;
  //   else if (slots > accepted && pending === 0 && accepted > 0) return <HiCheck className="w-6 h-6 text-green-600" />;
  //   else if (pending > 0) return <HiClock className="w-6 h-6 text-zinc-500" />;
  //   else if (accepted === 0 && declined === slots) return <HiThumbDown className="w-6 h-6 text-red-500" />;
  //   else return <>-</>;
};
