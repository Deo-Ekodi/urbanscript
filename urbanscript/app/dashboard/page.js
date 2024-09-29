import UserInfo from "@/components/UserInfo";
import NavBar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer";
import Tool from "@/components/tool/ToolPage";

export default function Dashboard() {
  return (
    <>
      <NavBar />;
      <UserInfo />;
      <Tool />;
      <Footer />;
    </>
  );
};