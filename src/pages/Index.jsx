import { Layout, theme } from "antd";
import { Toaster } from "react-hot-toast";
import FormModal from "../components/FormModal";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent.jsx";
import MainHeader from "../components/MainHeader.jsx";
import MainFooter from "../components/MainFooter.jsx";
import SidebarMobile from "../components/SidebarMobile";

const Index = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <MainHeader colorBgContainer={colorBgContainer} />
          <MainContent />
          <MainFooter />
        </Layout>
      </Layout>
      <SidebarMobile />
      <FormModal />
      <Toaster position="bottom-center" />
    </>
  );
};

export default Index;
