// components/Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Tool", path: "/tool" },
    // { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen bg-blue-900 text-white w-64 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold p-4">UrbanScript</h1>
        <nav className="flex flex-col space-y-2 mt-4 px-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <a
                className={`p-2 rounded ${
                  router.pathname === item.path
                    ? "bg-blue-700"
                    : "hover:bg-blue-800"
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <Link href="/">
          <a className="p-2 bg-red-500 rounded hover:bg-red-600">Log Out</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
