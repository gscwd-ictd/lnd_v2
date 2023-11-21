// "use client";

// import { FunctionComponent, useState } from "react";
// import { Person, TrainingSource } from "./page";
// import { personColumns } from "@lms/utilities/columns/training-source-columns";
// import { DataTable } from "@lms/components/osprey/ui/tables/data-table/view/DataTable";
// import { SlideOver } from "@lms/components/osprey/ui/overlays/slider-over/view/SliderOver";
// import { Avatar } from "@lms/components/osprey/ui/avatar/view/Avatar";
// import { Button } from "@lms/components/osprey/ui/button/view/Button";
// import { DataTableDefaultSelectionToolbar } from "@lms/components/osprey/ui/tables/data-table-default-selection-toolbar/view/DataTableDefaultSelectionToolbar";

// type LspDataTableProps = {
//   data: TrainingSource[];
// };

// export const LspDataTable: FunctionComponent<LspDataTableProps> = ({ data }) => {
//   const [open, setOpen] = useState(false);
//   const [person, setPerson] = useState<Person>();

//   return (
//     <>
//       <SlideOver open={open} setOpen={setOpen}>
//         {person && (
//           <>
//             <SlideOver.Header>
//               <div className="p-4 flex items-center gap-2">
//                 <Avatar source={person.photoUrl} alt="avtr" size="xl" />
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-700">{person.name}</h3>
//                   <div className="flex items-center gap-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-3 h-3 text-gray-700"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
//                       />
//                     </svg>

//                     <p className="text-xs text-gray-500">{person.email}</p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-3 h-3 text-gray-700"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//                       />
//                     </svg>

//                     <div className="w-40">
//                       <p className="text-xs text-gray-500 truncate">
//                         {person.address}, {person.country}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 flex items-center gap-2">
//                 <button className="flex items-center gap-1 focus:select-none border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
//                     />
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
//                   </svg>
//                   <span className="text-xs">Assign tags</span>
//                 </button>

//                 <button className="flex items-center gap-1 border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded focus:select-none">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
//                     />
//                   </svg>
//                   <span className="text-xs">Create group</span>
//                 </button>

//                 <button className="flex items-center gap-1 border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded focus:select-none">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.5}
//                     stroke="currentColor"
//                     className="w-4 h-4"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
//                     />
//                   </svg>
//                   <span className="text-xs">Print details</span>
//                 </button>
//               </div>
//             </SlideOver.Header>
//             <SlideOver.Body>
//               <div className="py-4 pr-8 pl-4">
//                 <div className="space-y-3 mt-2">
//                   <span className="font-medium text-gray-600">Introduction</span>
//                   <p className="text-justify text-gray-400 text-sm">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut fugiat, eum consectetur minima
//                     consequuntur accusamus dolores iste voluptatibus excepturi pariatur...
//                   </p>
//                 </div>
//                 <div className="flex justify-end mt-5">
//                   <Button size="small" variant="ghost">
//                     View details
//                   </Button>
//                 </div>
//               </div>
//             </SlideOver.Body>
//           </>
//         )}
//       </SlideOver>
//       <DataTable<TrainingSource>
//         data={data}
//         columns={personColumns}
//         title="Learning Service Providers"
//         subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
//         // onRowClick={(row) => {
//         //   setPerson(row.original);
//         //   // setOpen(true);
//         // }}
//       >
//         <DataTableDefaultSelectionToolbar />
//       </DataTable>
//     </>
//   );
// };
