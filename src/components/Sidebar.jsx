import { Layout } from "antd";
const { Sider } = Layout;
import SidebarContent from "./SidebarContent.jsx";

const Sidebar = () => {
  return (
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      width="250"
      style={{
        textAlign: "center",
      }}
    >
      <SidebarContent />
    </Sider>
  );
};
export default Sidebar;
