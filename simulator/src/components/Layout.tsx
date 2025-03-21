import { Outlet } from "react-router-dom";
import { createThirdwebClient } from "thirdweb";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
 


const Layout = () => {
  return (
    <div
      className="w-[100vw] min-h-screen flex items-center
            justify-between gap-10"
    >    <ThirdwebProvider>

            <Outlet/>
        </ThirdwebProvider>

    </div>
  );
};

export default Layout;
