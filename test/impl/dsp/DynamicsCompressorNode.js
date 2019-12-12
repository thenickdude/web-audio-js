"use strict";

require("run-with-mocha");

const assert = require("assert");
const AudioContext = require("../../../src/api/BaseAudioContext");
const DynamicsCompressorNode = require("../../../src/api/DynamicsCompressorNode");
const DynamicsCompressorData = require('./DynamicsCompressorData');

describe("impl/dsp/DynamicsCompressor", () => {
  it("works", () => {
    const sampleRate = 44100;
    const length = 44100;
    const blockSize = 1024;
    const context = new AudioContext({ sampleRate, blockSize });
    const node = new DynamicsCompressorNode(context);

    // Testing the "Classic Voiceover" preset
    // { threshold: -24, ratio: 1.5, attack: 0.15, release: 0.4, knee: 10 }

    node.attack.value = 0.15;
    node.ratio.value = 1.5;
    node.threshold.value = -24;
    node.release.value = 0.4;
    node.knee.value = 10;

    const buffer = context.createBuffer(1, length, sampleRate);
    const bufSrc = context.createBufferSource();

    const freq = 440;

    function val(t) {
      return Math.sin(2 * Math.PI * freq * t);
    }

    for (let i = 0; i < length; i++) {
      buffer.getChannelData(0)[i] = val(i / sampleRate);
    }

    bufSrc.buffer = buffer;

    bufSrc.connect(node);
    node.connect(context.destination);
    const iterations = Math.ceil(length / blockSize);
    const iterLength = iterations * blockSize;
    const channelData = [ new Float32Array(iterLength), new Float32Array(iterLength) ];
    bufSrc.start();
    context.resume();

    for (let i = 0; i < iterations; i++) {
      context._impl.process(channelData, i * blockSize);
    }

    const out = channelData[0].slice(0, length);
    for (let i = 0; i < out.length; i++) {
      const a = out[i];
      const a2 = out[i];
      const b = DynamicsCompressorData[i];
      assert(Math.abs(a - b) <= 1e-4);
      assert(Math.abs(a2 - b) <= 1e-4);
    }
  });
});
