'use strict';

import nmap from 'nmap';
import config from '../config';
import BaseAudioContext from '../api/BaseAudioContext';
import PCMEncoder from '../utils/PCMEncoder';
import {
  defaults,
  defineProp,
  toValidBitDepth,
  toValidBlockSize,
  toValidNumberOfChannels,
  toValidSampleRate,
} from '../utils';

import { RUNNING, SUSPENDED } from '../constants/AudioContextState';

const noopWriter = { write: () => true };

class RawPcmAudioContext extends BaseAudioContext {
  /**
   * @param {object}  opts
   * @param {number}  opts.sampleRate
   * @param {number}  opts.blockSize
   * @param {number}  opts.numberOfChannels
   * @param {number}  opts.bitDepth
   * @param {boolean} opts.floatingPoint
   */
  constructor(opts = {}) {
    let sampleRate = defaults(opts.sampleRate, config.sampleRate);
    let blockSize = defaults(opts.blockSize, config.blockSize);
    let numberOfChannels = defaults(
      opts.channels || opts.numberOfChannels,
      config.numberOfChannels,
    );
    let bitDepth = defaults(opts.bitDepth, config.bitDepth);
    let floatingPoint = opts.float || opts.floatingPoint;

    sampleRate = toValidSampleRate(sampleRate);
    blockSize = toValidBlockSize(blockSize);
    numberOfChannels = toValidNumberOfChannels(numberOfChannels);
    bitDepth = toValidBitDepth(bitDepth);
    floatingPoint = !!floatingPoint;

    super({ sampleRate, blockSize, numberOfChannels });

    const format = {
      sampleRate,
      channels: numberOfChannels,
      bitDepth,
      float: floatingPoint,
    };
    const encoder = PCMEncoder.create(blockSize, format);

    const channelBuffers = nmap(
      this._numberOfChannels,
      () => new Float32Array(blockSize),
    );

    defineProp(this, '_numberOfChannels', numberOfChannels);
    defineProp(this, '_encoder', encoder);
    defineProp(this, '_blockSize', blockSize);
    defineProp(this, '_stream', noopWriter);
    defineProp(this, '_format', format);
    defineProp(this, '_channelBuffers', channelBuffers);
  }

  /**
   * @return {number}
   */
  get numberOfChannels() {
    return this._impl.numberOfChannels;
  }

  /**
   * @return {number}
   */
  get blockSize() {
    return this._impl.blockSize;
  }

  /**
   * @return {object}
   */
  get format() {
    return this._format;
  }

  process(samples) {
    if (samples > this.blockSize) {
      throw new Error('samples > blockSize');
    }
    const encoder = this._encoder;
    const impl = this._impl;
    const channelBuffers = this._channelBuffers;

    impl.changeState(RUNNING);

    impl.process(channelBuffers, 0);

    impl.changeState(SUSPENDED);

    return encoder.encode(channelBuffers, 0, samples);
  }
}

export default RawPcmAudioContext;
