import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { ToastType } from "@lms/components/osprey/ui/overlays/toast/utils/props";
import { Toast } from "@lms/components/osprey/ui/overlays/toast/view/Toast";
import { Employee, useTabStore } from "@lms/utilities/stores/employee-tags-store";
import { url } from "@lms/utilities/url/api-url";
import axios from "axios";
import { FunctionComponent, useState } from "react";

type DeleteEmployeeProp = {
  employeeId: string;
  tagId: string;
};

type Employee2Props = {
  employeeFullName: string;
  employeeId: string;
  positionTitle: string;
};

export const DeleteEmployee: FunctionComponent<DeleteEmployeeProp> = ({ employeeId, tagId }) => {
  const [open, setOpen] = useState(false);
  const setEmployees = useTabStore((state) => state.setEmployees);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<ToastType>({} as ToastType);

  const deleteEmployeeTag = async (data: DeleteEmployeeProp) => {
    const tagId = data.tagId;

    try {
      const result = await axios.delete(`${url}/hrms/employee-tags/`, { data });

      if (result) {
        setToastOptions("success", "Success", "You have successfully deleted an employee from a tag!");
        const { data } = await axios.get(`${url}/hrms/employee-tags/tag/${tagId}`);

        var employeesFromTag: Array<Employee> = [];

        data.forEach((test: any) => {
          test.employees.forEach((emp: Employee) => {
            employeesFromTag.push(emp);
          });
        });

        setEmployees(employeesFromTag);
      }
    } catch {
      setToastOptions("danger", "Something went wrong!", "Failed to delete, please contact your administrator.");
    }
  };

  // this function opens the toast with the following attributes
  const setToastOptions = (color: typeof toastType.color, title: string, content: string) => {
    setToastType({ color, title, content });
    setToastIsOpen(true);
  };

  return (
    <>
      <Modal isOpen={open} setIsOpen={setOpen} size="md" isStatic>
        <button
          className="px-2 py-1 text-gray-700 border rounded shadow-sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-lg font-semibold text-gray-600">Tags</h3>
            <p className="text-sm text-gray-400">Delete a tag</p>
          </ModalContent.Title>
          <ModalContent.Body>
            <label className="text-sm font-medium text-gray-700">Are you sure you want to delete this tag?</label>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex items-center justify-end py-1">
              <Button
                size="small"
                color="danger"
                onClick={() => {
                  deleteEmployeeTag({ employeeId, tagId });
                  setOpen(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>

      {/* Toast options here */}

      <Toast
        duration={1500}
        open={toastIsOpen}
        setOpen={setToastIsOpen}
        color={toastType.color}
        title={toastType.title}
        content={toastType.content}
      />
    </>
  );
};
