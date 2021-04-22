require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-truffle5");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.0",
	settings: {
		optimizer: {
			enabled: true,
			runs: 1000
		}
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: true,
	},
	gasReporter: {
		currency: "GBP",
		// coinmarketcap: "<API_KEY>",
		gasPrice: 100,
	}
};
