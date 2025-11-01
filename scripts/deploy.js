// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  console.log("Starting MetaBond Network deployment...\n");

  // Get the deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString(), "wei\n");

  // Get the contract factory
  console.log("Getting Project contract factory...");
  const Project = await hre.ethers.getContractFactory("Project");

  // Deploy the contract
  console.log("Deploying MetaBond Network contract...");
  const project = await Project.deploy();

  await project.deployed();

  console.log("\n✅ Deployment successful!");
  console.log("═══════════════════════════════════════════════════");
  console.log("MetaBond Network Contract Address:", project.address);
  console.log("═══════════════════════════════════════════════════\n");

  // Display network information
  const network = await hre.ethers.provider.getNetwork();
  console.log("📍 Deployment Details:");
  console.log("   Network Name:", network.name);
  console.log("   Chain ID:", network.chainId);
  console.log("   Deployer:", deployer.address);
  console.log("   Contract:", project.address);
  console.log("   Block Number:", await hre.ethers.provider.getBlockNumber());
  
  // Wait for a few block confirmations (if not on localhost)
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("\n⏳ Waiting for block confirmations...");
    await project.deployTransaction.wait(5);
    console.log("✅ Contract confirmed on blockchain\n");
  }

  // Optional: Verify contract on Etherscan (uncomment if needed)
  /*
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Waiting before Etherscan verification...");
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds

    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: project.address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified on Etherscan");
    } catch (error) {
      console.log("❌ Etherscan verification failed:", error.message);
    }
  }
  */

  // Display usage instructions
  console.log("\n📚 Next Steps:");
  console.log("═══════════════════════════════════════════════════");
  console.log("1. Save the contract address for frontend integration");
  console.log("2. Update your .env file with the deployed address");
  console.log("3. Interact with the contract using:");
  console.log("   - Issue bonds: issueBond()");
  console.log("   - Purchase bonds: purchaseBond()");
  console.log("   - Claim coupons: claimCoupon()");
  console.log("═══════════════════════════════════════════════════\n");

  // Example interaction (optional - for testing)
  console.log("🧪 Testing basic contract functionality...");
  const totalBonds = await project.getTotalBonds();
  console.log("   Initial total bonds:", totalBonds.toString());
  console.log("   ✅ Contract is responsive and working!\n");

  console.log("🎉 MetaBond Network deployment complete!");
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });