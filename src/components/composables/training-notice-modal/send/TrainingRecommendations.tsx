import { Disclosure } from "@headlessui/react";

const recommendations = [
  {
    supervisor: {
      supervisorId: "010a02be-5b3d-11ed-a08b-000c29f95a80",
      supervisorName: "Gabales, Michael G. ",
    },
    employees: [
      {
        employeeId: "05b06e0a-b191-11ed-a79b-000c29f95a80",
        employeeFullName: "Perez, Alfred V. ",
        positionTitle: "Survey Aide B",
      },
      {
        employeeId: "af635f15-b26e-11ed-a79b-000c29f95a80",
        employeeFullName: "Fragata, Phyll Patrick C. ",
        positionTitle: "Senior Office Equipment Technician B",
      },
      {
        employeeId: "af5633d6-b26e-11ed-a79b-000c29f95a80",
        employeeFullName: "Cubero, Allyn Joseph C. ",
        positionTitle: "Management Information System Researcher",
      },
      {
        employeeId: "05b0614c-b191-11ed-a79b-000c29f95a80",
        employeeFullName: "Alfeche, John Henry S. ",
        positionTitle: "Data Encoder",
      },
      {
        employeeId: "62fef63c-b26f-11ed-a79b-000c29f95a80",
        employeeFullName: "Sison, Eric C. ",
        positionTitle: "Management Information System Researcher",
      },
    ],
    numberOfSlots: 2,
  },
  {
    supervisor: {
      supervisorId: "62c30df5-93cc-482e-ad33-aed65a0b9f5c",
      supervisorName: "Ucat, Julincris M. , MPA",
    },
    employees: [
      {
        employeeId: "05b067ba-b191-11ed-a79b-000c29f95a80",
        employeeFullName: "Barte, Anggelica R. ",
        positionTitle: "Clerk Processor B",
      },
    ],
    numberOfSlots: 2,
  },
  {
    supervisor: {
      supervisorId: "010a0e53-5b3d-11ed-a08b-000c29f95a80",
      supervisorName: "Turija, Cornelio T. , CE",
    },
    employees: [
      {
        employeeId: "63192ad4-b26f-11ed-a79b-000c29f95a80",
        employeeFullName: "Yabo, Abel Mizraim O. ",
        positionTitle: "Water Maintenance Man B",
      },
      {
        employeeId: "af53cf0c-b26e-11ed-a79b-000c29f95a80",
        employeeFullName: "Castromayor, Andrian P. ",
        positionTitle: "Water Maintenance Man B",
      },
    ],
    numberOfSlots: 4,
  },
  {
    supervisor: {
      supervisorId: "010a0b40-5b3d-11ed-a08b-000c29f95a80",
      supervisorName: "Gadayan, Sharon C. , MPA",
    },
    employees: [
      {
        employeeId: "af51eaac-b26e-11ed-a79b-000c29f95a80",
        employeeFullName: "Capili, Alfredo P. ",
        positionTitle: "Senior Water Maintenance Man B",
      },
    ],
    numberOfSlots: 2,
  },
  {
    supervisor: {
      supervisorId: "010a0fa0-5b3d-11ed-a08b-000c29f95a80",
      supervisorName: "Valenzuela, Samcelle B. , MPA",
    },
    employees: [
      {
        employeeId: "94fb2e75-b1c2-11ed-a79b-000c29f95a80",
        employeeFullName: "Badal, Abdul Gapal M. ",
        positionTitle: "Customer Service Assistant A",
      },
    ],
  },
];

export const TrainingRecommendations = () => {
  return (
    <>
      <div className="w-full">
        <ul className="w-[75%]">
          {recommendations.length > 0 ? (
            recommendations.map((data, index) => {
              return (
                <Disclosure key={index}>
                  <div key={index} className="flex gap-5">
                    <div key={index} className="w-full border-t border-b border-l-4 border-r border-l-indigo-500">
                      <div className="flex items-center justify-between">
                        <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2">
                          <div className="text-start">
                            <span className="text-lg font-semibold text-gray-700">
                              {data.supervisor.supervisorName}
                            </span>
                            <p className="text-sm text-gray-500">
                              {data.employees.length > 1 ? (
                                <span className="text-gray-500">{data.employees.length} recommended participants</span>
                              ) : (
                                <span className="text-gray-500">{data.employees.length} recommended participant</span>
                              )}
                            </p>
                          </div>
                        </Disclosure.Button>

                        <div className="p-2">
                          <div className="flex gap-1 text-lg text-indigo-700">
                            <span>{data.numberOfSlots}</span>
                            {data.numberOfSlots! > 1 ? "slots" : data.numberOfSlots === 1 ? "slot" : "None"}
                          </div>
                        </div>
                      </div>

                      <Disclosure.Panel className="px-4 py-2">
                        <ul>
                          {data.employees.map((emp, index) => (
                            <div key={index}>
                              <li className="text-sm text-gray-700">{emp.employeeFullName}</li>
                            </div>
                          ))}
                        </ul>
                      </Disclosure.Panel>
                    </div>
                    <div className="p-2">
                      <input
                        type="number"
                        min={0}
                        // max={numberOfParticipants}
                        value={Number(data.numberOfSlots) ?? 0}
                        className="w-20 border-gray-300 rounded focus:border-indigo-400"
                      />
                    </div>
                  </div>
                </Disclosure>
              );
            })
          ) : (
            <div className="flex w-full h-[6rem] border-4 border-dashed">
              <div className="flex items-center justify-center w-full text-center">
                <span className="text-gray-600 uppercase"> No recommended participants found</span>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
