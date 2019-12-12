"use strict";

const DynamicsCompressorKernel = require("./DynamicsCompressorKernel");

const DynamicsCompressorNodeDSP = {
  dspProcess() {
    const outputBus = this.outputs[0].bus;

    outputBus.zeros();
    outputBus.sumFrom(this.inputs[0].bus);
  }
};

module.exports = DynamicsCompressorNodeDSP;
