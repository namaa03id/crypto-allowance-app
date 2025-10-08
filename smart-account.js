import { 
  toMetaMaskSmartAccount,
  Implementation 
} from "@metamask/delegation-toolkit";
import { createPublicClient, http } from "viem";

// Monad Testnet Configuration
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet1.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadExplorer', url: 'https://testnet.monadexplorer.com' },
  },
}

// Create client for Monad testnet
const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http()
});

//  wallet address
const PARENT_WALLET = "0x24e39cEbFBBC09EdFd125969E97fF7F7fB0B048B";

console.log("Smart Account setup ready for:", PARENT_WALLET);
