import { Spinner } from "@lms/components/osprey/ui/spinner/view/Spinner";

export default function HistoryLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <Spinner size="large" />
    </div>
  );
}
