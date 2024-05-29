import { TrainingNomineeStatus } from "../types/training";

export const getNomineeStatusBadgePill = (status: TrainingNomineeStatus) => {
  if (status === TrainingNomineeStatus.PENDING)
    return (
      <div className="py-0.5 text-sm text-center bg-gray-300 rounded shadow-md font-medium border border-zinc-400 text-zinc-700">
        Pending
      </div>
    );
  else if (status === TrainingNomineeStatus.DECLINED)
    return (
      <div className="py-0.5 text-sm text-center bg-red-300 font-medium text-red-700  rounded shadow-md border border-red-500">
        Declined
      </div>
    );
  else if (status === TrainingNomineeStatus.ACCEPTED)
    return (
      <div className="py-0.5 text-sm text-center bg-green-300 font-medium border border-green-500 rounded shadow-md text-green-800">
        Accepted
      </div>
    );
};
