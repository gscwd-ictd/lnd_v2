import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export default function TrainingCertificatesLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="large" />
    </div>
  );
}
