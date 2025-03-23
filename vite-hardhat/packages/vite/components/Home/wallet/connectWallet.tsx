import { Account } from './account.jsx'
import { WalletOptions } from './wallet-options.jsx'

import { useAccount } from 'wagmi';

export default function ConnectWallet() {
    const { isConnected } = useAccount();
  
    if (isConnected) {
      return <Account />;
    }
  
    return <WalletOptions />;
  }
