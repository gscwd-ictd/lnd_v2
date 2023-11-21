import { TrainingTypes } from "../stores/training-notice-store";

// custom function to return an enum based on string param
export const getTrainingTypeFromString = (value: string): TrainingTypes | undefined => {
  if (value == TrainingTypes.FOUNDATIONAL) return TrainingTypes.FOUNDATIONAL;
  else if (value == TrainingTypes.TECHNICAL) return TrainingTypes.TECHNICAL;
  else if (value == TrainingTypes.PROFESSIONAL) return TrainingTypes.PROFESSIONAL;
  else if (value == TrainingTypes.SUPERVISORY) return TrainingTypes.SUPERVISORY;
  else if (value == TrainingTypes.LEADERSHIP_MANAGERIAL) return TrainingTypes.LEADERSHIP_MANAGERIAL;
  else return undefined;
};

// custom function to return a Capitalized label based on TrainingTypes param
export const getCapitalizedTrainingType = (type: TrainingTypes): string => {
  if (type == TrainingTypes.FOUNDATIONAL) return "Foundational";
  else if (type == TrainingTypes.TECHNICAL) return "Technical";
  else if (type == TrainingTypes.PROFESSIONAL) return "Professional";
  else if (type == TrainingTypes.SUPERVISORY) return "Supervisory";
  else if (type == TrainingTypes.LEADERSHIP_MANAGERIAL) return "Leadership/Managerial";
  else return "";
};
