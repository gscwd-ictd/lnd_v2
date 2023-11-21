import { Button } from "../../components/osprey/ui/button/view/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSub,
  DropdownSubItem,
  DropdownSubTrigger,
  DropdownTrigger,
} from "../../components/osprey/ui/dropdown/view/Dropdown";
import { type Meta, type StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown> = {
  title: "Example/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Dropdown</Button>
        </DropdownTrigger>
        <DropdownContent className="w-[15rem]" align="start" side="bottom">
          <DropdownItem>Internal</DropdownItem>
          <DropdownItem>External</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const DropdownMenuSub: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Dropdown</Button>
        </DropdownTrigger>
        <DropdownContent className="w-[15rem]" align="start" side="bottom">
          <DropdownItem>Internal</DropdownItem>
          <DropdownSub>
            <DropdownSubTrigger>SubItem</DropdownSubTrigger>
            <DropdownSubItem className="w-[15rem]">
              <DropdownItem>SubItem 1</DropdownItem>
              <DropdownItem>SubItem 2</DropdownItem>
            </DropdownSubItem>
          </DropdownSub>
          <DropdownItem>External</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};
