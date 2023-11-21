import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "../../components/osprey/ui/overlays/toast/view/Toast";
import { Button } from "../../components/osprey/ui/button/view/Button";
import { useState } from "react";
import { render } from "@headlessui/react/dist/utils/render";

const meta: Meta<typeof Toast> = {
  title: "Example/Toast",
  component: Toast,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Toast
      </Button>
      <Toast
        duration={2000}
        open={open}
        setOpen={setOpen}
        color="default"
        title="Success"
        content="Successfully Added."
      />
    </>
  );
};

export const ToastDefault: Story = {
  render: () => <ToastDemo />,
};

const ToastWithIconStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open Toast
      </Button>
      <Toast
        duration={2000}
        open={open}
        startIcon={
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
            <path d="M10.97 4.97a.235.235 0 00-.02.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-1.071-1.05z" />
          </svg>
        }
        setOpen={setOpen}
        color="default"
        title="Success"
        content="Successfully Added."
      />
    </>
  );
};

export const ToastWithIcon: Story = {
  render: () => <ToastWithIconStory />,
};
