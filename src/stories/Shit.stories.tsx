import type { Meta, StoryObj } from "@storybook/react";
import Shit from "../components/Shit";

const meta = {
  id: "Shit",
  title: "ReactVideoPlayer/Shit",
  component: Shit,
  tags: ["autodocs"],
} satisfies Meta<typeof Shit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
