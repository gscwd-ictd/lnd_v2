import { Button } from "../../components/osprey/ui/button/view/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: "primary",
    children: "Primary",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
    children: "Warning",
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
    children: "Danger",
  },
};

export const Ghost: Story = {
  args: {
    color: "primary",
    children: "Ghost",
    variant: "ghost",
  },
};

export const Outline: Story = {
  args: {
    color: "primary",
    children: "Outline",
    variant: "outline",
  },
};

export const Soft: Story = {
  args: {
    color: "primary",
    children: "Soft",
    variant: "soft",
  },
};
