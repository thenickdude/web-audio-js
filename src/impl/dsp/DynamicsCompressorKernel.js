"use strict";

const { toDecibel, toLinear } = require("../../utils");

const DEFAULT_PRE_DELAY_FRAMES = 0;
const MAX_PRE_DELAY_FRAMES = 0;

class DynamicsCompressorKernel {
  constructor(sampleRate, numberOfChannels) {
    this.sampleRate = sampleRate;
    this.lastPreDelayFrames = DEFAULT_PRE_DELAY_FRAMES;
    this.preDelayReadIndex = 0;
    this.preDelayWriteIndex = DEFAULT_PRE_DELAY_FRAMES;
    this.ratio = undefined;
    this.slope = undefined;
    this.linearThreshold = undefined;
    this.dbThreshold = undefined;
    this.dbKnee = undefined;
    this.kneeThreshold = undefined;
    this.kneeThresholdDb = undefined;
    this.ykneeThresholdDb = undefined;
    this.K = undefined;
    this.preDelayBuffers = [];

    this.setNumberOfChannels(numberOfChannels);

    // Initializes most member variables;
    this.reset();

    this.meteringReleaseK = discreteTimeConstantForSampleRate(meteringReleaseTimeConstant, sampleRate);
  }

  setNumberOfChannels(numberOfChannels) {
    if (this.preDelayBuffers.length === numberOfChannels) {
      return;
    }

    this.preDelayBuffers = [];
    for (let i = 0; i < numberOfChannels; i++) {
      this.preDelayBuffers.push(new Float32Array(MAX_PRE_DELAY_FRAMES));
    }
  }

  setPreDelayTime(preDelayTime) {
    let preDelayFrames = preDelayTime * this.sampleRate;
    if (preDelayFrames > MAX_PRE_DELAY_FRAMES - 1) {
      preDelayFrames = MAX_PRE_DELAY_FRAMES - 1;
    }

    if (this.lastPreDelayFrames !== preDelayFrames) {
      this.lastPreDelayFrames = preDelayFrames;
      for (let i = 0; i < this.preDelayBuffers.length; i++) {
        this.preDelayBuffers[i].fill(0);
      }

      this.preDelayReadIndex = 0;
      this.preDelayWriteIndex = preDelayFrames;
    }
  }

  // Exponential curve for the knee.
  // It is 1st derivative matched at m_linearThreshold and asymptotically
  // approaches the value m_linearThreshold + 1 / k.
  kneeCurve(x, k) {
    // Linear up to threshold.
    if (x < this.linearThreshold) {
      return x;
    }
    return this.linearThreshold + (1 - Math.exp(-k * (x - this.linearThreshold))) / k;
  }

  // Full compression curve with constant ratio after knee.
  saturate(x, k) {
     if (x < this.kneeThreshold) {
       return this.kneeCurve(x, k);
     }

     // Constant ratio after knee
     const xDb = toDecibel(x);
     const yDb = this.ykneeThresholdDb + this.slope * (xDb - this.kneeThresholdDb);
     return toLinear(yDb);
  }

  // Approximate 1st derivative with input and output expressed in dB.
  // This slope is equal to the inverse of the compression "ratio".
  // In other words, a compression ratio of 20 would be a slope of 1/20.
  slopeAt(x, k) {
    if (x < this.linearThreshold) {
      return 1;
    }

    const x2 = x * 1.001;

    const xDb = toDecibel(x);
    const x2Db = toDecibel(x2);

    const yDb = toDecibel(this.kneeCurve(x, k));
    const y2Db = toDecibel(this.kneeCurve(x2, k));

    return (y2Db - yDb) / (x2Db - xDb);
  }

  kAtSlope(desiredSlope) {
    const xDb = this.dbThreshold + this.dbKnee;
    const x = toLinear(xDb);

    // Approximate k given initial values.
    let minK = 0.1;
    let maxK = 10000;
    let k = 5;

    for (let i = 0; i < 15; i++) {
      // A high value for k will more quickly asymptotically approach a slope of 0.
      const slope = this.slopeAt(x, k);

      if (slope < desiredSlope) {
        // k is too high
        maxK = k;
      } else {
        // k is too low
        minK = k;
      }

      // Re-calculate based on geometric mean
      k = Math.sqrt(minK * maxK);
    }

    return k;
  }

  updateStaticCurveParameters(dbThreshold, dbKnee, ratio) {
    if (dbThreshold !== this.dbThreshold || dbKnee !== this.dbKnee || ratio !== this.ratio) {
      // Threshold and knee
      this.dbThreshold = dbThreshold;
      this.linearThreshold = toLinear(dbThreshold);
      this.dbKnee = dbKnee;

      // Compute knee parameters
      this.ratio = ratio;
      this.slope = 1 / ratio;

      const k = this.kAtSlope(this.slope);

      this.kneeThresholdDb = dbThreshold + dbKnee;
      this.kneeThreshold = toLinear(this.kneeThresholdDb);

      this.ykneeThresholdDb = toDecibel(this.kneeCurve(this.kneeThreshold, k));

      this.K = k;
    }
    return this.K;
  }

  process() {
    
  }

  reset() {
    this.detectorAverage = 0;
    this.compressorGain = 1;
    this.meteringGain = 1;

    // Predelay section.
    for (const buffer of this.preDelayBuffers) {
      buffer.fill(0);
    }

    this.preDelayReadIndex = 0;
    this.preDelayWriteIndex = DEFAULT_PRE_DELAY_FRAMES;

    this.maxAttackCompressionDiffDb = -1; // uninitialized state
  }
}
