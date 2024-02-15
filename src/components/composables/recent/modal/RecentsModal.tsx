import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import dayjs from "dayjs";
import { FunctionComponent } from "react";

export const RecentsModal: FunctionComponent = () => {
  return (
    //   <Modal isOpen={batchAttendanceIsOpen} setIsOpen={setBatchAttendanceIsOpen} size="2md">
    //     <ModalContent>
    //       <ModalContent.Title>
    //         <div className="p-3">
    //           <p className="text-lg font-semibold text-gray-700">Batch {selectedBatch.batchNumber} Attendance</p>
    //           <div className="flex gap-2">
    //             {dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
    //             true ? (
    //               <span className="text-sm text-gray-600">
    //                 {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
    //                 {dayjs(selectedBatch.trainingDate?.to).format("hh:mmA")}
    //               </span>
    //             ) : dayjs(selectedBatch.trainingDate?.from).isSame(dayjs(selectedBatch.trainingDate?.to), "day") ===
    //               false ? (
    //               <span className="text-sm text-gray-600">
    //                 {dayjs(selectedBatch.trainingDate?.from).format("MMM DD, YYYY hh:mmA")}-
    //                 {dayjs(selectedBatch.trainingDate?.to).format("MMM DD, YYYY hh:mmA")}
    //               </span>
    //             ) : (
    //               ""
    //             )}
    //           </div>
    //         </div>
    //       </ModalContent.Title>
    //       <ModalContent.Body>
    //         {/* {isLoading ? (
    //           <div className="flex justify-center w-full h-full">
    //             <Spinner />
    //           </div>
    //         ) : (
    //           <div className="p-2">
    //             <table className="w-full ">
    //               <thead className="text-white rounded-t bg-gradient-to-r from-indigo-700 to-purple-500">
    //                 <tr>
    //                   <th className="p-2 font-medium border">Participant Name</th>

    //                   <th className="p-2 font-medium border">Complete attendance?</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {employeeAttendance?.map((employee, idx) => {
    //                   return (
    //                     <tr className="even:bg-inherit odd:bg-zinc-50 hover:bg-indigo-100/80" key={employee.employeeId}>
    //                       <td className="p-2 text-sm font-light border ">{employee.name}</td>
    //                       <td
    //                         className="text-center border hover:cursor-pointer "
    //                         onClick={() => onChangeAttendance(idx)}
    //                       >
    //                         <Checkbox
    //                           id={`checkbox-${idx}`}
    //                           checked={employee.isCompleteAttendance}
    //                           readOnly
    //                           // onChange={() => onChangeAttendance(idx)}
    //                         />
    //                       </td>
    //                     </tr>
    //                   );
    //                 })}
    //               </tbody>
    //             </table>
    //           </div>
    //         )} */}

    //         <Suspense
    //           fallback={
    //             <div className="flex justify-center w-full h-full">
    //               <Spinner />
    //             </div>
    //           }
    //         >
    //           <EmployeeAttendance
    //             employeeAttendance={employeeAttendance}
    //             setEmployeeAttendance={setEmployeeAttendance}
    //           />
    //         </Suspense>
    //       </ModalContent.Body>
    //       <ModalContent.Footer>
    //         <div className="flex justify-end w-full">
    //           <Button
    //             onClick={() => {
    //               console.log(employeeAttendance);
    //               // set this to false
    //               setBatchAttendanceIsOpen(false);
    //               // set this to true to fetch batches
    //               setHasFetchedBatches(true);
    //             }}
    //           >
    //             Apply
    //           </Button>
    //         </div>
    //       </ModalContent.Footer>
    //     </ModalContent>
    //   </Modal>
    <></>
  );
};
