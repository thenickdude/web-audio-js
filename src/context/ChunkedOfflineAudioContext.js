'use strict';

import { nmap } from '../utils/nmap';
import config from '../config';
import OfflineAudioContext from './OfflineAudioContext';
import setImmediate from '../utils/setImmediate';
import {
  defineProp,
  toValidNumberOfChannels,
  toValidSampleRate,
} from '../utils';

import { CLOSED, RUNNING, SUSPENDED } from '../constants/AudioContextState';

class ChunkedOfflineAudioContext extends OfflineAudioContext {
  /**
   * @param {number} numberOfChannels
   * @param {number} length
   * @param {number} sampleRate
   * @param {number} blockSize - The audio graph is rendered in blocks of this size
   * @param {number} chunkSize - Rendered blocks will be aggregated and delivered to you with this length
   */
  constructor(
    numberOfChannels,
    length,
    sampleRate,
    blockSize = config.blockSize,
    chunkSize = 1024,
  ) {
    numberOfChannels = toValidNumberOfChannels(numberOfChannels);
    length = Math.max(0, length | 0);
    sampleRate = toValidSampleRate(sampleRate);

    super(numberOfChannels, length, sampleRate);

    this._impl.blockSize = blockSize;
    this._renderingIterations = chunkSize;

    defineProp(this, '_chunkIndex', 0);
  }

  set onchunk(callback) {
    this._onchunk = callback;
  }

  /**
   * @return {Promise<AudioBuffer>}
   */
  startRendering() {
    /* istanbul ignore next */
    if (this._impl.state === CLOSED) {
      return Promise.reject(
        new TypeError(
          'cannot startRendering when an OfflineAudioContext is closed',
        ),
      );
    }
    /* istanbul ignore next */
    if (this._renderingPromise !== null) {
      return Promise.reject(
        new TypeError('cannot call startRendering more than once'),
      );
    }

    this._renderingPromise = new Promise((resolve) => {
      const numberOfChannels = this._numberOfChannels;
      const sampleRate = this.sampleRate;
      const blockSize = this._impl.blockSize;

      this._audioData = createRenderingAudioData(
        numberOfChannels,
        this._renderingIterations,
        sampleRate,
        blockSize,
      );
      this._emptyAudioData = createRenderingAudioData(
        numberOfChannels,
        0,
        sampleRate,
        blockSize,
      );
      this._renderingResolve = resolve;

      render.call(this, this._impl);
    });

    return this._renderingPromise;
  }
}

function createRenderingAudioData(
  numberOfChannels,
  length,
  sampleRate,
  blockSize,
) {
  length = Math.ceil(length / blockSize) * blockSize;

  const channelData = nmap(numberOfChannels, () => new Float32Array(length));

  return { numberOfChannels, length, sampleRate, channelData };
}

function suspendRendering() {
  this._suspendResolve();
  this._suspendedTime = Infinity;
  this._suspendPromise = this._suspendResolve = null;
  this._impl.changeState(SUSPENDED);
}

function doneRendering() {
  this._impl.changeState(CLOSED);
  this._impl.dispatchEvent({ type: 'complete' });

  this._renderingResolve();
  this._renderingResolve = null;
}

function render(impl) {
  const chunkData = this._audioData;
  const chunkDataLength = chunkData.length;
  const channelData = chunkData.channelData;
  const blockSize = impl.blockSize;

  let writeIndex = this._writeIndex;
  let chunkIndex = this._chunkIndex;

  const loop = () => {
    const iterations = ((chunkDataLength - chunkIndex) / blockSize) | 0;

    for (let i = 0; i < iterations; i++) {
      if (this._suspendedTime <= impl.currentTime) {
        this._writeIndex = writeIndex;
        this._chunkIndex = chunkIndex;
        return suspendRendering.call(this);
      } else {
        impl.process(channelData, chunkIndex);
        writeIndex += blockSize;
        chunkIndex += blockSize;
      }
    }

    // Deliver the chunk with its global sample index and length in samples:
    this._onchunk(chunkData, this._writeIndex, chunkIndex);

    chunkIndex = 0;
    this._writeIndex = writeIndex;
    this._chunkIndex = 0;

    if (this._writeIndex >= this._length) {
      doneRendering.call(this, this._emptyAudioData);
    } else {
      setImmediate(loop);
    }
  };

  impl.changeState(RUNNING);

  setImmediate(loop);
}

export default ChunkedOfflineAudioContext;
