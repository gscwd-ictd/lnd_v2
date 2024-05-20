import { OthersStatus } from "../types/others";

export const getOthersStatusBadgePill = (status: OthersStatus | undefined) => {
  if (status === OthersStatus.PENDING) {
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Pending</span>;
  } else if (status === OthersStatus.DONE) {
    return <span className="bg-rose-200 text-rose-600 px-1 py-0.5 text-xs rounded font-medium">Done</span>;
  }
};
