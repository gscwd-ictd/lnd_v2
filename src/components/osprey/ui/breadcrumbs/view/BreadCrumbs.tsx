import Link from "next/link";
import React, { FunctionComponent } from "react";
import { BreadCrumbsProps } from "../utils/props";

export const BreadCrumbs: FunctionComponent<BreadCrumbsProps> = ({ crumbs = [] }) => {
  return (
    <>
      <ul className="flex items-center gap-1 text-sm">
        {crumbs &&
          crumbs.length > 0 &&
          crumbs?.map((crumb, idx) => {
            return (
              <React.Fragment key={idx}>
                <span className="flex items-center h-full text-xs text-gray-400">{idx >= 1 ? "/" : null}</span>
                {crumb.path === "" ? (
                  <li className="text-gray-500">{crumb.layerText}</li>
                ) : (
                  <Link href={crumb.path ?? ""} className="text-gray-700">
                    {crumb.layerText}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
      </ul>
    </>
  );
};
