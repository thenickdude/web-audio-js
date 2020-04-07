'use strict';

import config from '../config';
import BaseAudioContext from '../api/BaseAudioContext';
import PCMEncoder from '../utils/PCMEncoder';
import {
  toValidBitDepth,
  toValidBlockSize,
  toValidNumberOfChannels,
  toValidSampleRate,
} from '../utils';

import { RUNNING, SUSPENDED } from '../constants/AudioContextState';
import { Encoder } from '../utils/Encoder';
import AudioContext from '../impl/AudioContext';
import { Format } from '../utils/Format';
import { nmap } from '../utils/nmap';

class RawPcmAudioContext extends BaseAudioContext {
  readonly _impl!: AudioContext;
  public readonly blockSize: number;
  public readonly format: Format;
  public readonly bufferSize: number;
  private readonly _channelBuffers: Float32Array[];
  private readonly _encoder: Encoder;
  constructor({
    sampleRate = config.sampleRate,
    blockSize = config.blockSize,
    bufferSize = blockSize,
    numberOfChannels = config.numberOfChannels,
    bitDepth = config.bitDepth,
    floatingPoint = false,
  }: {
    sampleRate?: number;
    blockSize?: number;
    bufferSize?: number;
    numberOfChannels?: number;
    bitDepth?: number;
    floatingPoint?: boolean;
  } = {}) {
    sampleRate = toValidSampleRate(sampleRate);
    blockSize = toValidBlockSize(blockSize);
    numberOfChannels = toValidNumberOfChannels(numberOfChannels);
    bitDepth = toValidBitDepth(bitDepth);
    floatingPoint = !!floatingPoint;

    super({ sampleRate, blockSize, numberOfChannels });

    this.format = {
      sampleRate,
      channels: numberOfChannels,
      bitDepth,
      float: floatingPoint,
    };
    this.bufferSize = Math.ceil(bufferSize / blockSize) * blockSize;
    this.blockSize = blockSize;
    this._channelBuffers = nmap(
      this.format.channels,
      () => new Float32Array(this.bufferSize),
    );
    this._encoder = PCMEncoder.create(this.bufferSize, this.format);
  }

  process(samples: number): ArrayBuffer {
    if (samples > this.bufferSize) {
      throw new Error('samples > bufferSize');
    }
    const blockSize = this.blockSize;
    const encoder = this._encoder;
    const impl = this._impl;
    const buffers = this._channelBuffers;

    impl.changeState(RUNNING);

    for (let i = 0; i < samples; i += blockSize) {
      impl.process(buffers, i);
    }

    impl.changeState(SUSPENDED);

    return encoder.encode(buffers, 0, samples);
  }
}

export default RawPcmAudioContext;
