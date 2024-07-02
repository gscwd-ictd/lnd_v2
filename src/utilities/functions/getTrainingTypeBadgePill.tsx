import { TrainingTypes } from "../stores/training-notice-store";

// badge pill for training type
export const getTrainingTypeBadgePill = (type: TrainingTypes | undefined) => {
  if (type === TrainingTypes.FOUNDATIONAL)
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Foundational</span>;
  else if (type === TrainingTypes.TECHNICAL)
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Technical</span>;
  else if (type === TrainingTypes.PROFESSIONAL)
    return <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">Professional</span>;
  else if (type === TrainingTypes.LEADERSHIP_MANAGERIAL)
    return (
      <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium">
        Leadership/Managerial
      </span>
    );
};
