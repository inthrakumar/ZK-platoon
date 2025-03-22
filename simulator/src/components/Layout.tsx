import { Outlet } from "react-router-dom";
import { config } from "../config/wagmiConfig";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const Layout = () => {
  return (
    <div
      className="w-[100vw] min-h-screen flex items-center
            justify-between gap-10"
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default Layout;
