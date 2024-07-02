export const getLspTypeBadgePill = (type: string) => {
  return (
    <span
      className={`${
        type === "organization"
          ? "text-emerald-600 bg-emerald-50 border-emerald-100"
          : "text-rose-600 bg-rose-50 border-rose-100"
      } text-xs px-[0.25rem] py-[0.1rem] font-semibold rounded border`}
    >
      {type === "organization" ? "Organization" : "Individual"}
    </span>
  );
};
