import { createThirdwebClient } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";


export const client = createThirdwebClient({
  clientId:import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
});
export const contract = getContract({
    client,
    address: "0x3754734cF999D4058af21D973a8f1e00a8c15255",
    chain: arbitrumSepolia,
  });
