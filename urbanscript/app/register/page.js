import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavBar from "@/components/Navbar/NavBar";
import Footer from "@/components/Footer";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <>
      <NavBar />;
      <RegisterForm />;
      <Footer />;
    </>
  );
}
