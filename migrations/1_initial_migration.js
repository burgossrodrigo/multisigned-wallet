const Multisigned = artifacts.require("Multisigned");

module.exports = function (deployer) {
  deployer.deploy(Multisigned);
};
