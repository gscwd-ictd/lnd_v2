import { JSONContent } from "@tiptap/react";

export type Objective = {
  id: string;
  name: string;
};

export type TrainingDesign = {
  id: string;
  courseTitle: string | JSONContent;
  rationale: string | JSONContent;
  courseDesc: string | JSONContent;
  courseObj: string | JSONContent;
  targetParticipants: string | JSONContent;
  methodologies: string | JSONContent;
  expectedOutputs: string | JSONContent;
  recognition: string | JSONContent;
  trainingPrerequisite: string | JSONContent;
};
