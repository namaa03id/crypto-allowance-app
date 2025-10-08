import { 
  toMetaMaskSmartAccount,
  Implementation 
} from "@metamask/delegation-toolkit";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// Import our Monad setup
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

// Create Hybrid Smart Account for Parent-Child Allowance
export async function createAllowanceSmartAccount(parentWallet) {
  try {
    // Create wallet client for parent
    const walletClient = createWalletClient({
      chain: monadTestnet,
      transport: http()
    });

    // Create the Hybrid Smart Account
    // This allows both parent (EOA) and child (passkey) access
    const smartAccount = await toMetaMaskSmartAccount({
      client: publicClient,
      implementation: Implementation.Hybrid,
      deployParams: [parentWallet, [], [], []], // Parent as owner, no passkeys initially
      deploySalt: "0x",
      signer: { walletClient },
    });

    console.log("🎉 Smart Account created!");
    console.log("📍 Address:", smartAccount.address);
    console.log("👨‍👩‍👧‍👦 Parent wallet:", parentWallet);
    
    return {
      smartAccountAddress: smartAccount.address,
      parentWallet: parentWallet,
      accountType: "Hybrid",
      status: "Ready for allowances!"
    };
    
  } catch (error) {
    console.error("❌ Error creating Smart Account:", error);
    throw error;
  }
}

// Function to set up child allowance
export async function setupChildAllowance(smartAccount, childAddress, monthlyLimit) {
  console.log("💰 Setting up allowance:");
  console.log("👶 Child:", childAddress);
  console.log("💵 Monthly limit:", monthlyLimit, "MON");
  console.log("🏦 From Smart Account:", smartAccount.address);
  
  // This is where we'll add delegation logic next
  return {
    child: childAddress,
    monthlyLimit: monthlyLimit,
    smartAccount: smartAccount.address,
    status: "Allowance configured"
  };
}
