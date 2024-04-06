require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
/** @type import('hardhat/config').HardhatUserConfig */

const POLYGON_URL = "https://fZrknTXjEYJctRct3O_33StLOBfWPnH5-mumbai.g.alchemy.com/v2/fZrknTXjEYJctRct3O_33StLOBfWPnH5";
const PRIVATE_KEY = "f6e99539852f411440ab6e5337ccfa1d55cc89c54c42775ec2a7e8050a380ff1";
module.exports = {
  networks: {
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
      allowUnlimitedContractSize: true
    }
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

}