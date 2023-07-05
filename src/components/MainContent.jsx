import { Layout, Space } from "antd";
import NoteContent from "./NoteContent";
import StoryContent from "./StoryContent";

const { Content } = Layout;

export default function MainContent() {
  return (
    <Content
      style={{
        margin: "24px 16px 0",
        overflow: "initial",
      }}
    >
      <Space
        direction="vertical"
        size={30}
        style={{
          display: "flex",
        }}
      >
        <StoryContent />
        <NoteContent />
      </Space>
    </Content>
  );
}
