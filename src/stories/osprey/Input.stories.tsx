import { Input } from "../../components/osprey/ui/input/view/Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Input> = {
  title: "Example/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    color: "primary",
    placeholder: "you@email.com",
    helperText: "Please enter your email address",
  },
};

export const Error: Story = {
  args: {
    color: "error",
    type: "password",
    placeholder: "Password",
    defaultValue: "passwrd",
    helperText: "Your password must contain at least 8 characters",
  },
};

export const Success: Story = {
  args: {
    color: "success",
    defaultValue: "john.doe@gmail.com",
    placeholder: "Email address",
    helperText: "Everything looks good here!",
  },
};
