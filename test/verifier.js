const { expect } = require("chai");

const Verifier = artifacts.require("Verifier");

const hashAndSig = async (addr, message = "message") => {
  const hash = web3.utils.sha3(message);
  const signature = await web3.eth.sign(hash, addr);
  return { message, signature };
};

describe("Verifier", function () {
  let verifier, accounts;

  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    verifier = await Verifier.new(accounts[0]);
  });

  const message = "message";
  const fakeMessage = "fake-message";

  describe("@verify", () => {
    it("verifies a valid message", async () => {
      const { signature } = await hashAndSig(accounts[0], message);
      const bytesMessage = web3.utils.fromAscii(message);
      const valid = await verifier.verify(bytesMessage, signature);
      expect(valid).to.equal(true);
    });

    it("verifies an invalid message", async () => {
      const { signature } = await hashAndSig(accounts[0], "message");
      const bytesMessage = web3.utils.fromAscii(fakeMessage);
      const valid = await verifier.verify(bytesMessage, signature);
      expect(valid).to.equal(false);
    });

    it("change verified and verify a valid message", async () => {
      await verifier.setVerifier(accounts[1]);
      const { signature } = await hashAndSig(accounts[1], message);
      const bytesMessage = web3.utils.fromAscii(message);
      const valid = await verifier.verify(bytesMessage, signature);
      expect(valid).to.equal(true);
    });

    it("change verified and verify an invalid message", async () => {
      await verifier.setVerifier(accounts[1]);
      const { signature } = await hashAndSig(accounts[1], "message");
      const bytesMessage = web3.utils.fromAscii(fakeMessage);
      const valid = await verifier.verify(bytesMessage, signature);
      expect(valid).to.equal(false);
    });

    it("verifies a valid payload", async () => {
      const a = web3.utils.leftPad(web3.utils.toHex(1), 64);
      const b = web3.utils.leftPad(web3.utils.toHex(1), 64);
      const message = `0x${a.slice(2)}${b.slice(2)}`;
      const { signature } = await hashAndSig(accounts[0], message);
      const valid = await verifier.verify(message, signature);
      expect(valid).to.equal(true);
    });
  });
});
