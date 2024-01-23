import type { Meta, StoryObj } from "@storybook/react";
import Player from "../components/index/index";
import Video from "../../public/test.mp4";
const meta = {
  id: "video",
  title: "ReactVideoPlayer/Player",
  component: Player,
  tags: ["autodocs"],
} satisfies Meta<typeof Player>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "video",
    headerTitle: "SOME HEADER",
    src: Video,
    ambient: true,
    ready: () => {},
    autoFocus: true,
  },
};
