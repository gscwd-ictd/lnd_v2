export type ExternalTraining = {
  createdAt: Date;
  id: string;
  lspName: string;
  location: string;
  courseTitle: string;
  trainingStart: string;
  trainingEnd: string;
  numberOfHours: number;
  courseContent: [];
  nomineeQualifications: [];
  deadlineForSubmission: Date;
  invitationUrl: string;
  numberOfParticipants: number;
  status: string;
};
