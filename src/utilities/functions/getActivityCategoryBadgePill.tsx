import { OthersCategory } from "../types/others";

export const getActivityCategoryBadgePill = (
  activity: OthersCategory | undefined,
  size?: "sm" | "md" | "lg" | "xl"
) => {
  if (activity === OthersCategory.CONFERENCE) {
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Conference</span>;
  } else if (activity === OthersCategory.MEETING) {
    return <span className="bg-rose-200 text-rose-600 px-1 py-0.5 text-xs rounded font-medium">Meeting</span>;
  } else if (activity === OthersCategory.WORKSHOP) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Workshop</span>;
  } else if (activity === OthersCategory.SYMPOSIUM) {
    return <span className="bg-orange-200 text-orange-600 px-1 py-0.5 text-xs rounded font-medium">Symposium</span>;
  } else if (activity === OthersCategory.SEMINAR) {
    return <span className="bg-teal-200 text-teal-600 px-1 py-0.5 text-xs rounded font-medium">Seminar</span>;
  } else if (activity === OthersCategory.CONVENTION) {
    return <span className="bg-red-200 text-red-600 px-1 py-0.5 text-xs rounded font-medium">Convention</span>;
  } else if (activity === OthersCategory.ORIENTATION) {
    return <span className="bg-orange-200 text-orange-600 px-1 py-0.5 text-xs rounded font-medium">Orientation</span>;
  }
};

export const getActivityCategorySelectionBadgePill = (
  activity: OthersCategory | undefined,
  size?: "sm" | "md" | "lg" | "xl"
) => {
  if (activity === OthersCategory.CONFERENCE) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Conference</span>;
  } else if (activity === OthersCategory.MEETING) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Meeting</span>;
  } else if (activity === OthersCategory.WORKSHOP) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Workshop</span>;
  } else if (activity === OthersCategory.SYMPOSIUM) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Symposium</span>;
  } else if (activity === OthersCategory.SEMINAR) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Seminar</span>;
  } else if (activity === OthersCategory.CONVENTION) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Convention</span>;
  } else if (activity === OthersCategory.ORIENTATION) {
    return <span className="bg-green-200 text-green-600 px-1 py-0.5 text-xs rounded font-medium">Orientation</span>;
  }
};
