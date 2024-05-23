export const getSourceBadgePill = (source: string) => {
  return (
    <span
      className={`${
        source === "internal"
          ? "text-purple-600 bg-purple-50 border-purple-100"
          : "text-amber-600 bg-amber-50 border-amber-100"
      } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
    >
      {source === "internal" ? "Internal" : "External"}
    </span>
  );
};
