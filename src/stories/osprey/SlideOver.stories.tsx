import { useState } from "react";
import { Button } from "../../components/osprey/ui/button/view/Button";
import { SlideOver } from "../../components/osprey/ui/overlays/slider-over/view/SliderOver";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SlideOver> = {
  title: "Example/SlideOver",
  component: SlideOver,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideOver>;

const MySlideOver = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-5 overflow-hidden flex items-center justify-center">
      <SlideOver open={open} setOpen={setOpen} size="md">
        <SlideOver.Header>
          <h3 className="p-4 border-b">Getting started</h3>
        </SlideOver.Header>
        <SlideOver.Body>
          <div className="p-4">
            <ul className="space-y-3">
              <li role="button" className="flex items-center gap-2 hover:bg-gray-50 p-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 17H4C2.34315 17 1 15.6569 1 14V6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V14C23 15.6569 21.6569 17 20 17H13V19H16C16.5523 19 17 19.4477 17 20C17 20.5523 16.5523 21 16 21H8C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19H11V17ZM4 5H20C20.5523 5 21 5.44772 21 6V14C21 14.5523 20.5523 15 20 15H4C3.44772 15 3 14.5523 3 14V6C3 5.44772 3.44772 5 4 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600">Create your community</h3>
                  <p className="text-xs text-gray-400">
                    The best way to get started is to quit talking and begin doing.
                  </p>
                </div>
              </li>

              <li role="button" className="flex items-center gap-2 hover:bg-gray-50 p-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H5C3.89543 16 3 15.1046 3 14V6ZM5 6H19V14H5V6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2 18C1.44772 18 1 18.4477 1 19C1 19.5523 1.44772 20 2 20H22C22.5523 20 23 19.5523 23 19C23 18.4477 22.5523 18 22 18H2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600">Get to know the platform</h3>
                  <p className="text-xs text-gray-400">See what you&apos;ll be able to do with this platform.</p>
                </div>
              </li>

              <li role="button" className="flex items-center gap-2 hover:bg-gray-50 p-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 7C5.34315 7 4 8.34315 4 10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10C10 8.34315 8.65685 7 7 7ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V18C2 18.5523 2.44772 19 3 19H7.31374L14.1924 12.1214C15.364 10.9498 17.2635 10.9498 18.435 12.1214L22 15.6863V6C22 5.44772 21.5523 5 21 5ZM21 19H10.1422L15.6066 13.5356C15.9971 13.145 16.6303 13.145 17.0208 13.5356L21.907 18.4217C21.7479 18.7633 21.4016 19 21 19Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600">Upload your photo</h3>
                  <p className="text-xs text-gray-400">Select an image and upload your photo.</p>
                </div>
              </li>

              <li role="button" className="flex items-center gap-2 hover:bg-gray-50 p-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 6H10C9.44772 6 9 6.44772 9 7V17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17V7C15 6.44772 14.5523 6 14 6ZM10 4C8.34315 4 7 5.34315 7 7V17C7 18.6569 8.34315 20 10 20H14C15.6569 20 17 18.6569 17 17V7C17 5.34315 15.6569 4 14 4H10Z"
                      fill="currentColor"
                    />
                    <path
                      d="M6 7.45936L3.4932 7.04156C1.6646 6.73679 0 8.14692 0 10.0007V14.918C0 16.7718 1.6646 18.1819 3.4932 17.8772L6 17.4594V15.4318L3.1644 15.9044C2.55487 16.006 2 15.5359 2 14.918V10.0007C2 9.3828 2.55487 8.91276 3.1644 9.01435L6 9.48695V7.45936Z"
                      fill="currentColor"
                    />
                    <path
                      d="M18 7.45936L20.5068 7.04156C22.3354 6.73679 24 8.14692 24 10.0007V14.918C24 16.7718 22.3354 18.1819 20.5068 17.8772L18 17.4594V15.4318L20.8356 15.9044C21.4451 16.006 22 15.5359 22 14.918V10.0007C22 9.3828 21.4451 8.91276 20.8356 9.01435L18 9.48695V7.45936Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600">Create a space</h3>
                  <p className="text-xs text-gray-400">Create multiple workspaces for your use case.</p>
                </div>
              </li>

              <li role="button" className="flex items-center gap-2 hover:bg-gray-50 p-2">
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <path
                      d="M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6C9.44771 6 9 6.44772 9 7C9 7.55228 9.44771 8 10 8Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 3C1.34315 3 0 4.34315 0 6V18C0 19.6569 1.34315 21 3 21H21C22.6569 21 24 19.6569 24 18V6C24 4.34315 22.6569 3 21 3H3ZM21 5H3C2.44772 5 2 5.44772 2 6V9H22V6C22 5.44772 21.5523 5 21 5ZM2 18V11H22V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-medium text-gray-600">Invite your teammates</h3>
                  <p className="text-xs text-gray-400">Invite other admins and moderators.</p>
                </div>
              </li>
            </ul>
          </div>
        </SlideOver.Body>
      </SlideOver>
      <Button onClick={() => setOpen(true)}>Slide Over</Button>
    </div>
  );
};

export const OspreySlideOver: Story = {
  render: () => {
    return <MySlideOver />;
  },
};
