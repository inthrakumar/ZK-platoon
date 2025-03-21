import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div
      className="w-[100vw] min-h-screen flex items-center
            justify-between gap-10"
    >
            <Outlet/>
    </div>
  );
};

export default Layout;
