import { LspSource } from "../stores/lsp-details-store";

export const getTrainingSourceBadgePill = (source: LspSource | undefined, size?: "sm" | "md" | "lg" | "xl") => {
  if (source === LspSource.INTERNAL) {
    return (
      <span className="bg-indigo-200 text-indigo-600 px-1 py-0.5 text-xs rounded font-medium uppercase">Internal</span>
    );
  } else if (source === LspSource.EXTERNAL) {
    return (
      <span className="bg-yellow-200 text-yellow-600 px-1 py-0.5 text-xs rounded font-medium uppercase">External</span>
    );
  } else if (source === undefined) {
    return (
      <span className="bg-rose-200 text-rose-600 px-1 py-0.5 text-xs rounded font-medium uppercase">Undefined</span>
    );
  }
};
