import { createPublicClient, http, parseEther, createWalletClient } from "viem";
import { createAllowanceSmartAccount, setupChildAllowance } from "./create-allowance-account.js";

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

// Your actual wallet address
const PARENT_WALLET = "0x24e39cEbFBBC09EdFd125969E97fF7F7fB0B048B";

// Demo child wallet (you can generate this or use a test address)
const CHILD_WALLET = "0x1234567890123456789012345678901234567890";

async function demonstrateAllowanceApp() {
  console.log("🎬 === CRYPTO ALLOWANCE APP DEMO ===");
  console.log("📱 Using MetaMask Smart Accounts on Monad Testnet");
  console.log("");

  try {
    // Step 1: Create Smart Account for the family
    console.log("👨‍👩‍👧‍👦 Step 1: Creating Family Smart Account...");
    const familyAccount = await createAllowanceSmartAccount(PARENT_WALLET);
    console.log("✅ Family Smart Account created successfully!");
    console.log("");

    // Step 2: Set up child's allowance
    console.log("💰 Step 2: Setting up child's allowance...");
    const allowanceConfig = await setupChildAllowance(
      familyAccount, 
      CHILD_WALLET, 
      "50" // 50 MON per month
    );
    console.log("✅ Child allowance configured!");
    console.log("");

    // Step 3: Demonstrate Smart Account benefits
    console.log("🔑 Step 3: Smart Account Benefits:");
    console.log("   • Parent controls spending limits");
    console.log("   • Child gets gasless transactions");
    console.log("   • Automatic monthly allowance");
    console.log("   • Secure multi-signature setup");
    console.log("");

    // Step 4: Show the complete setup
    console.log("📋 === FINAL CONFIGURATION ===");
    console.log("🏦 Smart Account:", familyAccount.smartAccountAddress);
    console.log("👨‍💼 Parent Wallet:", familyAccount.parentWallet);
    console.log("👶 Child Wallet:", allowanceConfig.child);
    console.log("💵 Monthly Limit:", allowanceConfig.monthlyLimit, "MON");
    console.log("⚡ Network: Monad Testnet (Chain ID: 10143)");
    console.log("");

    console.log("🎉 === DEMO COMPLETE ===");
    console.log("🏆 Ready for hackathon submission!");
    
    return {
      success: true,
      familyAccount,
      allowanceConfig,
      demoComplete: true
    };

  } catch (error) {
    console.error("❌ Demo failed:", error.message);
    return { success: false, error: error.message };
  }
}

// Run the demo
demonstrateAllowanceApp()
  .then((result) => {
    if (result.success) {
      console.log("✅ All systems ready for hackathon!");
    } else {
      console.log("❌ Need to fix:", result.error);
    }
  })
  .catch((error) => {
    console.error("💥 Unexpected error:", error);
  });
