import { title } from "process";
import { Alert } from "../../components/osprey/ui/alert/view/Alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Alert> = {
  title: "Example/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    color: "success",
    title: "Title",
    children: <>Subtitle</>,
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
    title: "Title",
    children: <>Subtitle</>,
  },
};

export const Info: Story = {
  args: {
    color: "info",
    title: "Title",
    children: <>Subtitle</>,
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    title: "Title",
    children: <>Subtitle</>,
  },
};
