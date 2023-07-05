import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsed } from "../redux/features/sidebar/sidebarSlice.js";
import SidebarContent from "./SidebarContent.jsx";

const SidebarMobile = () => {
  const dispatch = useDispatch();
  const { collapsed } = useSelector((state) => state.sidebar);

  return (
    <Drawer
      placement="left"
      width={250}
      onClose={() => dispatch(toggleCollapsed())}
      open={collapsed}
      style={{
        background: "#001529",
        textAlign: "center",
      }}
      bodyStyle={{
        padding: "0",
      }}
      closable={false}
    >
      <SidebarContent />
    </Drawer>
  );
};
export default SidebarMobile;
