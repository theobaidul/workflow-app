import { Button, Layout } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsed } from "../redux/features/sidebar/sidebarSlice";

const { Header } = Layout;

export default function MainHeader({ colorBgContainer }) {
  const { showBtn } = useSelector((state) => state.sidebar || {});
  const dispatch = useDispatch();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        background: colorBgContainer,
      }}
    >
      {showBtn && (
        <Button
          icon={<MenuUnfoldOutlined />}
          onClick={() => dispatch(toggleCollapsed())}
          style={{ marginRight: "16px" }}
        />
      )}
      <h1 style={{ margin: "0", lineHeight: "1" }}>WORKFLOW</h1>
    </Header>
  );
}
