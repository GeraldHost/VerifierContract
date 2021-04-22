# Verifier Contract

A contract for verifying that a message was signed by the verifier account

## Usage

```Solidity
import "https://github.com/GeraldHost/verifier-contract/contracts/Verifier.sol";

contract FooBar is Verifier {
	constructor(address _verifier) Verifier(_verifier) {
		// ...
	}

	function fooBar(uint256 _randomNumber, bytes _signature) private {
		require(verify(abi.encodePacked(_randomNumber), _signature), "signature not verified");
		// ...
	}
}
```