"use client";

import { Combobox } from "@headlessui/react";
import { UsersContext } from "@lms/app/settings/users-data-table/UsersDataTable";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Modal, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { User } from "@lms/lib/types/users";
import { useUsersModalStore, useUsersStore } from "@lms/utilities/stores/users-store";
import { url } from "@lms/utilities/url/api-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { isEmpty } from "lodash";
import React, { FunctionComponent, useContext, useState } from "react";

export const AddNewUsersModal: FunctionComponent = () => {
  const { id } = useContext(UsersContext);
  const addModalIsOpen = useUsersModalStore((state) => state.addModalIsOpen);
  const setAddModalIsOpen = useUsersModalStore((state) => state.setAddModalIsOpen);
  const setConfirmAddIsOpen = useUsersModalStore((state) => state.setConfirmAddIsOpen);
  const setId = useUsersStore((state) => state.setId);
  const users = useUsersStore((state) => state.users);
  const setUsers = useUsersStore((state) => state.setUsers);
  const selectedUser = useUsersStore((state) => state.selectedUser);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const [searchValue, setSearchValue] = useState<string>("");

  // filtered users
  const filteredUsers =
    searchValue === ""
      ? users
      : users.filter((element) => element.fullName.toLowerCase().includes(searchValue.toLowerCase()));

  useQuery({
    queryKey: ["assignable-users"],
    enabled: addModalIsOpen !== false,
    queryFn: async () => {
      const result = await axios.get(`${url}/hrms/lnd/assignable`);

      setUsers(result.data);
      return result;
    },
  });
  return (
    <>
      <Modal
        isOpen={addModalIsOpen}
        setIsOpen={setAddModalIsOpen}
        size="md"
        isStatic
        onClose={() => {
          setId("");
          setSelectedUser({} as User);
          setSearchValue("");
        }}
      >
        <Button size="small" onClick={() => setAddModalIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <p>Add New</p>
        </Button>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="px-3 text-lg font-semibold text-gray-600">Add a user</h3>
            {/* <p className="text-sm text-gray-400">Add new user</p> */}
          </ModalContent.Title>
          <ModalContent.Body>
            <div className="items-start gap-2 px-3  h-[16rem]">
              <div className="mt-1 mb-4">
                <div className="mb-2">
                  <label htmlFor="training-design" className="block font-medium text-gray-700">
                    Select Employee <span className="text-red-600 text-md">*</span>
                  </label>
                  <p className="text-xs text-gray-500">Search for an employee from Human Resource Department</p>
                </div>
                <div className="relative">
                  <Combobox
                    value={selectedUser}
                    onChange={(value) => {
                      setId(value.employeeId);
                      setSelectedUser(value);
                    }}
                  >
                    <Combobox.Input as={React.Fragment} displayValue={() => selectedUser?.fullName}>
                      <Input
                        id="search-employee"
                        size="small"
                        autoComplete="off"
                        placeholder="Type here"
                        className=" placeholder:text-xs"
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                      />
                    </Combobox.Input>
                    <Combobox.Options className="absolute max-h-52 z-[80] overflow-y-auto bg-white w-full border rounded-md shadow-lg shadow-gray-100">
                      {filteredUsers?.length === 0 ? (
                        <div className="flex items-center justify-center py-10">No results found</div>
                      ) : (
                        filteredUsers?.map((user, idx) => {
                          return (
                            <Combobox.Option key={idx} value={user}>
                              {({ active }) => {
                                return (
                                  <div
                                    role="button"
                                    className={`${
                                      active ? "bg-indigo-500 text-white" : ""
                                    } border-b border-b-gray-100 px-2 py-1`}
                                  >
                                    <h3 className={`${active ? "text-indigo-50" : "text-gray-700"} `}>
                                      <span className="font-medium"> {user.fullName} </span>
                                    </h3>
                                  </div>
                                );
                              }}
                            </Combobox.Option>
                          );
                        })
                      )}
                    </Combobox.Options>
                  </Combobox>
                </div>
              </div>
            </div>
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex justify-end gap-2 py-2">
              <Button
                size="small"
                className="w-[6rem] disabled:cursor-not-allowed"
                onClick={() => setConfirmAddIsOpen(true)}
                disabled={isEmpty(selectedUser) ? true : false}
              >
                Add
              </Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};
