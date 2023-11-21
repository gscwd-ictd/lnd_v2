import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../../components/osprey/ui/tables/data-table/view/DataTable";
import { Avatar } from "../../components/osprey/ui/avatar/view/Avatar";
import { SlideOver } from "../../components/osprey/ui/overlays/slider-over/view/SliderOver";
import { Button } from "../../components/osprey/ui/button/view/Button";
import { Checkbox } from "../../components/osprey/ui/checkbox/view/Checkbox";
import { DataTableDefaultSelectionToolbar } from "../../components/osprey/ui/tables/data-table-default-selection-toolbar/view/DataTableDefaultSelectionToolbar";
import { createColumnHelper } from "@tanstack/react-table";
import React, { useState } from "react";

type Person = {
  photoUrl: string;
  name: string;
  email: string;
  company: string;
  address: string;
  country: string;
};

const personArray: any[] = [
  {
    photoUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/150.jpg",
    name: "Abel Smith",
    email: "garrick.torphy@yahoo.com",
    company: "Grady and Sons",
    address: "6405 Weimann Fort",
    country: "Bangladesh",
  },
  {
    photoUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1221.jpg",
    name: "Candice Herzog",
    email: "opal.jones@yahoo.com",
    company: "O'Reilly, Legros and Simonis",
    address: "454 Madelyn Estate",
    country: "Bosnia and Herzegovina",
  },
  {
    photoUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/803.jpg",
    name: "Ida Stark",
    email: "kolby92@hotmail.com",
    company: "Ebert, Ward and Ruecker",
    address: "6797 Damion Brooks",
    country: "Iran",
  },
  {
    photoUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/817.jpg",
    name: "Sylvester Reinger",
    email: "cielo.williamson76@hotmail.com",
    company: "Kozey, Satterfield and Terry",
    address: "94647 Von Wall",
    country: "Andorra",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/90071810",
    name: "Dr. Jimmie Langworth",
    email: "anahi_jerde13@gmail.com",
    company: "Wiza - Jakubowski",
    address: "30372 Mellie Key",
    country: "Saint Lucia",
  },
  {
    photoUrl: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/555.jpg",
    name: "Maryann Torphy",
    email: "alvah50@yahoo.com",
    company: "Schumm, Prosacco and Gottlieb",
    address: "991 Feeney Lake",
    country: "French Polynesia",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/63264889",
    name: "Lloyd Bashirian Jr.",
    email: "frances.spencer58@yahoo.com",
    company: "Hermann - Gleichner",
    address: "502 Kshlerin Underpass",
    country: "Vietnam",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/52962937",
    name: "Wendy Green",
    email: "elliot60@hotmail.com",
    company: "Schamberger - Luettgen",
    address: "719 Morissette Motorway",
    country: "Sudan",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/38796976",
    name: "Todd Sporer",
    email: "madelyn_pollich80@gmail.com",
    company: "Johns Group",
    address: "7660 Willms Branch",
    country: "Iran",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/79149050",
    name: "Gladys Gleichner",
    email: "arthur.brown79@hotmail.com",
    company: "Gleason, Lowe and Effertz",
    address: "804 Douglas Neck",
    country: "Morocco",
  },
  {
    photoUrl: "https://avatars.githubusercontent.com/u/26797297",
    name: "Fredrick Schmeler",
    email: "ali23@hotmail.com",
    company: "Bradtke, Price and Spinka",
    address: "2921 Albin Courts",
    country: "Vietnam",
  },
];

const personHelper = createColumnHelper<Person>();

const meta: Meta<typeof DataTable> = {
  title: "Example/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<Person>>;

// eslint-disable-next-line storybook/prefer-pascal-case
const personColumnsWithAvatar = [
  personHelper.accessor("name", {
    header: "Name",
    // cell: (info) => info.getValue(),
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Avatar size="sm" source={info.row.original.photoUrl} alt="avtr" />
        <div>
          <span className="text-gray-700">{info.getValue()}</span>
          <p className="font-mono text-xs text-gray-400">{info.row.original.email}</p>
        </div>
      </div>
    ),
  }),

  personHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
    // enableSorting: false,
  }),

  personHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

const personColumnsWithoutAvatar = [
  personHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
    // enableSorting: false,
  }),

  personHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

const personColumnsWithActionButtons = [
  personHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
    // enableSorting: false,
  }),

  personHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("photoUrl", {
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="border px-2 py-1 rounded shadow-sm text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button className="border px-2 py-1 rounded shadow-sm text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
];

const personColumnsWithCheckbox = [
  personHelper.accessor("photoUrl", {
    header: ({ table }) => (
      <div className="pl-2">
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      </div>
    ),

    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
    enableColumnFilter: false,
    enableSorting: false,
  }),

  personHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    // cell: (info) => (
    //   <div className="flex items-center gap-2">
    //     <Avatar size="sm" source={info.row.original.photoUrl} alt="avtr" />
    //     <div>
    //       <span className="text-gray-700">{info.getValue()}</span>
    //       <p className="font-mono text-xs text-gray-400">{info.row.original.email}</p>
    //     </div>
    //   </div>
    // ),
  }),

  personHelper.accessor("company", {
    header: "Company",
    cell: (info) => info.getValue(),
  }),

  personHelper.accessor("address", {
    header: "Address",
    cell: (info) => info.getValue(),
    // enableSorting: false,
  }),

  personHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

