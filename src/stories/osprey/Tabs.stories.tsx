import { TabContentWrap, Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/osprey/ui/tabs/view/Tabs";
import type { Meta, StoryObj } from "@storybook/react";

// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof Tabs> = {
  title: "Example/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  args: {
    defaultValue: "tab1",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">One</TabsTrigger>
          <TabsTrigger value="tab2">Two</TabsTrigger>
          <TabsTrigger value="tab3">Three</TabsTrigger>
        </TabsList>
        <TabContentWrap>
          <TabsContent value="tab1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod maxime provident tempore quisquam! Facilis
            deleniti mollitia possimus vel repudiandae sit eaque necessitatibus voluptas. Reiciendis expedita, delectus
            a modi maxime nobis?
          </TabsContent>
          <TabsContent value="tab2">2</TabsContent>
          <TabsContent value="tab3">3</TabsContent>
        </TabContentWrap>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    defaultValue: "tab1",
    orientation: "vertical",
    children: (
      <>
        <TabsList>
          <TabsTrigger value="tab1">One</TabsTrigger>
          <TabsTrigger value="tab2">Two</TabsTrigger>
          <TabsTrigger value="tab3">Three</TabsTrigger>
        </TabsList>
        <TabContentWrap>
          <TabsContent value="tab1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod maxime provident tempore quisquam! Facilis
            deleniti mollitia possimus vel repudiandae sit eaque necessitatibus voluptas. Reiciendis expedita, delectus
            a modi maxime nobis?
          </TabsContent>
          <TabsContent value="tab2">2</TabsContent>
          <TabsContent value="tab3">3</TabsContent>
        </TabContentWrap>
      </>
    ),
  },
};
