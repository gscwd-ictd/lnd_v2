// nomination skipped
// nomination submitted

export const getNominationStatusBadgePill = (
  status: "nomination pending" | "nomination skipped" | "nomination submitted"
) => {
  if (status === "nomination pending")
    return (
      <div className="py-0.5 text-sm text-center bg-gray-300 rounded shadow-md font-medium border border-zinc-400 text-zinc-700">
        Pending
      </div>
    );
  else if (status === "nomination skipped")
    return (
      <div className="py-0.5 text-sm text-center bg-red-300 font-medium text-red-700  rounded shadow-md border border-red-500">
        Skipped
      </div>
    );
  else if (status === "nomination submitted")
    return (
      <div className="py-0.5 text-sm text-center bg-green-300 font-medium border border-green-500 rounded shadow-md text-green-800">
        Submitted
      </div>
    );
};
