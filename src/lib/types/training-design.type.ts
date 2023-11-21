import { JSONContent } from "@tiptap/react";

export type TrainingDesign = {
  id?: string;
  courseTitle: string;
  rationale: JSONContent | string;
  courseDesc: JSONContent | string;
  courseObj: JSONContent | string;
  targetParticipants: JSONContent | string;
  methodologies: JSONContent | string;
  expectedOutput: JSONContent | string;
  recognition: JSONContent | string;
  createdAt?: string;
  updatedAt?: string;
};