/**
 * This data table component showcases the possibility of adding custom component as a row item.
 * In this case, a custom Avatar component, with name and email address under it.
 */
export const WithAvatar: Story = {
  args: {
    title: "DataTable",
    subtitle: "This is a sample of a data table with custom component as a row content.",
    columns: personColumnsWithAvatar,
    queryKey: [],
    datasource: "",
  },
};

/**
 * This data table component is the bare component with pure textual data.
 */
export const WithoutAvatar: Story = {
  args: {
    title: "DataTable",
    subtitle: "This is a sample of a data table without custom JSX content.",
    columns: personColumnsWithoutAvatar,
    datasource: "",
    queryKey: [],
  },
};

/**
 * This data table showcases a custom component with action buttons as part of a row item.
 */
export const WithActionButtons: Story = {
  args: {
    title: "DataTable",
    subtitle: "This is a sample of a data table with action buttons",
    columns: personColumnsWithActionButtons,
    datasource: "",
    queryKey: [],
  },
};

const DataTableWithSlider = () => {
  const [open, setOpen] = useState(false);
  const [person, setPerson] = useState<Person>();

  return (
    <>
      <SlideOver open={open} setOpen={setOpen}>
        {person && (
          <>
            <SlideOver.Header>
              <div className="p-4 flex items-center gap-2">
                <Avatar source={person.photoUrl} alt="avtr" size="xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-700">{person.name}</h3>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                      />
                    </svg>

                    <p className="text-xs text-gray-500">{person.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 text-gray-700"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <div className="w-40">
                      <p className="text-xs text-gray-500 truncate">
                        {person.address}, {person.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center gap-2">
                <button className="flex items-center gap-1 focus:select-none border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                  <span className="text-xs">Assign tags</span>
                </button>

                <button className="flex items-center gap-1 border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded focus:select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                    />
                  </svg>
                  <span className="text-xs">Create group</span>
                </button>

                <button className="flex items-center gap-1 border border-gray-300 shadow-sm text-gray-700 px-2 py-1 rounded focus:select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                    />
                  </svg>
                  <span className="text-xs">Print details</span>
                </button>
              </div>
            </SlideOver.Header>
            <SlideOver.Body>
              <div className="py-4 pr-8 pl-4">
                <div className="space-y-3 mt-2">
                  <span className="font-medium text-gray-600">Introduction</span>
                  <p className="text-justify text-gray-400 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut fugiat, eum consectetur minima
                    consequuntur accusamus dolores iste voluptatibus excepturi pariatur...
                  </p>
                </div>
                <div className="flex justify-end mt-5">
                  <Button size="small" variant="ghost">
                    View details
                  </Button>
                </div>
              </div>
            </SlideOver.Body>
          </>
        )}
      </SlideOver>
      <DataTable<Person>
        queryKey={[]}
        datasource=""
        columns={personColumnsWithoutAvatar}
        title="DataTable"
        subtitle="Click on any of the row in the table to toggle slider and view details."
        onRowClick={(row) => {
          setPerson(row.original);
          setOpen(true);
        }}
      />
    </>
  );
};

/**
 * This data table component showcases the `onRowClick` event, which fires everytime a certain row in the table has been clicked.
 * In this case, a `SlideOver` component will appear for each item that has been clicked.
 */
export const WithSlideOver: Story = {
  render: () => {
    return <DataTableWithSlider />;
  },
};

/**
 * This data table component showcases how the table handles row selection with `Checkbox` component.
 * Please note that with row selection enabled, it is not recommended to use `onRowClick()` since both features collide in functionality.
 * If row selection is a must, use it in conjunction with action buttons instead.
 *
 * You can create your own row selection toolbar by wrapping it with the `<DataTable />` component. Then use the `DataTableContext` to
 * access the current table instance.
 */
export const WithRowSelection: Story = {
  args: {
    datasource: "",
    queryKey: [],
    columns: personColumnsWithCheckbox,
    title: "DataTable",
    subtitle: "A data table component with row selection enabled.",
    children: <DataTableDefaultSelectionToolbar />,
  },
};

/**
 * This data table component showcases how the table looks like and should behave if there is no data to display.
 *
 * - All sortable columns will automatically be disabled.
 * - All filterable columns will automatically be disabled.
 * - The global search input will automatically be disabled.
 */
export const WithEmptyData: Story = {
  args: {
    datasource: "",
    queryKey: [],
    columns: personColumnsWithAvatar,
    title: "DataTable",
    subtitle: "A data table component with empty data",
  },
};
