// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verifier {
    address private verifier;

    constructor(address _verifier){
    	verifier = _verifier;
    }

    modifier isVerifier() {
    	require(msg.sender == verifier, "Verifier: msg.sender is not a verifier");
    	_;
    }

    function setVerifier(address _addr) external isVerifier {
    	verifier = _addr;
    }

    function verify(bytes memory _message, bytes memory _signature)
        external
        view
        returns (bool)
    {
        bytes32 messageHash = keccak256(_message);
        bytes32 ethSignedMessageHash =
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    messageHash
                )
            );
        (bytes32 r, bytes32 s, uint8 v) =
            _splitSignature(_signature);    

        return ecrecover(ethSignedMessageHash, v, r, s) == verifier;
    }

    function _splitSignature(bytes memory sig)
        private
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        require(sig.length == 65, "Verifier: Signaure it the wrong length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

}
