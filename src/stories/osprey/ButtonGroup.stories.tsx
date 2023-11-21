import { ButtonItem } from "../../components/osprey/ui/button-group/view/ButtonItem";
import { ButtonGroup } from "../../components/osprey/ui/button-group/view/ButtonGroup";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonGroup> = {
  title: "Example/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const OspreyButtonGroup: Story = {
  args: {
    className: "w-40",
    children: (
      <>
        <ButtonItem>1</ButtonItem>
        <ButtonItem>2</ButtonItem>
        <ButtonItem>3</ButtonItem>
        <ButtonItem>4</ButtonItem>
        <ButtonItem>5</ButtonItem>
      </>
    ),
  },
};
