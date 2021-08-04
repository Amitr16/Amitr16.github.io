require('dotenv').config();
const PRIVATE_KEY = "e7f9aee85f5c3d6e75260620850277b19dc84081884355271b5addb0b025836b";
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: `https://kovan.infura.io/v3/ba3cc1b5324f42bcb11e706181652458`,
      chainId: 42,
      //url: "https://rpc-mumbai.maticvigil.com",                              //
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.5.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
